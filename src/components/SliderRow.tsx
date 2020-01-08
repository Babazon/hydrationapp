import Slider from '@react-native-community/slider';
import { observer } from 'mobx-react';
import React from 'react';
import { Dimensions, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Assets } from '../assets';
import { CircularButton } from './CircularButton';
import { CollapsableView } from './CollapsableView';
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
  toggleLocked?(): void;
  incrementAmount: number;
  onValueClick(): void;
  onSymbolClick?(): void;
  isKeyboardActive: boolean;
}

@observer
export class SliderRow extends React.Component<ISliderRowProps>{

  private readonly decrementValue = () => this.props.onValueChange(this.props.value - this.props.incrementAmount);

  private readonly incrementValue = () => this.props.onValueChange(this.props.value + this.props.incrementAmount);

  public render() {
    const {
      isKeyboardActive,
      isLocked,
      label,
      maxValue,
      minValue,
      toggleLocked,
      onSymbolClick,
      onValueChange,
      onValueClick,
      value,
      valueAffix,
    } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.upperRowContainer}>
          <TextWithAccessibility style={styles.semiboldText}>
            {label}
          </TextWithAccessibility>

          <CollapsableView content={<TextWithAccessibility>Flour</TextWithAccessibility>} />

          <View style={StyleSheet.flatten([styles.lockButtonView,
          {
            marginLeft: toggleLocked && isLocked != null ? 4 : 0,
            width: toggleLocked && isLocked != null ? 32 : 0
          }])}>

            {toggleLocked && isLocked != null &&
              <TouchableOpacity onPress={this.props.toggleLocked} style={styles.lockButtonContainer}>
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
          <CircularButton
            icon={Assets.icon_minus}
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
          <CircularButton
            icon={Assets.icon_plus}
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
    marginVertical: 8,
  },
  horizontalGap: {
    width: 8
  },
  lockButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  lockButtonView: {
    alignItems: 'center',
    alignSelf: 'flex-end',
    justifyContent: 'center',
  },
  lockedIcon: {
    height: 24,
    resizeMode: 'contain',
    tintColor: '#7AADF3',
    width: 24
  },
  minorHorizontalGap: {
    width: 4
  },
  semiboldText: {
    fontSize: 16,
    fontWeight: '500',
  },
  sliderContainer: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 24,
    maxWidth: Dimensions.get('window').width,
  },
  sliderStyle: {
    flex: 4,
    height: 40,
    marginVertical: 4,
  },
  unlockedIcon: {
    height: 24,
    resizeMode: 'contain',
    tintColor: 'gray',
    width: 24
  },
  upperRowContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 40,
    justifyContent: 'space-between'
  }
});
