import 'es6-symbol/implement';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { ErrorBoundary } from './ErrorBoundary';
import { runInAction } from 'mobx';
import { observer } from 'mobx-react';
import React from 'react';
import Controller from './Controller';
import { SliderRow } from './Components/SliderRow';
import { PresetButtonsRow } from './Components/PresetButtonsRow';

// tslint:disable: max-line-length

@observer
export default class App extends React.Component {

  constructor(props: any) {
    super(props);
  }

  public render() {

    return (
      <ErrorBoundary>

        <ScrollView style={styles.flex} contentContainerStyle={styles.content}>

          <Text style={styles.title}>@sourdoughpie hydration app</Text>

          <View style={styles.separator} />

          <SliderRow
            minValue={0}
            maxValue={5000}
            value={Controller.flourWeight}
            onValueChange={(newVal: number) => runInAction(() => Controller.flourWeight = newVal)}
            description={'flour weight'}
            valueAffix={'g'}
          />
          <PresetButtonsRow
            presetValues={Controller.flourWeightPresets}
            onClickCallback={(item: number) => runInAction(() => { Controller.flourWeight = item; })}
            valueSuffix={'g'}
            selectedValue={Controller.flourWeight}
          />

          <View style={styles.separator} />

          <SliderRow
            minValue={0}
            maxValue={2000}
            value={Controller.leavenWeight}
            onValueChange={(newVal: number) => runInAction(() => Controller.leavenWeight = newVal)}
            description={'leaven weight'}
            valueAffix={'g'}
          />
          <PresetButtonsRow
            presetValues={Controller.leavenInoculationPresets}
            onClickCallback={(item: number) => runInAction(() => { Controller.leavenWeight = (item / 100) * Controller.flourWeight; })}
            valueSuffix={'%'}
            selectedValue={(Controller.leavenWeight / Controller.flourWeight) * 100}
          />

          <View style={styles.separator} />

          <SliderRow
            minValue={0}
            maxValue={200}
            value={Controller.leavenHydration}
            onValueChange={(newVal: number) => runInAction(() => Controller.leavenHydration = newVal)}
            description={'leaven hydration'}
            valueAffix={'%'}
          />
          <PresetButtonsRow
            presetValues={Controller.leavenHydrationPresets}
            onClickCallback={(item: number) => runInAction(() => { Controller.leavenHydration = item; })}
            valueSuffix={'%'}
            selectedValue={Controller.leavenHydration}
          />

          <View style={styles.separator} />

          <SliderRow
            minValue={0}
            maxValue={5000}
            value={Controller.waterWeight}
            onValueChange={(newVal: number) => runInAction(() => {
              Controller.waterWeight = newVal;
              Controller.desiredTargetHydration = Controller.totalHydration * 100;
            })}
            description={'water'}
            valueAffix={'g'}
          />

          <View style={styles.separator} />

          <SliderRow
            minValue={0}
            maxValue={150}
            value={Controller.desiredTargetHydration}
            onValueChange={(newVal: number) => runInAction(() => {
              Controller.desiredTargetHydration = newVal;
              Controller.waterWeight = Controller.waterWeightToMatchDesiredTargetHydration;
            })}
            description={'target hydration'}
            valueAffix={'%'}
          />

          <View style={styles.separator} />

          <PresetButtonsRow
            presetValues={Controller.desiredHydrationPresets}
            onClickCallback={(item: number) => runInAction(() => { Controller.desiredTargetHydration = item; Controller.waterWeight = Controller.waterWeightToMatchDesiredTargetHydration; })}
            valueSuffix={'%'}
            selectedValue={Controller.desiredTargetHydration}
          />

          <View style={styles.infoBlock}>
            <Text style={styles.infoStyle}>Total Flour: {Controller.totalFlour.toFixed(2)}g</Text>
            <Text style={styles.infoStyle}>Total Water: {Controller.totalWater.toFixed(2)}g</Text>
            <Text style={styles.infoStyle}>Leaven Water: {Controller.leavenWater.toFixed(2)}g</Text>
            <Text style={styles.infoStyle}>Leaven Flour: {Controller.leavenFlour.toFixed(2)}g</Text>

            <Text style={styles.infoStyle}>Recommended Salt: {Controller.recommendedSalt.toFixed(2)}g</Text>
            <Text style={styles.infoStyle}>Post Bake Weight: {Controller.postBakeWeight.toFixed(2)}g</Text>
          </View>

          {/* {Controller.waterWeightToMatchDesiredTargetHydration != null && Controller.waterWeightToMatchDesiredTargetHydration > 0 &&
            <HydrationInfoParagraph
              waterWeightToMatchDesiredTargetHydration={Controller.waterWeightToMatchDesiredTargetHydration}
              flourWeight={Controller.flourWeight}
              leavenWeight={Controller.leavenWeight}
              leavenHydration={Controller.leavenHydration}
              desiredTargetHydration={Controller.desiredTargetHydration}
            />
          } */}
        </ScrollView>

      </ErrorBoundary >
    );
  }
}

const styles = StyleSheet.create({
  title: { paddingVertical: 8, fontWeight: 'bold', fontSize: 24, textAlign: 'center' },
  flex: {
    flex: 1,
  },
  content: {
    justifyContent: 'center',
    alignItems: 'stretch',
    marginHorizontal: 16,
    marginTop: 32,
    flex: 1
  },
  infoStyle: {
    fontSize: 16,
    textAlign: 'left',
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
