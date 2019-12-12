import React from 'react';
import { View, Slider, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { observer } from 'mobx-react';

export interface ISliderRowProps {
  value: number;
  onValueChange(val: number): void;
  valueAffix: string;
  description: string;
  minValue: number;
  maxValue: number;
  onLockValue?(): void;
  isLocked?: boolean;
}

@observer
export class SliderRow extends React.Component<ISliderRowProps>{
  public render() {
    const { value, onValueChange, description, valueAffix, minValue, maxValue, isLocked, onLockValue } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.label}>{description.toUpperCase()}</Text>
        <View style={styles.sliderContainer}>

          {onLockValue && isLocked != null &&
            <TouchableOpacity onPress={this.props.onLockValue} style={{ justifyContent: 'center', alignItems: 'center' }}>
              <>
                {isLocked && <Image source={require('../icon_locked.png')} style={{ height: 20, width: 20, resizeMode: 'contain' }} />}
                {!isLocked && <Image source={require('../icon_unlocked.png')} style={{ height: 20, width: 20, resizeMode: 'contain' }} />}
              </>
            </TouchableOpacity>
          }

          <Text style={styles.sliderValue}>
            {value.toFixed(0)}{valueAffix}
          </Text>

          <Slider
            style={styles.sliderStyle}
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

const styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  label: {
    fontWeight: 'bold',
    textAlign: 'center'
  },
  sliderContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  sliderStyle: {
    flex: 4,
    height: 40,
    marginVertical: 4
  },
  sliderValue: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 4,
    textAlign: 'center',
    textDecorationColor: 'lightgray',
    textDecorationLine: 'underline'
  }
});
