import { computed, observable, reaction } from 'mobx';
import { presets } from '../../env';
import { yieldFlourToMatchHydration } from '../../utilities/formulae';
import { Dough } from './Dough';
import { Generic } from './Generic';

export class Flour extends Generic {

  constructor(private readonly dough: Dough) {
    super();

    reaction(() => this.value, (_) => {
      if (dough.hydration.value && dough.hydration.isLocked) {
        dough.water.setValue(dough.water.waterValueToMatchTargetHydration);
      }
    });
  }

  @observable public value: number = presets.initialFlourValue;

  @computed public get flourValueToMatchTargetHydration(): number {

    return yieldFlourToMatchHydration({
      hydration: this.dough.hydration.value,
      leavenFlour: this.dough.leavenWeight.leavenFlour,
      leavenHydration: this.dough.leavenHydration.value,
      leavenWeight: this.dough.leavenWeight.value,
      totalWater: this.dough.totalWater,
      waterWeight: this.dough.water.value
    });

  }

  @computed public get minFlour(): number {
    return this.dough.userInterface.appPresets.minFlour;
  }

  @computed public get maxFlour(): number {
    return this.dough.userInterface.appPresets.maxFlour;
  }

}
