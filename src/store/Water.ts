import { Dough } from './Dough';
import { computed, observable, action } from 'mobx';

export class Water {
  constructor(private readonly dough: Dough) { }

  @observable public waterWeight: number = 725;

  @observable public waterLocked: boolean = false;

  @action public toggleWaterLock = (): void => {
    this.waterLocked = !this.waterLocked;
  }

  @computed public get waterWeightToMatchDesiredTargetHydration(): number {
    if (this.dough.flour.flourWeight != null && this.dough.leaven.leavenWeight != null && this.dough.leaven.leavenHydration != null) {
      return ((this.dough.hydration.desiredTargetHydration / 100) * this.dough.totalFlour) - this.dough.leaven.leavenWater;
    }
    return 0;
  }

  @computed public get minWater(): number {
    return this.dough.userInterface.appPresets.minWater;
  }

  @computed public get maxWater(): number {
    return this.dough.userInterface.appPresets.maxWater;
  }

  @action public setwater = (value: number): void => {
    this.waterWeight = value > 0 ? value : 0;
    if (this.dough.hydration.desiredTargetHydration && this.dough.hydration.desiredHydrationLocked) {
      this.dough.flour.setFlourWeight(this.dough.flour.flourWeightToMatchDesiredTargetHydration);
    }
  }

  @action public setWaterWeightAndUpdateDesiredHydration = (value: number): void => {
    this.waterWeight = value > 0 ? value : 0;
    if (!this.dough.hydration.desiredHydrationLocked) {
      this.dough.hydration.desiredTargetHydration = this.dough.totalHydration * 100;
    } else {
      this.dough.flour.setFlourWeight(this.dough.flour.flourWeightToMatchDesiredTargetHydration);
    }
  }

}