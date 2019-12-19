import { action, computed, observable, reaction } from 'mobx';
import { presets } from '../env';
import { Flour } from './Flour';
import { Hydration } from './Hydration';
import { Leaven } from './Leaven';
import { UserInterface } from './UserInterface';
import { Water } from './Water';

export class Dough {

  constructor(protected readonly appPresets: any) {
    reaction(() => this.totalHydration, (totalHydration: number) => {
      if (!this.hydration.targetHydrationLocked) {
        this.hydration.setTargetHydration(totalHydration * 100);
      }
    });

    reaction(() => this.targetDoughWeight, (targetDoughWeight: number) => {
      if (this.hydration.targetHydrationLocked) {
        const actualTargetFlourWeight: number = targetDoughWeight * (1 / (1 + this.hydration.targetHydration / 100 + this.saltRatio));
        const ratioToMultiply: number = actualTargetFlourWeight / this.totalFlour;

        this.flour.setFlourWeight(this.flour.flourWeight * ratioToMultiply);
        this.water.setWaterWeight(this.water.waterWeight * ratioToMultiply);
        this.leaven.setLeavenWeight(this.leaven.leavenWeight * ratioToMultiply);
      }
    });
  }

  @observable public flour: Flour = new Flour(this);
  @observable public water: Water = new Water(this);
  @observable public leaven: Leaven = new Leaven(this);
  @observable public hydration: Hydration = new Hydration(this);
  @observable public userInterface: UserInterface = new UserInterface(this, this.appPresets);

  @action public resetValues = () => {
    this.flour.flourWeight = this.appPresets.initialFlourWeight;
    this.water.waterWeight = this.appPresets.initialWaterWeight;
    this.leaven.leavenWeight = this.appPresets.initialLeavenWeight;
    this.leaven.leavenHydration = this.appPresets.initialLeavenHydratioon;
    this.hydration.targetHydrationLocked = false;
    this.water.waterLocked = false;
    this.flour.flourLocked = false;
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
    if (this.flour.flourWeight != null && this.leaven.leavenFlour != null) {
      return this.flour.flourWeight + this.leaven.leavenFlour;
    }
    return 0;
  }

  @computed public get totalWater(): number {
    if (this.water.waterWeight != null && this.leaven.leavenWater != null) {
      return this.water.waterWeight + this.leaven.leavenWater;
    }
    return 0;
  }

  @computed public get totalHydration(): number {
    if (this.totalFlour != null && this.totalWater != null) {
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

  @observable public targetDoughWeight: number = 2000;

  @action public setTargetDoughWeight = (value: number) => {
    if (value > 0) {
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
