import { action, computed, observable, reaction } from 'mobx';
import { presets } from '../env';
import { Flour } from './Flour';
import { Hydration } from './Hydration';
import { Leaven } from './Leaven';
import { UserInterface } from './UserInterface';
import { Water } from './Water';

export class Dough {

  // tslint:disable-next-line: cognitive-complexity
  constructor(protected readonly appPresets: any) {
    reaction(() => this.totalHydration, (totalHydration: number) => {
      if (!this.hydration.isLocked) {
        this.hydration.setTargetHydration(totalHydration * 100);
      }
    });

    reaction(() => this.targetDoughWeight, (_: number) => {
      if (this.hydration.isLocked) {
        if (this.flour.weight > 0 && this.water.weight > 0 && this.leaven.weight > 0) {
          this.adjustWeightValuesForTargetDoughWeightWithNonZeroWeights();
        } else if (this.leaven.isHydrationLocked &&
          this.leaven.leavenHydration > 0 &&
          this.leaven.targetInoculation > 0) {
          this.adjustWeightValuesForTargetDoughWeight();
        }
      }
    });

    reaction(() => this.hydration.isLocked, (_: boolean) => {
      if (this.hydration.isLocked && this.targetDoughWeight) {
        if (this.flour.weight > 0 && this.water.weight > 0 && this.leaven.weight > 0) {
          this.adjustWeightValuesForTargetDoughWeightWithNonZeroWeights();
        } else if (this.leaven.isHydrationLocked &&
          this.leaven.leavenHydration > 0 &&
          this.leaven.targetInoculation > 0) {
          this.adjustWeightValuesForTargetDoughWeight();
        }
      }
    });

    reaction(() => this.leaven.targetInoculation, (targetInoculation: number) => {
      if (this.leaven.isHydrationLocked &&
        this.leaven.leavenHydration > 0 &&
        this.hydration.isLocked &&
        targetInoculation > 0) {
        this.adjustWeightValuesForTargetDoughWeight();
      }
    });

  }
  @action private adjustWeightValuesForTargetDoughWeightWithNonZeroWeights = () => {
    const actualTargetFlourWeight: number = this.targetDoughWeight * (1 / (1 + this.hydration.targetHydration / 100 + this.saltRatio));
    const ratioToMultiply: number = (actualTargetFlourWeight / this.totalFlour) ?? 0; // in case of divide by 0
    // This is bad, doesn't work if any of these observables are 0
    // New formula must be developed that looks at leaven hydration and inoculation
    // Finds new total flour, water, leaven weights
    // Directly sets them
    // Leaven inoculation and hydration must be set!!
    this.flour.setWeight(this.flour.weight * ratioToMultiply);
    this.water.setWeight(this.water.weight * ratioToMultiply);
    this.leaven.setWeight(this.leaven.weight * ratioToMultiply);
  }

  @action private adjustWeightValuesForTargetDoughWeight = () => {

    const finalTotalFlourWeight: number = this.targetDoughWeight / ((1 + (this.hydration.targetHydration / 100)) + this.saltRatio);
    const finalTotalWaterWeight: number = finalTotalFlourWeight * (this.hydration.targetHydration / 100);
    const finalFlourWeight: number = finalTotalFlourWeight / (1 + ((this.leaven.targetInoculation / 100) * (1 / (1 + (this.leaven.leavenHydration / 100)))));
    const finalLeavenWeight: number = finalFlourWeight * (this.leaven.targetInoculation / 100);
    const finalLeavenFlourWeight: number = finalLeavenWeight * (1 / (1 + (this.leaven.leavenHydration / 100)));
    const finalLeavenWaterWeight: number = finalLeavenWeight - finalLeavenFlourWeight;
    const finalWaterWeight: number = finalTotalWaterWeight - finalLeavenWaterWeight;

    this.flour.setWeight(finalFlourWeight);
    this.water.setWeight(finalWaterWeight);
    this.leaven.setWeight(finalLeavenWeight);
  }

  @observable public flour: Flour = new Flour(this);
  @observable public water: Water = new Water(this);
  @observable public leaven: Leaven = new Leaven(this);
  @observable public hydration: Hydration = new Hydration(this);
  @observable public userInterface: UserInterface = new UserInterface(this, this.appPresets);

  @action public resetValues = () => {
    this.flour.weight = this.appPresets.initialFlourWeight;
    this.water.weight = this.appPresets.initialWaterWeight;
    this.leaven.weight = this.appPresets.initialLeavenWeight;
    this.leaven.leavenHydration = this.appPresets.initialLeavenHydratioon;
    this.hydration.isLocked = false;
    this.water.isLocked = false;
    this.flour.isLocked = false;
    this.hydration.targetHydration = this.appPresets.initialTargetHydration;
  }

  @computed public get saltRatio(): number {
    return this.appPresets.saltRatio;
  }

  @computed public get eggWaterRatio(): number {
    return this.appPresets.eggWaterRatio;
  }

  @computed public get milkWaterRatio(): number {
    return this.appPresets.milkWaterRatio;
  }

  @computed public get butterWaterRatio(): number {
    return this.appPresets.butterWaterRatio;
  }

  @computed public get postBakeWeightRatio(): number {
    return this.appPresets.postBakeWeightRatio;
  }

  @computed public get totalFlour(): number {
    if (this.flour.weight != null && this.leaven.leavenFlour != null) {
      return this.flour.weight + this.leaven.leavenFlour;
    }
    return 0;
  }

  @computed public get totalWater(): number {
    if (this.water.weight != null && this.leaven.leavenWater != null) {
      return this.water.weight + this.leaven.leavenWater;
    }
    return 0;
  }

  @computed public get totalHydration(): number {
    if (this.totalFlour != null && this.totalWater != null && !isNaN(this.totalWater / this.totalFlour)) {
      return this.totalWater / this.totalFlour;
    }
    return 0;
  }

  @computed public get recommendedSalt(): number {
    if (this.totalFlour != null) {
      return this.totalFlour * this.appPresets.saltRatio;
    }
    return 0;
  }

  @computed public get postBakeWeight(): number {
    if (this.totalFlour != null && this.totalWater != null) {
      return this.postBakeWeightRatio * (this.totalWater + this.totalFlour + this.recommendedSalt);
    }
    return 0;
  }

  @computed public get experimentalDoughVolume(): number {
    return (this.totalFlour + this.totalWater) * (2 / 3);
  }

  @computed public get experimentalBulkVolume(): number {

    if (this.totalHydration > 0.75) {
      return this.experimentalDoughVolume * 1.25;
    }
    if (this.totalHydration > 0.70) {
      return this.experimentalDoughVolume * 1.30;
    }
    if (this.totalHydration > 0.65) {
      return this.experimentalDoughVolume * 1.4;
    }
    if (this.totalHydration > 0.60) {
      return this.experimentalDoughVolume * 1.45;
    }
    return this.experimentalDoughVolume * 1.5;

  }

  @observable public targetDoughWeight: number = 0;

  @action public setTargetDoughWeight = (value: number) => {
    if (value >= 0) {
      this.targetDoughWeight = value;
    }
  }

  @computed public get bakedTargetDoughWeight(): number {
    if (this.targetDoughWeight) {
      return this.targetDoughWeight * 0.85;
    }
    return 0;
  }

}

export default new Dough(presets);
