import 'es6-symbol/implement';
import { View, StyleSheet, ScrollView, SafeAreaView, RefreshControl } from 'react-native';
import { ErrorBoundary } from './ErrorBoundary';
import { observer } from 'mobx-react';
import React from 'react';
import { SliderRow } from './Components/SliderRow';
import { PresetButtonsRow } from './Components/PresetButtonsRow';
import { TextWithAccessibility } from './Components/TextWithAccessibility';
import dough from './store/Dough';

// tslint:disable: max-line-length

@observer
export default class App extends React.Component {

  constructor(props: any) {
    super(props);
  }

  public render() {

    return (
      <ErrorBoundary>
        <SafeAreaView style={{ flex: 1, marginTop: 16 }}>

          <ScrollView
            showsVerticalScrollIndicator={false}
            refreshControl={<RefreshControl title="Reset" refreshing={false} onRefresh={dough.resetValues} />}
            contentContainerStyle={{ flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'stretch', marginHorizontal: 8, paddingVertical: 16 }}>

            {/* Flour Weight */}

            <View style={{
              height: 80,
              marginBottom: 8
            }}>
              <SliderRow
                value={dough.flour.flourWeight}
                onValueChange={dough.flour.setFlourWeight}
                onValueClick={dough.userInterface.onFlourValueClick}
                onSymbolClick={() => {/* */ }}
                valueAffix={'g'}
                incrementAmount={50}
                minValue={dough.flour.minFlour}
                maxValue={dough.flour.maxFlour}
                isKeyboardActive={dough.userInterface.flourInputMode}
                label={'Flour'}
              />
            </View>
            <View style={{
              height: 40,
              marginBottom: 8
            }}>
              <PresetButtonsRow
                presetValues={dough.userInterface.flourWeightPresets}
                onClickCallback={dough.flour.setFlourWeight}
                valueSuffix={dough.userInterface.languageConstants!._gram_abbvr}
                selectedValue={dough.flour.flourWeight}
              />
            </View>

            {/* Leaven Weight */}
            <View style={{
              height: 80,
              marginBottom: 8
            }}>
              <SliderRow
                value={dough.leaven.leavenWeight}
                onValueChange={dough.leaven.setLeavenWeight}
                onValueClick={dough.userInterface.onLeavenWeightValueClick}
                onSymbolClick={() => {/* */ }}
                valueAffix={'g'}
                incrementAmount={50}
                minValue={dough.leaven.minLeaven}
                maxValue={dough.leaven.maxLeaven}
                isKeyboardActive={dough.userInterface.leavenWeightInputMode}
                label={'Leaven Weight'}
              />
            </View>
            <View style={{
              height: 40,
              marginBottom: 8
            }}>
              <PresetButtonsRow
                presetValues={dough.userInterface.leavenInoculationPresets}
                onClickCallback={dough.leaven.setLeavenWeightUsingInoculation}
                valueSuffix={dough.userInterface.languageConstants!._percent}
                selectedValue={dough.leaven.inoculation}
              />
            </View>

            {/* Leaven Hydration  */}
            <View style={{
              height: 80,
              marginBottom: 8
            }}>
              <SliderRow
                value={dough.leaven.leavenHydration}
                onValueChange={dough.leaven.setLeavenHydration}
                onValueClick={dough.userInterface.onLeavenHydrationValueClick}
                valueAffix={'%'}
                incrementAmount={50}
                minValue={dough.leaven.minLeavenHydration}
                maxValue={dough.leaven.maxLeavenHydration}
                isKeyboardActive={dough.userInterface.leavenHydrationInputMode}
                label={'Leaven Hydration'}
              />
            </View>
            <View style={{
              height: 40,
              marginBottom: 8
            }}>
              <PresetButtonsRow
                presetValues={dough.userInterface.leavenHydrationPresets}
                onClickCallback={dough.leaven.setLeavenHydration}
                valueSuffix={dough.userInterface.languageConstants!._percent}
                selectedValue={dough.leaven.leavenHydration}
              />
            </View>

            {/* Water Weight */}
            <View style={{
              height: 80,
              marginBottom: 8
            }}>
              <SliderRow
                value={dough.water.waterWeight}
                onValueChange={dough.water.setWaterWeightAndUpdateDesiredHydration}
                onValueClick={dough.userInterface.onWaterValueClick}
                onSymbolClick={() => {/* */ }}
                valueAffix={'g'}
                incrementAmount={50}
                minValue={dough.water.minWater}
                maxValue={dough.water.maxWater}
                isKeyboardActive={dough.userInterface.waterInputMode}
                label={'Water'}
              />
            </View>

            <View style={{
              height: 80,
              marginBottom: 8
            }}>
              {/* Target Hydration */}
              <SliderRow
                isLocked={dough.hydration.desiredHydrationLocked}
                onLockValue={dough.hydration.toggleDesiredHydationLock}
                value={dough.hydration.desiredTargetHydration}
                onValueChange={dough.hydration.setDesiredHydrationAndUpdateRequiredWaterWeight}
                onValueClick={dough.userInterface.onDesiredTargetHydrationValueClick}
                valueAffix={'%'}
                incrementAmount={50}
                minValue={dough.hydration.minDesiredHydration}
                maxValue={dough.hydration.maxDesiredHydration}
                isKeyboardActive={dough.userInterface.desiredTargetHydrationInputMode}
                label={'Target Hydration'}
              />
            </View>

            <View style={{
              height: 40,
              marginBottom: 8
            }}>
              <PresetButtonsRow
                presetValues={dough.userInterface.desiredHydrationPresets}
                onClickCallback={dough.hydration.setDesiredHydrationAndUpdateRequiredWaterWeight}
                valueSuffix={dough.userInterface.languageConstants!._percent}
                selectedValue={dough.hydration.desiredTargetHydration}
              />
            </View>

            <View style={styles.infoBlock}>

              <View style={styles.infoRow}>
                <TextWithAccessibility style={styles.infoStyle}>Total Flour</TextWithAccessibility>

                <View style={{ marginHorizontal: 4, flex: 1, borderRadius: 1, marginBottom: 3, borderWidth: 1, borderColor: 'gray', borderStyle: 'dotted', zIndex: 0, }} />

                <TextWithAccessibility style={styles.infoStyle}>{dough.totalFlour.toFixed(dough.totalFlour % 1 > 0 ? 2 : 0)} g</TextWithAccessibility>
              </View>

              <View style={styles.infoRow}>
                <TextWithAccessibility style={styles.infoStyle}>Total Water</TextWithAccessibility>

                <View style={{ marginHorizontal: 4, flex: 1, borderRadius: 1, marginBottom: 3, borderWidth: 1, borderColor: 'gray', borderStyle: 'dotted', zIndex: 0, }} />

                <TextWithAccessibility style={styles.infoStyle}>{dough.totalWater.toFixed(dough.totalWater % 1 > 0 ? 2 : 0)} g</TextWithAccessibility>
              </View>

              <View style={styles.infoRow}>
                <TextWithAccessibility style={styles.infoStyle}>Leaven</TextWithAccessibility>

                <View style={{ marginHorizontal: 4, flex: 1, borderRadius: 1, marginBottom: 3, borderWidth: 1, borderColor: 'gray', borderStyle: 'dotted', zIndex: 0, }} />

                <TextWithAccessibility style={styles.infoStyle}>{dough.leaven.leavenWeight.toFixed(dough.leaven.leavenWeight % 1 > 0 ? 2 : 0)} g</TextWithAccessibility>
              </View>

              <View style={styles.infoRow}>
                <TextWithAccessibility style={styles.infoStyle}>Inoculation</TextWithAccessibility>

                <View style={{ marginHorizontal: 4, flex: 1, borderRadius: 1, marginBottom: 3, borderWidth: 1, borderColor: 'gray', borderStyle: 'dotted', zIndex: 0, }} />

                <TextWithAccessibility style={styles.infoStyle}>{(dough.leaven.inoculation).toFixed(dough.leaven.inoculation % 1 > 0 ? 2 : 0)} %</TextWithAccessibility>
              </View>

              <View style={styles.infoRow}>
                <TextWithAccessibility style={styles.infoStyle}>Recommended Salt</TextWithAccessibility>

                <View style={{ marginHorizontal: 4, flex: 1, borderRadius: 1, marginBottom: 3, borderWidth: 1, borderColor: 'gray', borderStyle: 'dotted', zIndex: 0, }} />

                <TextWithAccessibility style={styles.infoStyle}>{dough.recommendedSalt.toFixed(dough.recommendedSalt % 1 > 0 ? 2 : 0)} g</TextWithAccessibility>
              </View>

              <View style={styles.infoRow}>
                <TextWithAccessibility style={styles.infoStyle}>Total Weight</TextWithAccessibility>

                <View style={{ marginHorizontal: 4, flex: 1, borderRadius: 1, marginBottom: 3, borderWidth: 1, borderColor: 'gray', borderStyle: 'dotted', zIndex: 0, }} />

                <TextWithAccessibility style={styles.infoStyle}>{(dough.totalFlour + dough.totalWater).toFixed((dough.totalFlour + dough.totalWater) % 1 > 0 ? 2 : 0)} g</TextWithAccessibility>
              </View>

              <View style={styles.infoRow}>
                <TextWithAccessibility style={styles.infoStyle}>Post Bake Weight</TextWithAccessibility>

                <View style={{ marginHorizontal: 4, flex: 1, borderRadius: 1, marginBottom: 3, borderWidth: 1, borderColor: 'gray', borderStyle: 'dotted', zIndex: 0, }} />

                <TextWithAccessibility style={styles.infoStyle}>{dough.postBakeWeight.toFixed(dough.postBakeWeight % 1 > 0 ? 2 : 0)} g</TextWithAccessibility>
              </View>

              <View style={styles.infoRow}>
                <TextWithAccessibility style={styles.infoStyle}>Hydration</TextWithAccessibility>

                <View style={{ marginHorizontal: 4, flex: 1, borderRadius: 1, marginBottom: 3, borderWidth: 1, borderColor: 'gray', borderStyle: 'dotted', zIndex: 0, }} />

                <TextWithAccessibility style={styles.infoStyle}>{(dough.totalHydration * 100).toFixed((dough.totalHydration * 100) % 1 > 0 ? 2 : 0)} %</TextWithAccessibility>
              </View>

            </View>
          </ScrollView>
        </SafeAreaView>
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
    marginVertical: 16,
    marginHorizontal: 4
  },
  infoRow: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  infoStyle: {
    fontSize: 14,
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
