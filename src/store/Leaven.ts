import { Dough } from './Dough';
import { computed, observable, action } from 'mobx';

export class Leaven {

  constructor(private readonly dough: Dough) { }

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
    if (this.dough.hydration.desiredHydrationLocked) {
      this.dough.water.setwater(this.dough.water.waterWeightToMatchDesiredTargetHydration);
    }
  }

  @action public setLeavenHydration = (value: number): void => {
    this.leavenHydration = value > 0 ? value : 0;
    if (this.dough.hydration.desiredHydrationLocked) {
      this.dough.water.setwater(this.dough.water.waterWeightToMatchDesiredTargetHydration);
    }
  }

  @action public setLeavenWeightUsingInoculation = (value: number): void => {
    this.leavenWeight = (value / 100) * this.dough.flour.flourWeight;
    if (this.dough.hydration.desiredHydrationLocked) {
      this.dough.water.setwater(this.dough.water.waterWeightToMatchDesiredTargetHydration);
      this.dough.flour.setFlourWeight(this.dough.flour.flourWeightToMatchDesiredTargetHydration);
    }
  }

  @computed public get inoculation(): number {
    return (this.leavenWeight / this.dough.flour.flourWeight) * 100;
  }

}
