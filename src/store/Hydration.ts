import { observable, action, computed, reaction } from 'mobx';
import { Dough } from './Dough';

export class Hydration {

  constructor(private readonly dough: Dough) {
    reaction(() => this.desiredHydrationLocked, (locked) => {
      if (locked) {
        this.dough.water.setWaterWeight(this.dough.water.waterWeightToMatchDesiredTargetHydration);
      }
    });
  }

  @observable public desiredHydrationLocked: boolean = false;

  @action public toggleDesiredHydationLock = (): void => {
    this.desiredHydrationLocked = !this.desiredHydrationLocked;
  }

  @observable public desiredTargetHydration: number = 75;

  @action public setDesiredTargetHydration = (value: number) => {
    if (!this.desiredHydrationLocked) {
      this.desiredTargetHydration = value;
    }
  }

  @computed public get minDesiredHydration(): number {
    return this.dough.userInterface.appPresets.minDesiredHydration;
  }
  @computed public get maxDesiredHydration(): number {
    return this.dough.userInterface.appPresets.maxDesiredHydration;
  }

}
