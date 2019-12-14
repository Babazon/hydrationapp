import { Dough } from './Dough';
import { computed, observable, action } from 'mobx';

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

  @computed public get languageConstants(): { [key: string]: string } | undefined {
    try {
      return this.appPresets.languageConstants;
    } catch (error) {
      //
    }
  }

  @observable public flourInputMode: boolean = false;

  @action public onFlourValueClick = () => {
    this.flourInputMode = true;
  }

  @observable public waterInputMode: boolean = false;

  @action public onWaterValueClick = () => {
    this.waterInputMode = true;
  }

  @observable public leavenWeightInputMode: boolean = false;

  @action public onLeavenWeightValueClick = () => {
    this.leavenWeightInputMode = true;
  }

  @observable public leavenHydrationInputMode: boolean = false;

  @action public onLeavenHydrationValueClick = () => {
    this.leavenHydrationInputMode = true;
  }

  @observable public desiredTargetHydrationInputMode: boolean = false;

  @action public onDesiredTargetHydrationValueClick = () => {
    this.desiredTargetHydrationInputMode = true;
  }

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
}
