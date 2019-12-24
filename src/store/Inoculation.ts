import { action, observable } from 'mobx';
import { Alert } from 'react-native';
import { presets } from '../env';
import { Dough } from './Dough';
import { Generic } from './Generic';

export class Inoculation extends Generic {
  constructor(private readonly dough: Dough) {
    super();
  }

  @observable public value: number = presets.initialTargetInoculation;

  @action public setValue = (value: number): void => {
    if (value > 0) {
      if (this.dough.leavenHydration.value <= 0 || this.dough.hydration.value <= 0) {
        Alert.alert('One more step..', 'Please set Target Hydration, Leaven Hydration before calculating target dough weight..');
        this.dough.hydration.isLocked = false;
        this.dough.leavenHydration.isLocked = false;
        this.dough.leavenHydration.setValue(100);
        this.dough.hydration.setValue(75);
        this.dough.doughWeight.setValue(this.dough.userInterface.appPresets.initialTargetDoughWeight);
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

}
