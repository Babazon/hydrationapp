import { action, computed, observable, reaction } from 'mobx';
import { presets } from '../env';
import { Dough } from './Dough';
import { Generic } from './Generic';

export class LeavenWeight extends Generic {

  constructor(private readonly dough: Dough) {
    super();

    reaction(() => this.value, this.updateValueToMatchTargetHydration);

    reaction(() => this.dough.leavenHydration.value, this.updateValueToMatchTargetHydration);
  }

  private updateValueToMatchTargetHydration = (_: number): void => {
    if (this.dough.hydration.isLocked) {
      this.dough.water.setValue(this.dough.water.waterValueToMatchTargetHydration);
    }
  }

  @observable public value: number = presets.initialLeavenValue;

  @computed public get leavenFlour(): number {
    if (this.dough.leavenHydration.value != null && this.value != null) {
      return (this.value / (1 + this.dough.leavenHydration.value / 100));
    }
    return 0;
  }

  @computed public get leavenWater(): number {
    if (this.dough.leavenHydration.value != null &&
      this.value != null) {
      return (this.value / (1 + this.dough.leavenHydration.value / 100)) * (this.dough.leavenHydration.value / 100);
    }
    return 0;
  }

  @computed public get minLeaven(): number {
    return this.dough.userInterface.appPresets.minLeaven;
  }

  @computed public get maxLeaven(): number {
    return this.dough.userInterface.appPresets.maxLeaven;
  }

  @action public setLeavenValueUsingInoculation = (value: number): void => {
    this.value = (value / 100) * this.dough.flour.value;
  }

  @computed public get inoculation(): number {
    if (!isNaN(this.value / this.dough.flour.value) && this.dough.flour.value > 0) { // in case of divide by 0
      return (this.value / this.dough.flour.value) * 100;
    }
    return 0;
  }

}
