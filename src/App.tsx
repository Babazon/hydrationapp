import 'es6-symbol/implement';
import { computed } from 'mobx';
import { observer } from 'mobx-react';
import React from 'react';
import { RefreshControl, SafeAreaView, StyleSheet, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import './bugsnagConfig';
import { InfoBlock } from './Components/InfoBlock';
import { ISliderRowProps, SliderRow } from './Components/SliderRow';
import { TextWithAccessibility } from './Components/TextWithAccessibility';
import { ErrorBoundary } from './ErrorBoundary';
import dough from './store/Dough';

@observer
export default class App extends React.Component {

  constructor(props: {}) {
    super(props);
  }

  @computed private get sliderRowData(): ISliderRowProps[] {
    const { flour, water, hydration, leavenWeight, leavenHydration, userInterface, doughWeight, inoculation } = dough;

    return [
      {
        incrementAmount: userInterface.appPresets.flourIncrementAmount,
        isKeyboardActive: userInterface.flourInputMode,
        label: userInterface.languageConstants!._flour_weight,
        maxValue: flour.maxFlour,
        minValue: flour.minFlour,
        onSymbolClick: () => {
          /* */
        },
        onValueChange: flour.setValue,
        onValueClick: userInterface.onFlourValueClick,
        value: flour.value,
        valueAffix: userInterface.languageConstants!._gram_abbvr
      },
      {
        incrementAmount: userInterface.appPresets.leavenWeightIncrementAmount,
        isKeyboardActive: userInterface.leavenWeightInputMode,
        label: userInterface.languageConstants!._leaven_weight,
        maxValue: leavenWeight.maxLeaven,
        minValue: leavenWeight.minLeaven,
        onSymbolClick: () => {
          /* */
        },
        onValueChange: leavenWeight.setValue,
        onValueClick: userInterface.onLeavenWeightValueClick,
        value: leavenWeight.value,
        valueAffix: userInterface.languageConstants!._gram_abbvr
      },
      {
        incrementAmount: userInterface.appPresets.leavenHydrationIncrementAmount,
        isKeyboardActive: userInterface.leavenHydrationInputMode,
        isLocked: leavenHydration.isLocked,
        label: userInterface.languageConstants!._leaven_hydration,
        maxValue: leavenHydration.maxLeavenHydration,
        minValue: leavenHydration.minLeavenHydration,
        onValueChange: leavenHydration.setValue,
        onValueClick: userInterface.onLeavenHydrationValueClick,
        toggleLocked: leavenHydration.toggleLocked,
        value: leavenHydration.value,
        valueAffix: userInterface.languageConstants!._percent
      },
      {
        incrementAmount: userInterface.appPresets.waterIncrementAmount,
        isKeyboardActive: userInterface.waterInputMode,
        label: userInterface.languageConstants!._water,
        maxValue: water.maxWater,
        minValue: water.minWater,
        onSymbolClick: () => {
          /* */
        },
        onValueChange: water.setValue,
        onValueClick: userInterface.onWaterValueClick,
        value: water.value,
        valueAffix: userInterface.languageConstants!._gram_abbvr
      },
      {
        incrementAmount: userInterface.appPresets.targetHydrationIncrementAmount,
        isKeyboardActive: userInterface.targetHydrationInputMode,
        isLocked: hydration.isLocked,
        label: userInterface.languageConstants!._target_hydration,
        maxValue: hydration.maxTargetHydration,
        minValue: hydration.minTargetHydration,
        onValueChange: hydration.setValue,
        onValueClick: userInterface.onTargetHydrationValueClick,
        toggleLocked: hydration.toggleLocked,
        value: hydration.value,
        valueAffix: userInterface.languageConstants!._percent
      },
      {
        incrementAmount: 1000,
        isKeyboardActive: userInterface.targetDoughWeightInputMode,
        label: userInterface.languageConstants!._target_dough_weight,
        maxValue: 50000,
        minValue: 0,
        onValueChange: doughWeight.setValue,
        onValueClick: userInterface.onTargetDoughValueClick,
        value: doughWeight.value,
        valueAffix: userInterface.languageConstants!._gram_abbvr
      },
      {
        incrementAmount: 5,
        isKeyboardActive: userInterface.leavenInoculationInputMode,
        label: userInterface.languageConstants!._target_inoculation,
        maxValue: 100,
        minValue: 0,
        onValueChange: inoculation.setValue,
        onValueClick: userInterface.onLeavenInoculationValueClick,
        value: inoculation.value, // targetIno = 0 should display inoculation instead
        valueAffix: userInterface.languageConstants!._percent
      }
    ];
  }

  private renderSlider = ({ item }: { item: ISliderRowProps }) => {
    return (
      <View style={styles.sliderRow} key={item.label}>
        <SliderRow
          {...item}
        />
      </View>
    );
  }

  public render() {
    const { userInterface, resetValues } = dough;

    return (
      <ErrorBoundary>
        <SafeAreaView style={styles.safeAreaView}>

          <KeyboardAwareScrollView
            showsVerticalScrollIndicator={false}
            refreshControl={<RefreshControl title={userInterface.languageConstants!._reset} refreshing={false} onRefresh={resetValues} />}
            contentContainerStyle={styles.scrollViewContentStyle}>

            {this.sliderRowData.slice().map((item: ISliderRowProps) => {
              return this.renderSlider({ item });
            })
            }

            {/* Info Block */}
            <InfoBlock dough={dough} />

            {/* CREDITS FOR TEST RELEASES */}
            <View style={styles.creditContainer}>
              <TextWithAccessibility style={styles.creditText}>
                Code: @sourdoughpie
            </TextWithAccessibility>
              <TextWithAccessibility style={styles.creditText}>
                Design: @chexee
            </TextWithAccessibility>
              <TextWithAccessibility style={styles.creditText}>
                Feedback: instagram.com/sourdoughpie or basar.yuksel@gmail.com
            </TextWithAccessibility>
            </View>
          </KeyboardAwareScrollView>
        </SafeAreaView>
      </ErrorBoundary >
    );
  }
}

const styles = StyleSheet.create({
  creditContainer: {
    alignItems: 'stretch',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  creditText: {
    fontSize: 8,
    textAlign: 'center'
  },
  safeAreaView: {
    flex: 1,
    marginTop: 16
  },
  scrollViewContentStyle: {
    alignItems: 'stretch',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginHorizontal: 8,
    paddingVertical: 16
  },
  sliderRow: {
    height: 80,
    paddingBottom: 8
  }
});
