import { action, observable } from 'mobx';
import { Units } from './UserInterface';

export class Generic {

  @observable public value: number;
  @observable public isLocked = false;
  @observable public units: Units = Units.metric;
  @observable public inputMode = false;

  @action public toggleLocked = () => {
    this.isLocked = !this.isLocked;
  }

  @action public setValue = (value: number) => {
    if (!this.isLocked && value >= 0) {
      this.value = value;
    }
  }

  @action public toggleUnits = () => {
    if (this.units === Units.metric) {
      this.units = Units.imperial;
    } else {
      this.units = Units.metric;
    }
  }

  @action public toggleInputMode = () => {
    this.inputMode = !this.inputMode;
  }

}
