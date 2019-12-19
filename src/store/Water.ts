import { action, computed, observable, reaction } from 'mobx';
import { Dough } from './Dough';

export class Water {
  constructor(private readonly dough: Dough) {
    reaction(() => this.waterWeight, (_: number) => {
      if (this.dough.hydration.desiredHydrationLocked) {
        this.dough.flour.setFlourWeight(this.dough.flour.flourWeightToMatchDesiredTargetHydration);
      }
    });
  }

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

  @action public setWaterWeight = (value: number): void => {
    this.waterWeight = value > 0 ? value : 0;
  }

  @action public setWaterWeightAndUpdateDesiredHydration = (value: number): void => {
    this.waterWeight = value > 0 ? value : 0;
  }

}
