import { action, computed, observable } from 'mobx';
import { Alert } from 'react-native';
import { presets } from '../env';
import { Dough } from './Dough';
import { Generic } from './Generic';

export class DoughWeight extends Generic {

  constructor(private readonly dough: Dough) {
    super();
  }

  @observable public value: number = presets.initialTargetDoughWeight;

  @action public setValue = (value: number) => {
    if (value > 0) {
      if (this.dough.leavenHydration.value <= 0 || this.dough.hydration.value <= 0 || this.dough.inoculation.value <= 0) {
        Alert.alert('One more step..', 'Please set Target Hydration, Leaven Hydration and Target Inoculation before calculating target dough value..');
        this.dough.hydration.isLocked = false;
        this.dough.leavenHydration.isLocked = false;
        this.dough.inoculation.setValue(presets.initialTargetInoculation);
        this.dough.leavenHydration.setValue(presets.initialLeavenHydration);
        this.dough.hydration.setValue(75);
      } else {
        this.value = value;
        this.dough.hydration.isLocked = true;
        this.dough.leavenHydration.isLocked = true;
      }
    } else {
      this.value = 0;
      this.dough.hydration.isLocked = false;
      this.dough.leavenHydration.isLocked = false;
    }

  }

  @computed public get bakedTargetDoughWeight(): number {
    if (this.value) {
      return this.value * 0.85;
    }
    return 0;
  }

}
