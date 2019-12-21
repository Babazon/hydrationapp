import 'es6-symbol/implement';
import { observer } from 'mobx-react';
import React from 'react';
import { RefreshControl, SafeAreaView, StyleSheet, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { InfoBlock } from './Components/InfoBlock';
import { PresetButtonsRow } from './Components/PresetButtonsRow';
import { SliderRow } from './Components/SliderRow';
import { TextWithAccessibility } from './Components/TextWithAccessibility';
import { ErrorBoundary } from './ErrorBoundary';
import dough from './store/Dough';

@observer
export default class App extends React.Component {

  constructor(props: {}) {
    super(props);
  }

  public render() {
    const { flour, water, hydration, leaven, userInterface, resetValues, targetDoughWeight, setTargetDoughWeight } = dough;

    return (
      <ErrorBoundary>
        <SafeAreaView style={styles.safeAreaView}>

          <KeyboardAwareScrollView
            showsVerticalScrollIndicator={false}
            refreshControl={<RefreshControl title={userInterface.languageConstants!._reset} refreshing={false} onRefresh={resetValues} />}
            contentContainerStyle={styles.scrollViewContentStyle}>

            {/* Flour Weight */}
            <View style={styles.sliderRow}>
              <SliderRow
                value={flour.weight}
                onValueChange={flour.setWeight}
                onValueClick={userInterface.onFlourValueClick}
                onSymbolClick={() => {/* */ }}
                valueAffix={userInterface.languageConstants!._gram_abbvr}
                incrementAmount={userInterface.appPresets.flourIncrementAmount}
                minValue={flour.minFlour}
                maxValue={flour.maxFlour}
                isKeyboardActive={userInterface.flourInputMode}
                label={userInterface.languageConstants!._flour_weight}
              />
            </View>
            <View style={styles.presetRow}>
              <PresetButtonsRow
                presetValues={userInterface.flourWeightPresets}
                onClickCallback={flour.setWeight}
                valueSuffix={userInterface.languageConstants!._gram_abbvr}
                selectedValue={flour.weight}
              />
            </View>

            {/* Leaven Weight */}
            <View style={styles.sliderRow}>
              <SliderRow
                value={leaven.weight}
                onValueChange={leaven.setWeight}
                onValueClick={userInterface.onLeavenWeightValueClick}
                onSymbolClick={() => {/* */ }}
                valueAffix={userInterface.languageConstants!._gram_abbvr}
                incrementAmount={userInterface.appPresets.leavenWeightIncrementAmount}
                minValue={leaven.minLeaven}
                maxValue={leaven.maxLeaven}
                isKeyboardActive={userInterface.leavenWeightInputMode}
                label={userInterface.languageConstants!._leaven_weight}
              />
            </View>
            <View style={styles.presetRow}>
              <PresetButtonsRow
                presetValues={userInterface.leavenInoculationPresets}
                onClickCallback={leaven.setLeavenWeightUsingInoculation}
                valueSuffix={userInterface.languageConstants!._percent}
                selectedValue={leaven.inoculation}
              />
            </View>

            {/* Leaven Hydration  */}
            <View style={styles.sliderRow}>
              <SliderRow
                value={leaven.leavenHydration}
                onValueChange={leaven.setLeavenHydration}
                onValueClick={userInterface.onLeavenHydrationValueClick}
                valueAffix={userInterface.languageConstants!._percent}
                incrementAmount={userInterface.appPresets.leavenHydrationIncrementAmount}
                minValue={leaven.minLeavenHydration}
                maxValue={leaven.maxLeavenHydration}
                isKeyboardActive={userInterface.leavenHydrationInputMode}
                label={userInterface.languageConstants!._leaven_hydration}
              />
            </View>
            <View style={styles.presetRow}>
              <PresetButtonsRow
                presetValues={userInterface.leavenHydrationPresets}
                onClickCallback={leaven.setLeavenHydration}
                valueSuffix={userInterface.languageConstants!._percent}
                selectedValue={leaven.leavenHydration}
              />
            </View>

            {/* Water Weight */}
            <View style={styles.sliderRow}>
              <SliderRow
                value={water.weight}
                onValueChange={water.setWeight}
                onValueClick={userInterface.onWaterValueClick}
                onSymbolClick={() => {/* */ }}
                valueAffix={userInterface.languageConstants!._gram_abbvr}
                incrementAmount={userInterface.appPresets.waterIncrementAmount}
                minValue={water.minWater}
                maxValue={water.maxWater}
                isKeyboardActive={userInterface.waterInputMode}
                label={userInterface.languageConstants!._water}
              />
            </View>

            {/* Target Hydration */}
            <View style={styles.sliderRow}>
              <SliderRow
                isLocked={hydration.isLocked}
                toggleLocked={hydration.toggleLocked}
                value={hydration.targetHydration}
                onValueChange={hydration.setTargetHydration}
                onValueClick={userInterface.onTargetHydrationValueClick}
                valueAffix={'%'}
                incrementAmount={userInterface.appPresets.targetHydrationIncrementAmount}
                minValue={hydration.minTargetHydration}
                maxValue={hydration.maxTargetHydration}
                isKeyboardActive={userInterface.targetHydrationInputMode}
                label={userInterface.languageConstants!._target_hydration}
              />
            </View>

            <View style={styles.presetRow}>
              <PresetButtonsRow
                isLocked={hydration.isLocked}
                presetValues={userInterface.targetHydrationPresets}
                onClickCallback={hydration.setTargetHydration}
                valueSuffix={userInterface.languageConstants!._percent}
                selectedValue={hydration.targetHydration}
              />
            </View>

            {__DEV__ &&
              <View style={styles.sliderRow}>
                <SliderRow
                  value={targetDoughWeight}
                  onValueChange={setTargetDoughWeight}
                  onValueClick={userInterface.onTargetDoughValueClick}
                  valueAffix={userInterface.languageConstants!._gram_abbvr}
                  incrementAmount={100}
                  minValue={2000}
                  maxValue={100000}
                  isKeyboardActive={userInterface.targetDoughWeightInputMode}
                  label={userInterface.languageConstants!._target_dough_weight}
                />
              </View>}

            {/* Info Block */}
            <InfoBlock dough={dough} />

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
  presetRow: {
    height: 40,
    marginBottom: 8
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
