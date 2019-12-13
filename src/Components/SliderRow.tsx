import React from 'react';
import { View, Slider, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { observer } from 'mobx-react';
import { DecrementButton } from './DecrementButton';
import { IncrementButton } from './IncrementButton';
import { NumberBox } from './NumberBox';

export interface ISliderRowProps {
  value: number;
  onValueChange(val: number): void;
  valueAffix: string;
  description: string;
  minValue: number;
  maxValue: number;
  onLockValue?(): void;
  isLocked?: boolean;
  incrementAmount: number;
  onValueClick(): void;
  onSymbolClick(): void;
  isKeyboardActive: boolean;
}

@observer
export class SliderRow extends React.Component<ISliderRowProps>{
  public render() {
    const {
      value, onValueChange, incrementAmount, minValue, maxValue, isLocked, onLockValue,
      valueAffix, onValueClick, onSymbolClick, isKeyboardActive } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.sliderContainer}>

          {onLockValue && isLocked != null &&
            <>
              <TouchableOpacity onPress={this.props.onLockValue} style={{ justifyContent: 'center', alignItems: 'center' }}>
                <>
                  {isLocked && <Image source={require('../icon_locked.png')} style={{ height: 20, width: 20, resizeMode: 'contain' }} />}
                  {!isLocked && <Image source={require('../icon_unlocked.png')} style={{ height: 20, width: 20, resizeMode: 'contain' }} />}
                </>
              </TouchableOpacity>
              <View style={{ width: 4 }} />
            </>

          }
          <DecrementButton
            onPress={() => onValueChange(value - incrementAmount)}
          />
          <View style={{ width: 4 }} />

          <Slider
            disabled={isLocked}
            style={styles.sliderStyle}
            minimumValue={minValue}
            maximumValue={maxValue}
            step={5}
            thumbTintColor="#D8D8D8"
            minimumTrackTintColor="#D8D8D8"
            maximumTrackTintColor="#D8D8D8"
            value={value}
            onValueChange={onValueChange}
          />
          <View style={{ width: 4 }} />

          <IncrementButton
            onPress={() => onValueChange(value + incrementAmount)}
          />
          <View style={{ width: 4 }} />

          <NumberBox
            isKeyboardActive={isKeyboardActive}
            value={value}
            onValueClick={onValueClick}
            onValueChange={onValueChange}
            onSymbolClick={onSymbolClick}
            symbol={valueAffix}
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
  sliderContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1
  },
  sliderStyle: {
    flex: 4,
    height: 40,
    marginVertical: 4
  }
});
