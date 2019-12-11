import 'es6-symbol/implement';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { ErrorBoundary } from './ErrorBoundary';
import { runInAction } from 'mobx';
import { observer } from 'mobx-react';
import React from 'react';
import Controller from './Controller';
import { SliderRow } from './Components/SliderRow';
import { HydrationInfoParagraph } from './Components/HydrationInfoParagraph';
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

        <View style={styles.flex}>

          <Text style={{ paddingVertical: 8, fontWeight: 'bold', fontSize: 24, textAlign: 'center' }}>@sourdoughpie hydration app</Text>

          <View style={{ height: 16 }} />

          <SliderRow
            minValue={0}
            maxValue={5000}
            value={Controller.flourWeight}
            onValueChange={(newVal: number) => runInAction(() => Controller.flourWeight = newVal)}
            description={'flour weight'}
            valueAffix={'g'}
          />
          <PresetButtonsRow
            presetValues={[1000, 1500, 2000, 3000, 5000, 10000, 20000]}
            onClickCallback={(item: number) => runInAction(() => { Controller.flourWeight = item; })}
            valueSuffix={'g'}
            selectedValue={Controller.flourWeight}
          />

          <View style={{ height: 16 }} />

          <SliderRow
            minValue={0}
            maxValue={2000}
            value={Controller.leavenWeight}
            onValueChange={(newVal: number) => runInAction(() => Controller.leavenWeight = newVal)}
            description={'leaven weight'}
            valueAffix={'g'}
          />
          <PresetButtonsRow
            presetValues={[15, 20, 25, 30, 35, 50, 75]}
            onClickCallback={(item: number) => runInAction(() => { Controller.leavenWeight = (item / 100) * Controller.flourWeight; })}
            valueSuffix={'%'}
            selectedValue={(Controller.leavenWeight / Controller.flourWeight) * 100}
          />

          <View style={{ height: 16 }} />

          <SliderRow
            minValue={0}
            maxValue={200}
            value={Controller.leavenHydration}
            onValueChange={(newVal: number) => runInAction(() => Controller.leavenHydration = newVal)}
            description={'leaven hydration'}
            valueAffix={'%'}
          />
          <PresetButtonsRow
            presetValues={[50, 75, 100, 125, 150, 175, 200]}
            onClickCallback={(item: number) => runInAction(() => { Controller.leavenHydration = item; })}
            valueSuffix={'%'}
            selectedValue={Controller.leavenHydration}
          />

          <View style={{ height: 16 }} />

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

          <View style={{ height: 16 }} />

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

          <View style={{ height: 16 }} />

          <PresetButtonsRow
            presetValues={[60, 65, 70, 75, 80, 85, 90, 95, 100]}
            onClickCallback={(item: number) => runInAction(() => { Controller.desiredTargetHydration = item; Controller.waterWeight = Controller.waterWeightToMatchDesiredTargetHydration; })}
            valueSuffix={'%'}
            selectedValue={Controller.desiredTargetHydration}
          />

          <Text>Total Flour: {Controller.totalFlour.toFixed(2)}</Text>
          <Text>Total Water: {Controller.totalWater.toFixed(2)}</Text>
          <Text> Leaven Water: {Controller.leavenWater.toFixed(2)}</Text>
          <Text> Leaven Flour: {Controller.leavenFlour.toFixed(2)}</Text>

          <Text>Recommended Salt: {Controller.recommendedSalt.toFixed(2)}</Text>
          <Text>Approximate Post Bake Weight: {Controller.postBakeWeight.toFixed(2)}</Text>

          {Controller.waterWeightToMatchDesiredTargetHydration != null && Controller.waterWeightToMatchDesiredTargetHydration > 0 &&
            <HydrationInfoParagraph
              waterWeightToMatchDesiredTargetHydration={Controller.waterWeightToMatchDesiredTargetHydration}
              flourWeight={Controller.flourWeight}
              leavenWeight={Controller.leavenWeight}
              leavenHydration={Controller.leavenHydration}
              desiredTargetHydration={Controller.desiredTargetHydration}
            />
          }
        </View>
      </ErrorBoundary >
    );
  }
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    marginHorizontal: 16
  },
});
