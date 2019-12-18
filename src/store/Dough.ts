import { observable, action, computed, reaction } from 'mobx';
import { Flour } from './Flour';
import { Water } from './Water';
import { Leaven } from './Leaven';
import { Hydration } from './Hydration';
import { UserInterface } from './UserInterface';
import { presets } from '../env';

export class Dough {

  constructor(protected readonly appPresets: any) {
    reaction(() => this.totalHydration, (totalHydration: number) => {
      if (!this.hydration.desiredHydrationLocked) {
        this.hydration.setDesiredTargetHydration(totalHydration * 100);
      }
    });

    reaction(() => this.targetDoughWeight, (targetDoughWeight: number) => {
      if (this.hydration.desiredHydrationLocked) {
        const ratioToMultiply: number = (targetDoughWeight * (1 - this.saltRatio)) / (this.totalFlour + this.totalWater);
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
    this.hydration.desiredHydrationLocked = false;
    this.water.waterLocked = false;
    this.flour.flourLocked = false;
    this.hydration.desiredTargetHydration = this.appPresets.initialDesiredTargetHydration;
  }

  @computed public get saltRatio(): number {
    return this.appPresets.saltRatio;
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

  @observable public desiredTargetWeight: number = 2000;
  @action public setDesiredTargetWeight = (value: number): void => {
    this.desiredTargetWeight = value;
  }

  @computed public get desiredTargetBakedWeight(): number {
    if (this.desiredTargetWeight) {
      return this.desiredTargetWeight * 0.15;
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
      return this.postBakeWeightRatio * (this.totalWater + this.totalFlour);
    }
    return 0;
  }

  @computed public get experimentalDoughVolume(): number {
    return (this.totalFlour + this.totalWater) * (2 / 3);
  }

  @computed public get experimentalBulkVolume(): number {

    if (this.totalHydration > 75) {
      return this.experimentalDoughVolume * 1.25;
    }
    if (this.totalHydration > 70) {
      return this.experimentalDoughVolume * 1.30;
    }
    if (this.totalHydration > 65) {
      return this.experimentalDoughVolume * 1.4;
    }
    if (this.totalHydration > 60) {
      return this.experimentalDoughVolume * 1.45;
    }
    return this.experimentalDoughVolume * 1.5;

  }

  @observable public targetDoughWeight: number = 0;

  @action public setTargetDoughWeight = (value: number) => {
    this.targetDoughWeight = value;
  }

}

export default new Dough(presets);
