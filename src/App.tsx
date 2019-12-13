import 'es6-symbol/implement';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { ErrorBoundary } from './ErrorBoundary';
import { observer } from 'mobx-react';
import React from 'react';
import Controller from './Controller';
import { SliderRow } from './Components/SliderRow';
import { PresetButtonsRow } from './Components/PresetButtonsRow';
// tslint:disable-next-line: no-var-requires

// tslint:disable: max-line-length

@observer
export default class App extends React.Component {

  constructor(props: any) {
    super(props);
  }

  public render() {

    return (
      <ErrorBoundary>
        <ScrollView contentContainerStyle={{ flex: 1, flexDirection: 'column', justifyContent: 'space-around', alignItems: 'stretch', marginHorizontal: 16, marginTop: 32 }}>

          {/* Flour Weight */}

          <SliderRow
            value={Controller.flourWeight}
            onValueChange={Controller.setFlourWeight}
            onValueClick={Controller.onFlourValueClick}
            onSymbolClick={() => {/* */ }}
            valueAffix={'g'}
            incrementAmount={50}
            minValue={Controller.minFlour}
            maxValue={Controller.maxFlour}
            isKeyboardActive={Controller.flourInputMode}
            label={'Flour'}
          />
          <PresetButtonsRow
            presetValues={Controller.flourWeightPresets}
            onClickCallback={Controller.setFlourWeight}
            valueSuffix={Controller.languageConstants!._gram_abbvr}
            selectedValue={Controller.flourWeight}
          />

          {/* Leaven Weight */}
          <SliderRow
            value={Controller.leavenWeight}
            onValueChange={Controller.setLeavenWeight}
            onValueClick={Controller.onLeavenWeightValueClick}
            onSymbolClick={() => {/* */ }}
            valueAffix={'g'}
            incrementAmount={50}
            minValue={Controller.minLeaven}
            maxValue={Controller.maxLeaven}
            isKeyboardActive={Controller.leavenWeightInputMode}
            label={'Leaven Weight'}
          />
          <PresetButtonsRow
            presetValues={Controller.leavenInoculationPresets}
            onClickCallback={Controller.setLeavenWeightUsingInoculation}
            valueSuffix={Controller.languageConstants!._percent}
            selectedValue={Controller.inoculation}
          />

          {/* Leaven Hydration  */}
          <SliderRow
            value={Controller.leavenHydration}
            onValueChange={Controller.setLeavenHydration}
            onValueClick={Controller.onLeavenHydrationValueClick}
            onSymbolClick={() => {/* */ }}
            valueAffix={'%'}
            incrementAmount={50}
            minValue={Controller.minLeavenHydration}
            maxValue={Controller.maxLeavenHydration}
            isKeyboardActive={Controller.leavenHydrationInputMode}
            label={'Leaven Hydration'}
          />
          <PresetButtonsRow
            presetValues={Controller.leavenHydrationPresets}
            onClickCallback={Controller.setLeavenHydration}
            valueSuffix={Controller.languageConstants!._percent}
            selectedValue={Controller.leavenHydration}
          />

          {/* Water Weight */}
          <SliderRow
            value={Controller.waterWeight}
            onValueChange={Controller.setWaterWeightAndUpdateDesiredHydration}
            onValueClick={Controller.onWaterValueClick}
            onSymbolClick={() => {/* */ }}
            valueAffix={'g'}
            incrementAmount={50}
            minValue={Controller.minWater}
            maxValue={Controller.maxWater}
            isKeyboardActive={Controller.waterInputMode}
            label={'Water'}
          />

          {/* Target Hydration */}
          <SliderRow
            isLocked={Controller.desiredHydrationLocked}
            onLockValue={Controller.toggleDesiredHydationLock}
            value={Controller.desiredTargetHydration}
            onValueChange={Controller.setDesiredHydrationAndUpdateRequiredWaterWeight}
            onValueClick={Controller.onDesiredTargetHydrationValueClick}
            onSymbolClick={() => {/* */ }}
            valueAffix={'%'}
            incrementAmount={50}
            minValue={Controller.minDesiredHydration}
            maxValue={Controller.maxDesiredHydration}
            isKeyboardActive={Controller.desiredTargetHydrationInputMode}
            label={'Target Hydration'}
          />

          <PresetButtonsRow
            presetValues={Controller.desiredHydrationPresets}
            onClickCallback={Controller.setDesiredHydrationAndUpdateRequiredWaterWeight}
            valueSuffix={Controller.languageConstants!._percent}
            selectedValue={Controller.desiredTargetHydration}
          />

          <View style={styles.infoBlock}>

            <View style={styles.infoRow}>
              <Text style={styles.infoStyle}>Current Hydration:</Text>
              <Text style={styles.infoStyle}>{(Controller.totalHydration * 100).toFixed(2)}%</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoStyle}>Current Inoculation:</Text>
              <Text style={styles.infoStyle}>{(Controller.inoculation).toFixed(2)}%</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoStyle}>Total Flour:</Text>
              <Text style={styles.infoStyle}>{Controller.totalFlour.toFixed(2)}g</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoStyle}>Total Water: </Text>
              <Text style={styles.infoStyle}>{Controller.totalWater.toFixed(2)}g</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoStyle}>Leaven  </Text>
              <Text style={styles.infoStyle}>{Controller.leavenWeight.toFixed(2)}g</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoStyle}>Recommended Salt: </Text>
              <Text style={styles.infoStyle}>{Controller.recommendedSalt.toFixed(2)}g</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoStyle}>Post Bake Weight: </Text>
              <Text style={styles.infoStyle}>{Controller.postBakeWeight.toFixed(2)}g</Text>
            </View>

          </View>
        </ScrollView>
      </ErrorBoundary >
    );
  }
}

