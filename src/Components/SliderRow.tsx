import React from 'react';
import { View, Slider, Text } from 'react-native';
import { observer } from 'mobx-react';

export interface ISliderRowProps {
  value: number;
  onValueChange(val: number): void;
  valueAffix: string;
  description: string;
  minValue: number;
  maxValue: number;
}

@observer
export class SliderRow extends React.Component<ISliderRowProps>{
  public render() {
    const { value, onValueChange, description, valueAffix, minValue, maxValue } = this.props;
    return (
      <View style={{
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'stretch'
      }}>
        <Text style={{ textAlign: 'center' }}>{description.toUpperCase()}</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>

          <Text style={{ flex: 1, textAlign: 'center', marginRight: 4, fontWeight: 'bold', fontSize: 16, textDecorationLine: 'underline', textDecorationColor: 'lightgray' }}>
            {value.toFixed(0)}{valueAffix}
          </Text>

          <Slider
            style={{ height: 40, marginVertical: 4, flex: 4 }}
            minimumValue={minValue}
            maximumValue={maxValue}
            step={5}
            minimumTrackTintColor="green"
            maximumTrackTintColor="red"
            value={value}
            onValueChange={onValueChange}
          />

        </View>
      </View>
    );
  }
}
