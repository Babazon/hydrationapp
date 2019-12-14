import { observable, action, computed } from 'mobx';
import { Flour } from './Flour';
import { Water } from './Water';
import { Leaven } from './Leaven';
import { Hydration } from './Hydration';
import { UserInterface } from './UserInterface';
import { presets } from '../env';

export class Dough {

  constructor(protected readonly appPresets: any) {
  }

  @observable public flour: Flour = new Flour(this);
  @observable public water: Water = new Water(this);
  @observable public leaven: Leaven = new Leaven(this);
  @observable public hydration: Hydration = new Hydration(this);
  @observable public userInterface: UserInterface = new UserInterface(this, this.appPresets);

  @action public resetValues = () => {
    this.flour.flourWeight = this.appPresets.initialFlourWeight;
    this.water.waterWeight = this.appPresets.initialWaterWeight;
    this.leaven.leavenWeight = this.appPresets.initialLeavenWeight;
    this.leaven.leavenHydration = this.appPresets.initialLeavenHydration;
    this.hydration.desiredHydrationLocked = false;
    this.hydration.desiredTargetHydration = this.appPresets.initialDesiredTargetHydration;
  }

  @computed public get saltRatio(): number {
    return this.appPresets.saltRatio;
  }

  @computed public get postBakeWeightRatio(): number {
    return this.appPresets.postBakeWeightRatio;
  }

  @computed public get totalFlour(): number {
    if (this.flour.flourWeight != null && this.leaven.leavenFlour != null) {
      return this.flour.flourWeight + this.leaven.leavenFlour;
    }
    return 0;
  }

  @computed public get totalWater(): number {
    if (this.water.waterWeight != null && this.leaven.leavenWater != null) {
      return this.water.waterWeight + this.leaven.leavenWater;
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
      return this.totalFlour * this.appPresets.saltRatio;
    }
    return 0;
  }

  @computed public get postBakeWeight(): number {
    if (this.totalFlour != null && this.totalWater != null) {
      return this.postBakeWeightRatio * (this.totalWater + this.totalFlour);
    }
    return 0;
  }

}

export default new Dough(presets);
