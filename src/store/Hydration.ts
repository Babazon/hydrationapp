import { action, computed, observable, reaction } from 'mobx';
import { presets } from '../env';
import { Dough } from './Dough';
import { Generic } from './Generic';

export class Hydration extends Generic {

  constructor(private readonly dough: Dough) {
    super();

    reaction(() => this.isLocked, this.waterReactionCallback);
  }

  @action private waterReactionCallback = (locked: boolean) => {
    if (locked) {
      this.dough.water.setWeight(this.dough.water.waterWeightToMatchTargetHydration);
    }
  }

  @observable public targetHydration: number = presets.initialTargetHydration;

  @action public setTargetHydration = (value: number) => {
    if (!this.isLocked) {
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
