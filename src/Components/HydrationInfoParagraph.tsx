import React from 'react';
import { View, Text } from 'react-native';
import { observer } from 'mobx-react';

export interface IHydrationInfoProps {
  waterWeightToMatchDesiredTargetHydration: number;
  flourWeight: number;
  leavenWeight: number;
  leavenHydration: number;
  desiredTargetHydration: number;
}

@observer
export class HydrationInfoParagraph extends React.Component<IHydrationInfoProps>{
  public render() {
    const { waterWeightToMatchDesiredTargetHydration, flourWeight, leavenWeight, leavenHydration, desiredTargetHydration } = this.props;
    return (
      <View>
        <Text style={{ fontSize: 24, textAlign: 'center', marginTop: 4 }}>
          {`Add ${waterWeightToMatchDesiredTargetHydration.toFixed(0)}g water to ${flourWeight}g flour and ${leavenWeight}g leaven (${leavenHydration}% hydr.) in order to reach target hydr. of ${desiredTargetHydration.toFixed(0)}%`}
        </Text>
      </View>
    );
  }
}
