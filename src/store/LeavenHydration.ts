import { action, computed, observable, reaction } from 'mobx';
import { presets } from '../env';
import { Dough } from './Dough';
import { Generic } from './Generic';

export class LeavenHydration extends Generic {

  constructor(private readonly dough: Dough) {
    super();

    reaction(() => this.value, this.updateWaterValueToMatchTargetHydration);

  }

  private readonly updateWaterValueToMatchTargetHydration = (_: number): void => {
    if (this.dough.hydration.isLocked) {
      this.dough.water.setValue(this.dough.water.waterValueToMatchTargetHydration);
    }
  }

  @observable public value: number = presets.initialLeavenHydration;

  @computed public get minLeavenHydration(): number {
    return this.dough.userInterface.appPresets.minLeavenHydration;
  }

  @computed public get maxLeavenHydration(): number {
    return this.dough.userInterface.appPresets.maxLeavenHydration;
  }

  @action public setValue = (value: number): void => {
    this.value = value > 0 ? value : 0;
  }
}
