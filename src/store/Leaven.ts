import { action, computed, observable, reaction } from 'mobx';
import { Alert } from 'react-native';
import { presets } from '../env';
import { Dough } from './Dough';
import { Generic } from './Generic';

export class Leaven extends Generic {

  constructor(private readonly dough: Dough) {
    super();

    reaction(() => this.weight, this.updateWeightToMatchTargetHydration);

    reaction(() => this.leavenHydration, this.updateWeightToMatchTargetHydration);
  }

  private updateWeightToMatchTargetHydration = (_: number): void => {
    if (this.dough.hydration.isLocked) {
      this.dough.water.setWeight(this.dough.water.waterWeightToMatchTargetHydration);
    }
  }

  @observable public weight: number = presets.initialLeavenWeight;
  @observable public leavenHydration: number = presets.initialLeavenHydration;

  @observable public isHydrationLocked: boolean = false;

  @action public toggleHydrationLocked = (): void => {
    this.isHydrationLocked = !this.isHydrationLocked;
  }

  @observable public targetInoculation: number = presets.initialTargetInoculation;

  @action public setTargetInoculation = (value: number): void => {
    if (value > 0) {
      if (this.leavenHydration <= 0 || this.dough.hydration.targetHydration <= 0) {
        Alert.alert('One more step..', 'Please set Target Hydration, Leaven Hydration before calculating target dough weight..');
        this.dough.hydration.isLocked = false;
        this.isHydrationLocked = false;
        this.dough.leaven.setLeavenHydration(this.dough.userInterface.appPresets.initialLeavenHydration);
        this.dough.hydration.setTargetHydration(this.dough.userInterface.appPresets.targetHydration);
        this.dough.setTargetDoughWeight(this.dough.userInterface.appPresets.initialTargetDoughWeight);
      } else {
        this.targetInoculation = value;
        this.dough.hydration.isLocked = true;
        this.isHydrationLocked = true;
      }
    } else {
      this.targetInoculation = 0;
      this.dough.hydration.isLocked = false;
      this.isHydrationLocked = false;
    }
  }

  @computed public get leavenFlour(): number {
    if (this.leavenHydration != null && this.weight != null) {
      return (this.weight / (1 + this.leavenHydration / 100));
    }
    return 0;
  }

  @computed public get leavenWater(): number {
    if (this.leavenHydration != null &&
      this.weight != null) {
      return (this.weight / (1 + this.leavenHydration / 100)) * (this.leavenHydration / 100);
    }
    return 0;
  }

  @computed public get minLeaven(): number {
    return this.dough.userInterface.appPresets.minLeaven;
  }

  @computed public get maxLeaven(): number {
    return this.dough.userInterface.appPresets.maxLeaven;
  }

  @computed public get minLeavenHydration(): number {
    return this.dough.userInterface.appPresets.minLeavenHydration;
  }

  @computed public get maxLeavenHydration(): number {
    return this.dough.userInterface.appPresets.maxLeavenHydration;
  }

  @action public setLeavenHydration = (value: number): void => {
    this.leavenHydration = value > 0 ? value : 0;
  }

  @action public setLeavenWeightUsingInoculation = (value: number): void => {
    this.weight = (value / 100) * this.dough.flour.weight;
  }

  @computed public get inoculation(): number {
    if (!isNaN(this.weight / this.dough.flour.weight) && this.dough.flour.weight > 0) { // in case of divide by 0
      return (this.weight / this.dough.flour.weight) * 100;
    }
    return 0;
  }

}
