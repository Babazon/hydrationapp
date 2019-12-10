import 'es6-symbol/implement';
import { StyleSheet, View, Text, TouchableOpacity, KeyboardAvoidingView, ScrollView } from 'react-native';
import { ErrorBoundary } from './ErrorBoundary';
import { runInAction } from 'mobx';
import { observer } from 'mobx-react';
import React from 'react';
import Controller from './Controller';

// tslint:disable: max-line-length

@observer
export default class App extends React.Component {

  constructor(props: any) {
    super(props);
  }

  public render() {

    return (
      <ErrorBoundary>

        <KeyboardAvoidingView behavior="padding" style={styles.flex}>
          <ScrollView contentContainerStyle={styles.flex} style={{ flex: 1 }}>

            <Text style={{ paddingVertical: 8, fontWeight: 'bold', fontSize: 24 }}>@sourdoughpie hydration app</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', margin: 8 }}>
              <Text style={{ marginHorizontal: 8, fontSize: 14 }}>Set Flour</Text>
              <TouchableOpacity onPress={() => runInAction(() => Controller.flourWeight = 1000)} style={{ marginHorizontal: 8, backgroundColor: Controller.flourWeight === 1000 ? 'lightgray' : 'transparent' }}>
                <Text style={{ fontSize: 14 }}>1000g</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => runInAction(() => Controller.flourWeight = 2000)} style={{ marginHorizontal: 8, backgroundColor: Controller.flourWeight === 2000 ? 'lightgray' : 'transparent' }}>
                <Text style={{ fontSize: 14 }}>2000g</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => runInAction(() => Controller.flourWeight = 3000)} style={{ marginHorizontal: 8, backgroundColor: Controller.flourWeight === 3000 ? 'lightgray' : 'transparent' }}>
                <Text style={{ fontSize: 14 }}>3000g</Text>
              </TouchableOpacity>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', margin: 8 }}>
              <Text style={{ marginHorizontal: 8, fontSize: 14 }}>Set Inoculation</Text>
              <TouchableOpacity onPress={() => runInAction(() => Controller.leavenWeight = 0.15 * Controller.flourWeight)} style={{ marginHorizontal: 8, backgroundColor: Controller.leavenWeight === 0.15 * Controller.flourWeight ? 'lightgray' : 'transparent' }}>
                <Text style={{ fontSize: 14 }}>15%</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => runInAction(() => Controller.leavenWeight = 0.2 * Controller.flourWeight)} style={{ marginHorizontal: 8, backgroundColor: Controller.leavenWeight === 0.2 * Controller.flourWeight ? 'lightgray' : 'transparent' }}>
                <Text style={{ fontSize: 14 }}>20%</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => runInAction(() => Controller.leavenWeight = 0.25 * Controller.flourWeight)} style={{ marginHorizontal: 8, backgroundColor: Controller.leavenWeight === 0.25 * Controller.flourWeight ? 'lightgray' : 'transparent' }}>
                <Text style={{ fontSize: 14 }}>25%</Text>
              </TouchableOpacity>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', margin: 8 }}>
              <Text style={{ marginHorizontal: 8, fontSize: 14 }}> Set Leaven Hydration</Text>
              <TouchableOpacity onPress={() => runInAction(() => Controller.leavenHydration = 50)} style={{ marginHorizontal: 8, backgroundColor: Controller.leavenHydration === 50 ? 'lightgray' : 'transparent' }}>
                <Text style={{ fontSize: 14 }}>50%</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => runInAction(() => Controller.leavenHydration = 75)} style={{ marginHorizontal: 8, backgroundColor: Controller.leavenHydration === 75 ? 'lightgray' : 'transparent' }}>
                <Text style={{ fontSize: 14 }}>75%</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => runInAction(() => Controller.leavenHydration = 100)} style={{ marginHorizontal: 8, backgroundColor: Controller.leavenHydration === 100 ? 'lightgray' : 'transparent' }}>
                <Text style={{ fontSize: 14 }}>100%</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => runInAction(() => Controller.leavenHydration = 150)} style={{ marginHorizontal: 8, backgroundColor: Controller.leavenHydration === 150 ? 'lightgray' : 'transparent' }}>
                <Text style={{ fontSize: 14 }}>150%</Text>
              </TouchableOpacity>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', margin: 8 }}>
              <Text style={{ marginHorizontal: 8, fontSize: 14 }}>Set Hydration</Text>
              <TouchableOpacity onPress={() => runInAction(() => Controller.desiredTargetHydration = 60)} style={{ marginHorizontal: 8, borderColor: 'lightblue', borderWidth: StyleSheet.hairlineWidth, backgroundColor: Controller.desiredTargetHydration === 60 ? 'lightgray' : 'transparent' }}>
                <Text style={{ fontSize: 14 }}>60%</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => runInAction(() => Controller.desiredTargetHydration = 65)} style={{ marginHorizontal: 8, borderColor: 'lightblue', borderWidth: StyleSheet.hairlineWidth, backgroundColor: Controller.desiredTargetHydration === 65 ? 'lightgray' : 'transparent' }}>
                <Text style={{ fontSize: 14 }}>65%</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => runInAction(() => Controller.desiredTargetHydration = 70)} style={{ marginHorizontal: 8, borderColor: 'lightblue', borderWidth: StyleSheet.hairlineWidth, backgroundColor: Controller.desiredTargetHydration === 70 ? 'lightgray' : 'transparent' }}>
                <Text style={{ fontSize: 14 }}>70%</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => runInAction(() => Controller.desiredTargetHydration = 75)} style={{ marginHorizontal: 8, borderColor: 'lightblue', borderWidth: StyleSheet.hairlineWidth, backgroundColor: Controller.desiredTargetHydration === 75 ? 'lightgray' : 'transparent' }}>
                <Text style={{ fontSize: 14 }}>75%</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => runInAction(() => Controller.desiredTargetHydration = 80)} style={{ marginHorizontal: 8, borderColor: 'lightblue', borderWidth: StyleSheet.hairlineWidth, backgroundColor: Controller.desiredTargetHydration === 80 ? 'lightgray' : 'transparent' }}>
                <Text style={{ fontSize: 14 }}>80%</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => runInAction(() => Controller.desiredTargetHydration = 85)} style={{ marginHorizontal: 8, borderColor: 'lightblue', borderWidth: StyleSheet.hairlineWidth, backgroundColor: Controller.desiredTargetHydration === 85 ? 'lightgray' : 'transparent' }}>
                <Text style={{ fontSize: 14 }}>85%</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => runInAction(() => Controller.desiredTargetHydration = 90)} style={{ marginHorizontal: 8, borderColor: 'lightblue', borderWidth: StyleSheet.hairlineWidth, backgroundColor: Controller.desiredTargetHydration === 90 ? 'lightgray' : 'transparent' }}>
                <Text style={{ fontSize: 14 }}>90%</Text>
              </TouchableOpacity>
            </View>

            {/* <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}><Text>Flour Weight</Text><TextInput
              style={{ borderColor: 'gray', borderWidth: StyleSheet.hairlineWidth, fontSize: 40 }}
              value={Controller.flourWeight + ''}
              onChangeText={(text) => { runInAction(() => Controller.flourWeight = Number(text) ? Number(text) : 0); }} /></View>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}><Text>Water Weight</Text><TextInput
              style={{ borderColor: 'gray', borderWidth: StyleSheet.hairlineWidth, fontSize: 40 }}
              value={Controller.waterWeight + ''}
              onChangeText={(text) => { runInAction(() => Controller.waterWeight = Number(text) ? Number(text) : 0); }} /></View>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}><Text>Leaven Weight</Text><TextInput
              style={{ borderColor: 'gray', borderWidth: StyleSheet.hairlineWidth, fontSize: 40 }}
              value={Controller.leavenWeight + ''}
              onChangeText={(text) => { runInAction(() => Controller.leavenWeight = Number(text) ? Number(text) : 0); }} /></View>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}><Text>Leaven Hydration</Text><TextInput
              style={{ borderColor: 'gray', borderWidth: StyleSheet.hairlineWidth, fontSize: 40 }}
              value={Controller.leavenHydration + ''}
              onChangeText={(text) => { runInAction(() => Controller.leavenHydration = Number(text) ? Number(text) : 0); }} /></View> */}

            {/* <Text style={{ fontSize: 30, fontWeight: 'bold' }}>Total Hydration: {(Controller.totalHydration * 100).toFixed(2)}</Text> */}

            <Text>Total Flour: {Controller.totalFlour.toFixed(2)}</Text>
            <Text>Total Water: {Controller.totalWater.toFixed(2)}</Text>
            <Text> Leaven Water: {Controller.leavenWater.toFixed(2)}</Text>
            <Text> Leaven Flour: {Controller.leavenFlour.toFixed(2)}</Text>

            <Text>Recommended Salt: {Controller.recommendedSalt.toFixed(2)}</Text>
            <Text>Approximate Post Bake Weight: {Controller.postBakeWeight.toFixed(2)}</Text>

            {/* <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}><Text>Desired Hydration</Text><TextInput
              value={Controller.desiredTargetHydration + ''}
              style={{ borderColor: 'red', borderWidth: StyleSheet.hairlineWidth, fontSize: 40 }}
              onChangeText={(text) => { runInAction(() => Controller.desiredTargetHydration = Number(text) ? Number(text) : 0); }} /></View> */}

            {Controller.waterWeightToMatchDesiredTargetHydration != null && Controller.waterWeightToMatchDesiredTargetHydration > 0 &&
              <Text style={{ fontSize: 30 }}>{` Add ${Controller.waterWeightToMatchDesiredTargetHydration.toFixed(0)}g water to ${Controller.flourWeight}g flour and ${Controller.leavenWeight}g leaven (${Controller.leavenHydration} hydration) in order to reach target hydration of ${Controller.desiredTargetHydration}%`}
              </Text>
            }
          </ScrollView>
        </KeyboardAvoidingView>
      </ErrorBoundary >
    );
  }
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
