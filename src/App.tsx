import 'es6-symbol/implement';
import { StyleSheet, View, Text, ScrollView, ImageBackground } from 'react-native';
import { ErrorBoundary } from './ErrorBoundary';
import { observer } from 'mobx-react';
import React from 'react';
import Controller from './Controller';
import { SliderRow } from './Components/SliderRow';
import { PresetButtonsRow } from './Components/PresetButtonsRow';
// tslint:disable-next-line: no-var-requires
const backgroundImage = require('./bread.jpg');

// tslint:disable: max-line-length

@observer
export default class App extends React.Component {

  constructor(props: any) {
    super(props);
  }

  public render() {

    return (
      <ErrorBoundary>
        <ImageBackground source={backgroundImage} style={{ width: '100%', height: '100%', opacity: 0.7 }}>

          <ScrollView style={styles.flex} contentContainerStyle={styles.content}>

            <Text style={styles.title}>{Controller.languageConstants!._appTitle}</Text>

            <View style={styles.separator} />

            <SliderRow
              minValue={Controller.minFlour}
              maxValue={Controller.maxFlour}
              value={Controller.flourWeight}
              onValueChange={Controller.setFlourWeight}
              description={Controller.languageConstants!._flour_weight}
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
              description={Controller.languageConstants!._leaven_weight}
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
              description={Controller.languageConstants!._leaven_hydration}
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
              description={Controller.languageConstants!._water}
              valueAffix={Controller.languageConstants!._gram_abbvr}
            />

            <View style={styles.separator} />

            <SliderRow
              minValue={Controller.minDesiredHydration}
              maxValue={Controller.maxDesiredHydration}
              value={Controller.desiredTargetHydration}
              onValueChange={Controller.setDesiredHydrationAndUpdateRequiredWaterWeight}
              description={Controller.languageConstants!._target_hydration}
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
      </ErrorBoundary >
    );
  }
}

const styles = StyleSheet.create({
  title: { paddingVertical: 8, fontWeight: 'bold', fontSize: 24, textAlign: 'center' },
  flex: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  content: {
    justifyContent: 'center',
    alignItems: 'stretch',
    marginHorizontal: 16,
    marginTop: 32,
  },
  infoStyle: {
    fontSize: 20,
    textAlign: 'left',
    fontWeight: 'bold'
  },
  infoBlock: {
    marginVertical: 16,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    alignSelf: 'center'
  },
  separator: {
    height: 16
  }
});
