import { action, observable } from 'mobx';

export class Generic {

  @observable public isLocked: boolean = false;
  @action public toggleLocked = () => {
    this.isLocked = !this.isLocked;
  }

  @observable public weight: number;
  @action public setWeight = (value: number) => {
    if (!this.isLocked && value >= 0) {
      this.weight = value;
    }
  }

}
