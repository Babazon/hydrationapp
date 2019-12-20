import { action, computed, observable, reaction } from 'mobx';
import { Dough } from './Dough';
import { Generic } from './Generic';

export class Leaven extends Generic {

  constructor(private readonly dough: Dough) {
    super();

    reaction(() => this.weight, (_) => {
      if (this.dough.hydration.targetHydrationLocked) {
        this.dough.water.setWeight(this.dough.water.waterWeightToMatchTargetHydration);
      }
    });

    reaction(() => this.leavenHydration, (_) => {
      if (this.dough.hydration.targetHydrationLocked) {
        this.dough.water.setWeight(this.dough.water.waterWeightToMatchTargetHydration);
      }
    });
  }

  @observable public weight: number = 200;
  @observable public leavenHydration: number = 100;

  @computed public get leavenFlour(): number {
    if (this.leavenHydration != null && this.weight != null) {
      return (this.weight / (1 + this.leavenHydration / 100));
    }
    return 0;
  }

  @computed public get leavenWater(): number {
    if (this.leavenHydration != null &&
      this.weight != null) {
      return (this.weight / (1 + this.leavenHydration / 100)) * (this.leavenHydration / 100);
    }
    return 0;
  }

  @computed public get minLeaven(): number {
    return this.dough.userInterface.appPresets.minLeaven;
  }

  @computed public get maxLeaven(): number {
    return this.dough.userInterface.appPresets.maxLeaven;
  }

  @computed public get minLeavenHydration(): number {
    return this.dough.userInterface.appPresets.minLeavenHydration;
  }

  @computed public get maxLeavenHydration(): number {
    return this.dough.userInterface.appPresets.maxLeavenHydration;
  }

  @action public setLeavenHydration = (value: number): void => {
    this.leavenHydration = value > 0 ? value : 0;
  }

  @action public setLeavenWeightUsingInoculation = (value: number): void => {
    this.weight = (value / 100) * this.dough.flour.weight;
  }

  @computed public get inoculation(): number {
    if (!isNaN(this.weight / this.dough.flour.weight)) {
      return (this.weight / this.dough.flour.weight) * 100;
    }
    return 0;
  }

}
