import { action, computed, observable } from 'mobx';
import { Dough } from './Dough';

export enum Units {
  metric = 'metric',
  imperial = 'imperial'
}

export class UserInterface {
  // @ts-ignore
  constructor(private readonly dough: Dough, public readonly appPresets: any) { }

  @observable private units: Units = Units.metric;

  @action public toggleUnits = () => {
    if (this.units === Units.metric) {
      this.units = Units.imperial;
    } else {
      this.units = Units.metric;
    }
  }

  @computed public get languageConstants(): { [key: string]: string } {
    try {
      return this.appPresets.languageConstants;
    } catch (error) {
      return {};
    }
  }

  @observable public flourInputMode = false;

  @action public onFlourValueClick = () => {
    this.flourInputMode = true;
  }

  @observable public waterInputMode = false;

  @action public onWaterValueClick = () => {
    this.waterInputMode = true;
  }

  @observable public leavenWeightInputMode = false;

  @action public onLeavenWeightValueClick = () => {
    this.leavenWeightInputMode = true;
  }

  @observable public leavenHydrationInputMode = false;

  @action public onLeavenHydrationValueClick = () => {
    this.leavenHydrationInputMode = true;
  }

  @observable public leavenInoculationInputMode = false;

  @action public onLeavenInoculationValueClick = () => {
    this.leavenInoculationInputMode = true;
  }

  @observable public targetHydrationInputMode = false;

  @action public onTargetHydrationValueClick = () => {
    this.targetHydrationInputMode = true;
  }

  @computed public get saltRatio(): number {
    return this.appPresets.saltRatio;
  }

  @observable public targetDoughWeightInputMode = false;

  @action public onTargetDoughValueClick = () => {
    this.targetDoughWeightInputMode = true;
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

  @computed public get targetHydrationPresets(): number[] {
    return this.appPresets.targetHydrationPresets;
  }

  @computed public get leavenHydrationPresets(): number[] {
    return this.appPresets.leavenHydrationPresets;
  }
}
