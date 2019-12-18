import { Dough } from './Dough';

import { computed, observable, action } from 'mobx';

export class Flour {

  constructor(private readonly dough: Dough) {
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
    this.flourWeight = value > 0 ? value : 0;
  }

  @action public setFlourWeightAndAdjustWater = (value: number): void => {
    this.flourWeight = value > 0 ? value : 0;
    if (this.dough.hydration.desiredTargetHydration && this.dough.hydration.desiredHydrationLocked) { // add reaction
      this.dough.water.setWaterWeight(this.dough.water.waterWeightToMatchDesiredTargetHydration);
    }
  }

}
