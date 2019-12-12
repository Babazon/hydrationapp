import { observable, computed, action } from 'mobx';
import { presets } from './env';

export class Controller {

  constructor(protected readonly appPresets: any) {
  }

  [key: string]: any;

  @observable public flourWeight: number = 1000;
  @observable public waterWeight: number = 725;
  @observable public leavenWeight: number = 200;
  @observable public leavenHydration: number = 100;

  @computed public get saltRatio(): number {
    return this.appPresets.saltRatio;
  }

  @computed public get postBakeWeightRatio(): number {
    return this.appPresets.postBakeWeightRatio;
  }

  @computed public get flourWeightPresets(): number[] {
    return this.appPresets.flourWeightPresets;
  }

  @computed public get leavenInoculationPresets(): number[] {
    return this.appPresets.leavenInoculationPresets;
  }

  @computed public get desiredHydrationPresets(): number[] {
    return this.appPresets.desiredHydrationPresets;
  }

  @computed public get leavenHydrationPresets(): number[] {
    return this.appPresets.leavenHydrationPresets;
  }

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

  @observable public desiredTargetHydration: number = 75;

  @computed public get waterWeightToMatchDesiredTargetHydration(): number {
    if (this.flourWeight != null && this.leavenWeight != null && this.leavenHydration != null) {
      return ((this.desiredTargetHydration / 100) * this.totalFlour) - this.leavenWater;
    }
    return 0;
  }

  @computed public get minFlour(): number {
    return this.appPresets.minFlour;
  }

  @computed public get maxFlour(): number {
    return this.appPresets.maxFlour;
  }

  @computed public get minLeaven(): number {
    return this.appPresets.minLeaven;
  }

  @computed public get maxLeaven(): number {
    return this.appPresets.maxLeaven;
  }

  @computed public get minDesiredHydration(): number {
    return this.appPresets.minDesiredHydration;
  }
  @computed public get maxDesiredHydration(): number {
    return this.appPresets.maxDesiredHydration;
  }

  @computed public get minLeavenHydration(): number {
    return this.appPresets.minLeavenHydration;
  }

  @computed public get maxLeavenHydration(): number {
    return this.appPresets.maxLeavenHydration;
  }

  @computed public get minWater(): number {
    return this.appPresets.minWater;
  }

  @computed public get maxWater(): number {
    return this.appPresets.maxWater;
  }

  @action public setFlourWeight = (value: number): void => {
    this.flourWeight = value;
  }

  @action public setLeavenWeight = (value: number): void => {
    this.leavenWeight = value;
  }

  @action public setLeavenHydration = (value: number): void => {
    this.leavenHydration = value;
  }

  @action public setwater = (value: number): void => {
    this.waterWeight = value;
  }

  @action public setLeavenWeightUsingInoculation = (value: number): void => {
    this.leavenWeight = (value / 100) * this.flourWeight;
  }

  @computed public get inoculation(): number {
    return (this.leavenWeight / this.flourWeight) * 100;
  }

  @action public setWaterWeightAndUpdateDesiredHydration = (value: number): void => {
    this.waterWeight = value;
    this.desiredTargetHydration = this.totalHydration * 100;
  }

  @action public setDesiredHydrationAndUpdateRequiredWaterWeight = (value: number): void => {
    this.desiredTargetHydration = value;
    this.waterWeight = this.waterWeightToMatchDesiredTargetHydration;
  }

  @computed public get languageConstants(): { [key: string]: string } | undefined {
    try {
      return this.appPresets.languageConstants;
    } catch (error) {
      //
    }
  }

}

export default new Controller(presets);
