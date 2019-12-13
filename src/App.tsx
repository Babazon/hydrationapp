import 'es6-symbol/implement';
import { View, } from 'react-native';
import { ErrorBoundary } from './ErrorBoundary';
import { observer } from 'mobx-react';
import React from 'react';
import Controller from './Controller';
import { NumberBox } from './Components/NumberBox';
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
        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <NumberBox
            value={Controller.flourWeight}
            onValueChange={Controller.setFlourWeight}
            onValueClick={Controller.onFlourValueClick}
            symbol={'g'}
            onSymbolClick={() => { /* */ }}
            inputMode={Controller.flourInputMode}
          />
        </View>
      </ErrorBoundary >
    );
  }
}

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
              onLockValue={Controller.toggleDesiredHydationLock}
              isLocked={Controller.desiredHydrationLocked}
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
