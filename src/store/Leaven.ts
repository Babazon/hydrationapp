import { action, computed, observable, reaction } from 'mobx';
import { Dough } from './Dough';

export class Leaven {

  constructor(private readonly dough: Dough) {
    reaction(() => this.leavenWeight, (_) => {
      if (this.dough.hydration.targetHydrationLocked) {
        this.dough.water.setWaterWeight(this.dough.water.waterWeightToMatchTargetHydration);
      }
    });

    reaction(() => this.leavenHydration, (_) => {
      if (this.dough.hydration.targetHydrationLocked) {
        this.dough.water.setWaterWeight(this.dough.water.waterWeightToMatchTargetHydration);
      }
    });
  }

  @observable public leavenWeight: number = 200;
  @observable public leavenHydration: number = 100;

  @observable public leavenLocked: boolean = false;

  @action public toggleLeavenLock = (): void => {
    this.leavenLocked = !this.leavenLocked;
  }

  @computed public get leavenFlour(): number {
    if (this.leavenHydration != null && this.leavenWeight != null) {
      return (this.leavenWeight / (1 + this.leavenHydration / 100));
    }
    return 0;
  }

  @computed public get leavenWater(): number {
    if (this.leavenHydration != null && this.leavenWeight != null) {
      return (this.leavenWeight / (1 + this.leavenHydration / 100)) * (this.leavenHydration / 100);
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

  @action public setLeavenWeight = (value: number): void => {
    this.leavenWeight = value > 0 ? value : 0;
  }

  @action public setLeavenHydration = (value: number): void => {
    this.leavenHydration = value > 0 ? value : 0;
  }

  @action public setLeavenWeightUsingInoculation = (value: number): void => {
    this.leavenWeight = (value / 100) * this.dough.flour.flourWeight;
  }

  @computed public get inoculation(): number {
    return (this.leavenWeight / this.dough.flour.flourWeight) * 100;
  }

}
