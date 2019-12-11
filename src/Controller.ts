import { observable, computed } from 'mobx';

export class Controller {

  @observable public flourWeight: number = 1000;
  @observable public waterWeight: number = 725;
  @observable public leavenWeight: number = 200;
  @observable public leavenHydration: number = 100;

  @computed public get leavenFlour(): number {
    if (this.leavenHydration != null && this.leavenWeight != null) {
      return (this.leavenWeight / (1 + this.leavenHydration / 100));
    }
    return 0;
  }

  @computed public get leavenWater(): number {
    if (this.leavenHydration != null && this.leavenWeight != null) {
      return (this.leavenWeight / (1 + this.leavenHydration / 100)) * (this.leavenHydration / 100);
    }
    return 0;
  }

  @computed public get totalFlour(): number {
    if (this.flourWeight != null && this.leavenFlour != null) {
      return this.flourWeight + this.leavenFlour;
    }
    return 0;
  }

  @computed public get totalWater(): number {
    if (this.waterWeight != null && this.leavenWater != null) {
      return this.waterWeight + this.leavenWater;
    }
    return 0;
  }

  @computed public get totalHydration(): number {
    if (this.totalFlour != null && this.totalWater != null) {
      return this.totalWater / this.totalFlour;
    }
    return 0;
  }

  @computed public get recommendedSalt(): number {
    if (this.totalFlour != null) {
      return this.totalFlour * 0.022;
    }
    return 0;
  }

  @computed public get postBakeWeight(): number {
    if (this.totalFlour != null && this.totalWater != null) {
      return 0.85 * (this.totalWater + this.totalFlour);
    }
    return 0;
  }

  @observable public desiredTargetHydration: number = 75;

  @computed public get waterWeightToMatchDesiredTargetHydration(): number {
    if (this.flourWeight != null && this.leavenWeight != null && this.leavenHydration != null) {
      return ((this.desiredTargetHydration / 100) * this.totalFlour) - this.leavenWater;
    }
    return 0;
  }
}

export default new Controller();
