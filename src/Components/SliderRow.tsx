import Slider from '@react-native-community/slider';
import { observer } from 'mobx-react';
import React from 'react';
import { Dimensions, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Assets } from '../assets';
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

  private decrementValue = () => this.props.onValueChange(this.props.value - this.props.incrementAmount);

  private incrementValue = () => this.props.onValueChange(this.props.value + this.props.incrementAmount);

  public render() {
    const {
      isKeyboardActive,
      isLocked,
      label,
      maxValue,
      minValue,
      onLockValue,
      onSymbolClick,
      onValueChange,
      onValueClick,
      value,
      valueAffix,
    } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.upperRowContainer}>
          <TextWithAccessibility style={styles.semiboldText}>{label}</TextWithAccessibility>
          <View style={{ width: onLockValue && isLocked != null ? 32 : 0, marginLeft: onLockValue && isLocked != null ? 4 : 0 }}>

            {onLockValue && isLocked != null &&
              <TouchableOpacity onPress={this.props.onLockValue} style={styles.lockButtonContainer}>
                <>
                  {isLocked &&
                    <Image source={Assets.icon_locked} style={styles.lockedIcon} />}
                  {!isLocked &&
                    <Image source={Assets.icon_unlocked} style={styles.unlockedIcon} />}
                </>
              </TouchableOpacity>}
          </View>
        </View>
        <View style={styles.sliderContainer}>
          <DecrementButton
            disabled={isLocked}
            onPress={this.decrementValue}
          />
          <View style={styles.minorHorizontalGap} />
          <Slider
            disabled={isLocked}
            style={styles.sliderStyle}
            minimumValue={minValue}
            maximumValue={maxValue}
            step={1}
            thumbTintColor="#D8D8D8"
            minimumTrackTintColor="#D8D8D8"
            maximumTrackTintColor="#D8D8D8"
            value={value}
            onSlidingComplete={onValueChange}
          />
          <View style={styles.minorHorizontalGap} />
          <IncrementButton
            disabled={isLocked}
            onPress={this.incrementValue}
          />
          <View style={styles.horizontalGap} />
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
  horizontalGap: {
    width: 8
  },
  lockButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10
  },
  lockedIcon: {
    height: 20,
    resizeMode: 'contain',
    width: 20
  },
  minorHorizontalGap: {
    width: 4
  },
  semiboldText: {
    fontWeight: '500'
  },
  sliderContainer: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 24,
    maxWidth: Dimensions.get('window').width
  },
  sliderStyle: {
    flex: 4,
    height: 40,
    marginVertical: 4
  },
  unlockedIcon: {
    height: 20,
    resizeMode: 'contain',
    tintColor: 'gray',
    width: 20
  },
  upperRowContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start'
  }
});
