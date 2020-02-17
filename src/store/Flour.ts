import { action, computed, observable, reaction } from 'mobx';
import { presets } from '../env';
import { yieldFlourToMatchHydration } from '../utilities/formulae';
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

  // DOUGH BREAK DOWN FEATURE

  @observable private parts: Array<[string, number]> = [['Total', 100]];

  @action public createFlourPart = (partName: string) => {
    const alreadyExists = this.parts.some(([name, _]) => {
      return name.toLowerCase() === partName.toLowerCase();
    });
    if (!alreadyExists) {
      this.parts.push([partName, 0]);
    }
  }

  @action public setRatio = (_: number) => {
    // implement logic to keep the sum of total ratios in parts array at 100!
    // Option 1: User numeric input, and warn to keep it at 100
    // Option 2: Sliders, but moving Slider2 makes the Slider1 react (multiple sliders??)
    // Question: In case of reaction, which value gets adjusted if slider3 is moved? slider1 or slider2?
    // Could we lock all but one, and set the sliders that aren't locked only?
  }

  @computed public get flourParts(): Array<[string, number, number]> {
    return this.parts.map(([name, ratio]) => {
      const numericValue = this.value * (ratio / 100);
      return [name, ratio, numericValue];
    });
  }

}
