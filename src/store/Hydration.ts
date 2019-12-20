import { action, computed, observable, reaction } from 'mobx';
import { Dough } from './Dough';

export class Hydration {

  constructor(private readonly dough: Dough) {
    reaction(() => this.targetHydrationLocked, this.waterReactionCallback);
  }

  @action private waterReactionCallback = (locked: boolean) => {
    if (locked) {
      this.dough.water.setWeight(this.dough.water.waterWeightToMatchTargetHydration);
    }
  }

  @observable public targetHydrationLocked: boolean = false;

  @action public toggleTargetHydrationLock = (): void => {
    this.targetHydrationLocked = !this.targetHydrationLocked;
  }

  @observable public targetHydration: number = 75;

  @action public setTargetHydration = (value: number) => {
    if (!this.targetHydrationLocked) {
      this.targetHydration = value;
    }
  }

  @computed public get minTargetHydration(): number {
    return this.dough.userInterface.appPresets.minTargetHydration;
  }
  @computed public get maxTargetHydration(): number {
    return this.dough.userInterface.appPresets.maxTargetHydration;
  }

}
