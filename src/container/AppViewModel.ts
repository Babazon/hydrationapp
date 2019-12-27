// TODO: PREPARE FOR IN-APP-PURCHASE

import AsyncStorage from '@react-native-community/async-storage';
import { action, computed, observable } from 'mobx';
import { presets } from '../env';
import { Dough } from '../store/Dough';
import { ISliderRowProps } from '../toolkit/SliderRow';
import { PersistenceModel } from '../utilities/Persistence';

export class AppViewModel {
  constructor(public readonly dough: Dough) { }

  @observable public isLoading = false;
  @observable public isRecipeSaved = false;
  @observable public isPremium = false;

  @action private readonly toggleLoading = ({ isLoading }: { isLoading: boolean }) => {
    this.isLoading = isLoading;
  }

  @action private readonly setRecipeSaved = ({ isRecipeSaved }: { isRecipeSaved: boolean }): void => {
    this.isRecipeSaved = isRecipeSaved;
  }

  @action public setPremium = () => {
    this.isPremium = true;
  }

  @action public persistRecipe = async (): Promise<void> => {
    this.toggleLoading({ isLoading: true });
    try {
      await AsyncStorage.setItem(presets.storageKey, this.dough.persistenceModel.serialize());
      this.setRecipeSaved({ isRecipeSaved: true });
    } catch (error) {
      this.setRecipeSaved({ isRecipeSaved: false });
    } finally {
      this.toggleLoading({ isLoading: false });
    }
  }

  @action private readonly recoverRecipe = async (): Promise<PersistenceModel | null> => {
    this.toggleLoading({ isLoading: true });
    try {
      const value = await AsyncStorage.getItem(presets.storageKey);
      if (value != null) {
        return PersistenceModel.deserialize(JSON.parse(value));
      }
    } catch (error) {
      //
    } finally {
      this.toggleLoading({ isLoading: false });
    }
    return null;
  }

  @action public loadRecipe = async (): Promise<void> => {
    try {
      const persistenceModel = await this.recoverRecipe();
      if (persistenceModel != null) {
        this.dough.loadPersistedRecipe(persistenceModel);
      }
    } catch (error) {
      //
    }
  }

  @computed public get sliderData(): ISliderRowProps[] {
    const { flour, water, hydration, leavenWeight, leavenHydration, userInterface, doughWeight, inoculation } = this.dough;
    const data = [
      {
        incrementAmount: userInterface.appPresets.flourIncrementAmount,
        isKeyboardActive: userInterface.flourInputMode,
        label: userInterface.languageConstants._flour_weight,
        maxValue: flour.maxFlour,
        minValue: flour.minFlour,
        onValueChange: flour.setValue,
        onValueClick: userInterface.onFlourValueClick,
        value: flour.value,
        valueAffix: userInterface.languageConstants._gram_abbvr
      },
      {
        incrementAmount: userInterface.appPresets.leavenWeightIncrementAmount,
        isKeyboardActive: userInterface.leavenWeightInputMode,
        label: userInterface.languageConstants._leaven_weight,
        maxValue: leavenWeight.maxLeaven,
        minValue: leavenWeight.minLeaven,
        onValueChange: leavenWeight.setValue,
        onValueClick: userInterface.onLeavenWeightValueClick,
        value: leavenWeight.value,
        valueAffix: userInterface.languageConstants._gram_abbvr
      },
      {
        incrementAmount: userInterface.appPresets.leavenHydrationIncrementAmount,
        isKeyboardActive: userInterface.leavenHydrationInputMode,
        isLocked: leavenHydration.isLocked,
        label: userInterface.languageConstants._leaven_hydration,
        maxValue: leavenHydration.maxLeavenHydration,
        minValue: leavenHydration.minLeavenHydration,
        onValueChange: leavenHydration.setValue,
        onValueClick: userInterface.onLeavenHydrationValueClick,
        toggleLocked: leavenHydration.toggleLocked,
        value: leavenHydration.value,
        valueAffix: userInterface.languageConstants._percent
      },
      {
        incrementAmount: userInterface.appPresets.waterIncrementAmount,
        isKeyboardActive: userInterface.waterInputMode,
        label: userInterface.languageConstants._water,
        maxValue: water.maxWater,
        minValue: water.minWater,
        onValueChange: water.setValue,
        onValueClick: userInterface.onWaterValueClick,
        value: water.value,
        valueAffix: userInterface.languageConstants._gram_abbvr
      },
      {
        incrementAmount: userInterface.appPresets.targetHydrationIncrementAmount,
        isKeyboardActive: userInterface.targetHydrationInputMode,
        isLocked: hydration.isLocked,
        label: userInterface.languageConstants._target_hydration,
        maxValue: hydration.maxTargetHydration,
        minValue: hydration.minTargetHydration,
        onValueChange: hydration.setValue,
        onValueClick: userInterface.onTargetHydrationValueClick,
        toggleLocked: hydration.toggleLocked,
        value: hydration.value,
        valueAffix: userInterface.languageConstants._percent
      },
    ];

    if (this.isPremium) {
      return [...data,
      {
        incrementAmount: 1000,
        isKeyboardActive: userInterface.targetDoughWeightInputMode,
        isLocked: doughWeight.isLocked,
        label: userInterface.languageConstants._target_dough_weight,
        maxValue: 50000,
        minValue: 0,
        onValueChange: doughWeight.setValue,
        onValueClick: userInterface.onTargetDoughValueClick,
        toggleLocked: doughWeight.toggleLocked,
        value: doughWeight.value,
        valueAffix: userInterface.languageConstants._gram_abbvr
      },
      {
        incrementAmount: 1,
        isKeyboardActive: userInterface.leavenInoculationInputMode,
        isLocked: inoculation.isLocked,
        label: userInterface.languageConstants._target_inoculation,
        maxValue: 100,
        minValue: 0,
        onValueChange: inoculation.setValue,
        onValueClick: userInterface.onLeavenInoculationValueClick,
        toggleLocked: inoculation.toggleLocked,
        value: inoculation.value,
        valueAffix: userInterface.languageConstants._percent
      }
      ];
    }

    return data;
  }

}