const styles = StyleSheet.create({
  infoBlock: {
    alignItems: 'flex-start',
    alignSelf: 'center',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginVertical: 16
  },
  infoRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  infoStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'left'
  },

});

/*

<ImageBackground source={backgroundImage} style={styles.backgroundImage}>

          <ScrollView style={styles.flex} contentContainerStyle={styles.content} bounces={false}>

            <Text style={styles.title}>{Controller.languageConstants!._appTitle}</Text>
            }
            <View style={styles.separator} />

            <SliderRow
              minValue={Controller.minFlour}
              maxValue={Controller.maxFlour}
              value={Controller.flourWeight}
              onValueChange={Controller.setFlourWeight}
              label={Controller.languageConstants!._flour_weight}
              valueAffix={Controller.languageConstants!._gram_abbvr}
            />
            <PresetButtonsRow
              presetValues={Controller.flourWeightPresets}
              onClickCallback={Controller.setFlourWeight}
              valueSuffix={Controller.languageConstants!._gram_abbvr}
              selectedValue={Controller.flourWeight}
            />

            <View style={styles.separator} />

            <SliderRow
              minValue={Controller.minLeaven}
              maxValue={Controller.maxLeaven}
              value={Controller.leavenWeight}
              onValueChange={Controller.setLeavenWeight}
              label={Controller.languageConstants!._leaven_weight}
              valueAffix={Controller.languageConstants!._gram_abbvr}
            />
            <PresetButtonsRow
              presetValues={Controller.leavenInoculationPresets}
              onClickCallback={Controller.setLeavenWeightUsingInoculation}
              valueSuffix={Controller.languageConstants!._percent}
              selectedValue={Controller.inoculation}
            />

            <View style={styles.separator} />

            <SliderRow
              minValue={Controller.minLeavenHydration}
              maxValue={Controller.maxLeavenHydration}
              value={Controller.leavenHydration}
              onValueChange={Controller.setLeavenHydration}
              label={Controller.languageConstants!._leaven_hydration}
              valueAffix={Controller.languageConstants!._percent}
            />
            <PresetButtonsRow
              presetValues={Controller.leavenHydrationPresets}
              onClickCallback={Controller.setLeavenHydration}
              valueSuffix={Controller.languageConstants!._percent}
              selectedValue={Controller.leavenHydration}
            />

            <View style={styles.separator} />

            <SliderRow
              minValue={Controller.minWater}
              maxValue={Controller.maxWater}
              value={Controller.waterWeight}
              onValueChange={Controller.setWaterWeightAndUpdateDesiredHydration}
              label={Controller.languageConstants!._water}
              valueAffix={Controller.languageConstants!._gram_abbvr}
            />

            <View style={styles.separator} />

            <SliderRow
              onLockValue={Controller.toggleDesiredHydationLock}
              isLocked={Controller.desiredHydrationLocked}
              minValue={Controller.minDesiredHydration}
              maxValue={Controller.maxDesiredHydration}
              value={Controller.desiredTargetHydration}
              onValueChange={Controller.setDesiredHydrationAndUpdateRequiredWaterWeight}
              label={Controller.languageConstants!._target_hydration}
              valueAffix={Controller.languageConstants!._percent}
            />

            <View style={styles.separator} />

            <PresetButtonsRow
              presetValues={Controller.desiredHydrationPresets}
              onClickCallback={Controller.setDesiredHydrationAndUpdateRequiredWaterWeight}
              valueSuffix={Controller.languageConstants!._percent}
              selectedValue={Controller.desiredTargetHydration}
            />

            <View style={styles.infoBlock}>

              <View style={styles.infoRow}>
                <Text style={styles.infoStyle}>Current Hydration:</Text>
                <Text style={styles.infoStyle}>{(Controller.totalHydration * 100).toFixed(2)}%</Text>
              </View>

              <View style={styles.infoRow}>
                <Text style={styles.infoStyle}>Current Inoculation:</Text>
                <Text style={styles.infoStyle}>{(Controller.inoculation).toFixed(2)}%</Text>
              </View>

              <View style={styles.infoRow}>
                <Text style={styles.infoStyle}>Total Flour:</Text>
                <Text style={styles.infoStyle}>{Controller.totalFlour.toFixed(2)}g</Text>
              </View>

              <View style={styles.infoRow}>
                <Text style={styles.infoStyle}>Total Water: </Text>
                <Text style={styles.infoStyle}>{Controller.totalWater.toFixed(2)}g</Text>
              </View>

              <View style={styles.infoRow}>
                <Text style={styles.infoStyle}>Leaven  </Text>
                <Text style={styles.infoStyle}>{Controller.leavenWeight.toFixed(2)}g</Text>
              </View>

              <View style={styles.infoRow}>
                <Text style={styles.infoStyle}>Recommended Salt: </Text>
                <Text style={styles.infoStyle}>{Controller.recommendedSalt.toFixed(2)}g</Text>
              </View>

              <View style={styles.infoRow}>
                <Text style={styles.infoStyle}>Post Bake Weight: </Text>
                <Text style={styles.infoStyle}>{Controller.postBakeWeight.toFixed(2)}g</Text>
              </View>

            </View>

          </ScrollView>
        </ImageBackground>
*/
