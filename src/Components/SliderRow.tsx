import React from 'react';
import { View, Slider, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native';
import { observer } from 'mobx-react';
import { DecrementButton } from './DecrementButton';
import { IncrementButton } from './IncrementButton';
import { NumberBox } from './NumberBox';
import { TextWithAccessibility } from './TextWithAccessibility';

export interface ISliderRowProps {
  value: number;
  onValueChange(val: number): void;
  valueAffix: string;
  label: string;
  minValue: number;
  maxValue: number;
  isLocked?: boolean;
  onLockValue?(): void;
  incrementAmount: number;
  onValueClick(): void;
  onSymbolClick?(): void;
  isKeyboardActive: boolean;
}

@observer
export class SliderRow extends React.Component<ISliderRowProps>{
  public render() {
    const {
      value, onValueChange, incrementAmount, minValue, maxValue, isLocked,
      valueAffix, onValueClick, onSymbolClick, isKeyboardActive, label, onLockValue } = this.props;
    return (
      <View style={styles.container}>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>

          <TextWithAccessibility style={{ fontWeight: '500' }}>{label}</TextWithAccessibility>

          <View style={{ width: onLockValue && isLocked != null ? 32 : 0, marginLeft: onLockValue && isLocked != null ? 4 : 0 }}>
            {onLockValue && isLocked != null &&
              <TouchableOpacity onPress={this.props.onLockValue} style={{ justifyContent: 'center', alignItems: 'center', marginRight: 8 }}>
                <>
                  {isLocked &&
                    <Image source={require('../icon_locked.png')} style={{ height: 20, width: 20, resizeMode: 'contain' }} />}
                  {!isLocked &&
                    <Image source={require('../icon_unlocked.png')} style={{ height: 20, width: 20, resizeMode: 'contain', tintColor: 'lightgray' }} />}
                </>
              </TouchableOpacity>}
          </View>
        </View>

        <View style={styles.sliderContainer}>

          <DecrementButton
            disabled={isLocked}
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
            disabled={isLocked}
            onPress={() => onValueChange(value + incrementAmount)}
          />
          <View style={{ width: 8 }} />

          <NumberBox
            isKeyboardActive={!isLocked && isKeyboardActive}
            value={value}
            onValueClick={!isLocked ? onValueClick : undefined}
            onValueChange={!isLocked ? onValueChange : undefined}
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
    justifyContent: 'flex-start',
    marginVertical: 8
  },
  sliderContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flex: 1,
    maxWidth: Dimensions.get('window').width,
    marginTop: 24
  },
  sliderStyle: {
    flex: 4,
    height: 40,
    marginVertical: 4
  }
});
