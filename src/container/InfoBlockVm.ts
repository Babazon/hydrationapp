import { computed } from 'mobx';

import { Dough } from '../store/Dough/Dough';
import { getDecimalForFixed } from '../utilities/getDecimalForFixed';

// tslint:disable-next-line: interface-name
export interface InfoRenderData {
  label: string;
  unit: string;
  value: string;
}

export class InfoBlockVm {

  constructor(private readonly dough: Dough) { }

  @computed public get infoBlockData(): InfoRenderData[] {
    const { dough } = this;

    return [
      {
        label: dough.userInterface.languageConstants._recipe_flour,
        unit: ` ${dough.userInterface.languageConstants._gram_abbvr}`,
        value: dough.flour.value.toFixed(getDecimalForFixed(dough.flour.value))
      },
      {
        label: dough.userInterface.languageConstants._recipe_water,
        unit: ` ${dough.userInterface.languageConstants._gram_abbvr}`,
        value: dough.water.value.toFixed(getDecimalForFixed(dough.water.value))
      },
      {
        label: dough.userInterface.languageConstants._total_leaven,
        unit: ` ${dough.userInterface.languageConstants._gram_abbvr}`,
        value: dough.leavenWeight.value.toFixed(getDecimalForFixed(dough.leavenWeight.value))
      },
      {
        label: dough.userInterface.languageConstants._current_inoculation,
        unit: `${dough.userInterface.languageConstants._percent}`,
        value: dough.leavenWeight.inoculation.toFixed(getDecimalForFixed(dough.leavenWeight.value))
      },
      {
        label: dough.userInterface.languageConstants._inoculation,
        unit: `${dough.userInterface.languageConstants._percent}`,
        value: dough.inoculation.value.toFixed(getDecimalForFixed(dough.leavenWeight.value))
      },
      {
        label: dough.userInterface.languageConstants._recommended_salt,
        unit: ` ${dough.userInterface.languageConstants._gram_abbvr}`,
        value: dough.recommendedSalt.toFixed(getDecimalForFixed(dough.recommendedSalt))
      },
      {
        label: dough.userInterface.languageConstants._total_flour,
        unit: ` ${dough.userInterface.languageConstants._gram_abbvr}`,
        value: dough.totalFlour.toFixed(getDecimalForFixed(dough.totalFlour))
      },
      {
        label: dough.userInterface.languageConstants._total_water,
        unit: ` ${dough.userInterface.languageConstants._gram_abbvr}`,
        value: dough.totalWater.toFixed(getDecimalForFixed(dough.totalWater))
      },
      {
        label: dough.userInterface.languageConstants._total_dough_weight,
        unit: ` ${dough.userInterface.languageConstants._gram_abbvr}`,
        value: (dough.totalFlour + dough.totalWater + dough.recommendedSalt)
          .toFixed(getDecimalForFixed(dough.totalFlour + dough.totalWater + dough.recommendedSalt))
      },
      {
        label: dough.userInterface.languageConstants._total_baked_weight,
        unit: ` ${dough.userInterface.languageConstants._gram_abbvr}`,
        value: dough.postBakeWeight.toFixed(getDecimalForFixed(dough.postBakeWeight))
      },
      {
        label: dough.userInterface.languageConstants._total_hydration,
        unit: dough.userInterface.languageConstants._percent,
        value: (dough.totalHydration * 100).toFixed(getDecimalForFixed(dough.totalHydration * 100))
      },
      {
        label: dough.userInterface.languageConstants._initial_volume,
        unit: ` ${dough.userInterface.languageConstants._liter_abbvr}`,
        value: dough.experimentalDoughVolume.toFixed(getDecimalForFixed(dough.experimentalDoughVolume))
      },
      {
        label: dough.userInterface.languageConstants._final_volume,
        unit: ` ${dough.userInterface.languageConstants._liter_abbvr}`,
        value: dough.experimentalBulkVolume.toFixed(getDecimalForFixed(dough.experimentalBulkVolume))
      },
    ];
  }
}
