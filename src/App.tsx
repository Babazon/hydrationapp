import 'es6-symbol/implement';
import { View, StyleSheet, SafeAreaView, RefreshControl } from 'react-native';
import { ErrorBoundary } from './ErrorBoundary';
import { observer } from 'mobx-react';
import React from 'react';
import { SliderRow } from './Components/SliderRow';
import { PresetButtonsRow } from './Components/PresetButtonsRow';
import dough from './store/Dough';
import { InfoBlock } from './Components/InfoBlock';
import { TextWithAccessibility } from './Components/TextWithAccessibility';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

// tslint:disable: max-line-length

@observer
export default class App extends React.Component {

  constructor(props: any) {
    super(props);
  }

  public render() {

    return (
      <ErrorBoundary>
        <SafeAreaView style={styles.safeAreaView}>

          <KeyboardAwareScrollView
            showsVerticalScrollIndicator={false}
            refreshControl={<RefreshControl title="Reset" refreshing={false} onRefresh={dough.resetValues} />}
            contentContainerStyle={styles.scrollViewContentStyle}>

            {/* Flour Weight */}
            <View style={styles.sliderRow}>
              <SliderRow
                value={dough.flour.flourWeight}
                onValueChange={dough.flour.setFlourWeight}
                onValueClick={dough.userInterface.onFlourValueClick}
                onSymbolClick={() => {/* */ }}
                valueAffix={'g'}
                incrementAmount={dough.userInterface.appPresets.flourIncrementAmount}
                minValue={dough.flour.minFlour}
                maxValue={dough.flour.maxFlour}
                isKeyboardActive={dough.userInterface.flourInputMode}
                label={dough.userInterface.languageConstants!._flour_weight}
              />
            </View>
            <View style={styles.presetRow}>
              <PresetButtonsRow
                presetValues={dough.userInterface.flourWeightPresets}
                onClickCallback={dough.flour.setFlourWeight}
                valueSuffix={dough.userInterface.languageConstants!._gram_abbvr}
                selectedValue={dough.flour.flourWeight}
              />
            </View>

            {/* Leaven Weight */}
            <View style={styles.sliderRow}>
              <SliderRow
                value={dough.leaven.leavenWeight}
                onValueChange={dough.leaven.setLeavenWeight}
                onValueClick={dough.userInterface.onLeavenWeightValueClick}
                onSymbolClick={() => {/* */ }}
                valueAffix={'g'}
                incrementAmount={dough.userInterface.appPresets.leavenWeightIncrementAmount}
                minValue={dough.leaven.minLeaven}
                maxValue={dough.leaven.maxLeaven}
                isKeyboardActive={dough.userInterface.leavenWeightInputMode}
                label={dough.userInterface.languageConstants!._leaven_weight}
              />
            </View>
            <View style={styles.presetRow}>
              <PresetButtonsRow
                presetValues={dough.userInterface.leavenInoculationPresets}
                onClickCallback={dough.leaven.setLeavenWeightUsingInoculation}
                valueSuffix={dough.userInterface.languageConstants!._percent}
                selectedValue={dough.leaven.inoculation}
              />
            </View>

            {/* Leaven Hydration  */}
            <View style={styles.sliderRow}>
              <SliderRow
                value={dough.leaven.leavenHydration}
                onValueChange={dough.leaven.setLeavenHydration}
                onValueClick={dough.userInterface.onLeavenHydrationValueClick}
                valueAffix={'%'}
                incrementAmount={dough.userInterface.appPresets.leavenHydrationIncrementAmount}
                minValue={dough.leaven.minLeavenHydration}
                maxValue={dough.leaven.maxLeavenHydration}
                isKeyboardActive={dough.userInterface.leavenHydrationInputMode}
                label={dough.userInterface.languageConstants!._leaven_hydration}
              />
            </View>
            <View style={styles.presetRow}>
              <PresetButtonsRow
                presetValues={dough.userInterface.leavenHydrationPresets}
                onClickCallback={dough.leaven.setLeavenHydration}
                valueSuffix={dough.userInterface.languageConstants!._percent}
                selectedValue={dough.leaven.leavenHydration}
              />
            </View>

            {/* Water Weight */}
            <View style={styles.sliderRow}>
              <SliderRow
                value={dough.water.waterWeight}
                onValueChange={dough.water.setWaterWeightAndUpdateDesiredHydration}
                onValueClick={dough.userInterface.onWaterValueClick}
                onSymbolClick={() => {/* */ }}
                valueAffix={'g'}
                incrementAmount={dough.userInterface.appPresets.waterIncrementAmount}
                minValue={dough.water.minWater}
                maxValue={dough.water.maxWater}
                isKeyboardActive={dough.userInterface.waterInputMode}
                label={dough.userInterface.languageConstants!._water}
              />
            </View>

            {/* Target Hydration */}
            <View style={styles.sliderRow}>
              <SliderRow
                isLocked={dough.hydration.desiredHydrationLocked}
                onLockValue={dough.hydration.toggleDesiredHydationLock}
                value={dough.hydration.desiredTargetHydration}
                onValueChange={dough.hydration.setDesiredHydrationAndUpdateRequiredWaterWeight}
                onValueClick={dough.userInterface.onDesiredTargetHydrationValueClick}
                valueAffix={'%'}
                incrementAmount={dough.userInterface.appPresets.desiredTargetHydrationIncrementAmount}
                minValue={dough.hydration.minDesiredHydration}
                maxValue={dough.hydration.maxDesiredHydration}
                isKeyboardActive={dough.userInterface.desiredTargetHydrationInputMode}
                label={dough.userInterface.languageConstants!._target_hydration}
              />
            </View>

            <View style={styles.presetRow}>
              <PresetButtonsRow
                presetValues={dough.userInterface.desiredHydrationPresets}
                onClickCallback={dough.hydration.setDesiredHydrationAndUpdateRequiredWaterWeight}
                valueSuffix={dough.userInterface.languageConstants!._percent}
                selectedValue={dough.hydration.desiredTargetHydration}
              />
            </View>

            {/* Info Block */}
            <InfoBlock dough={dough} />

            <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'stretch' }}>
              <TextWithAccessibility style={{ fontSize: 8, textAlign: 'center' }}>
                Code: @sourdoughpie
            </TextWithAccessibility>
              <TextWithAccessibility style={{ fontSize: 8, textAlign: 'center' }}>
                Design: @chexee
            </TextWithAccessibility>
              <TextWithAccessibility style={{ fontSize: 8, textAlign: 'center' }}>
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
    marginBottom: 8
  }
});
