import { Dough } from './Dough';

import { action, computed, observable, reaction } from 'mobx';

export class Flour {

  constructor(private readonly dough: Dough) {
    reaction(() => this.flourWeight, (_) => {
      if (dough.hydration.desiredTargetHydration && dough.hydration.desiredHydrationLocked) { // add reaction
        dough.water.setWaterWeight(dough.water.waterWeightToMatchDesiredTargetHydration);
      }
    });
  }

  @observable public flourWeight: number = 1000;

  @observable public flourLocked: boolean = false;

  @action public toggleFlourLock = (): void => {
    this.flourLocked = !this.flourLocked;
  }

  @computed public get flourWeightToMatchDesiredTargetHydration(): number {
    if (this.dough.water.waterWeight != null && this.dough.leaven.leavenWeight != null && this.dough.leaven.leavenHydration != null) {
      return ((this.dough.totalWater / this.dough.hydration.desiredTargetHydration) * 100) - this.dough.leaven.leavenFlour;
    }
    return 0;
  }

  @computed public get minFlour(): number {
    return this.dough.userInterface.appPresets.minFlour;
  }

  @computed public get maxFlour(): number {
    return this.dough.userInterface.appPresets.maxFlour;
  }

  @action public setFlourWeight = (value: number): void => {
    this.flourWeight = value > 0 ? value : 0; // doubt
  }

}
