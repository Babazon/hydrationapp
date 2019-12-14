import { observable, action, computed } from 'mobx';
import { Dough } from './Dough';

export class Hydration {

  constructor(private readonly dough: Dough) { }

  @observable public desiredHydrationLocked: boolean = false;

  @action public toggleDesiredHydationLock = (): void => {
    this.desiredHydrationLocked = !this.desiredHydrationLocked;
    this.dough.water.setwater(this.dough.water.waterWeightToMatchDesiredTargetHydration);
  }

  @observable public desiredTargetHydration: number = 75;

  @computed public get minDesiredHydration(): number {
    return this.dough.userInterface.appPresets.minDesiredHydration;
  }
  @computed public get maxDesiredHydration(): number {
    return this.dough.userInterface.appPresets.maxDesiredHydration;
  }

  @action public setDesiredHydrationAndUpdateRequiredWaterWeight = (value: number): void => {
    if (!this.desiredHydrationLocked) {
      this.desiredTargetHydration = value > 0 ? value : 0;
      this.dough.water.setwater(this.dough.water.waterWeightToMatchDesiredTargetHydration);
    }
  }

}
