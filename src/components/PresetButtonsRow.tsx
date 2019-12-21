import { observer } from 'mobx-react';
import React from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import { TextWithAccessibility } from './TextWithAccessibility';

export interface IPresetButtonsRowProps {
  isLocked?: boolean;
  presetValues: number[];
  onClickCallback(value: number): void;
  valueSuffix: string;
  selectedValue: number;
}
@observer
export class PresetButtonsRow extends React.Component<IPresetButtonsRowProps>{

  public renderItem = ({ item, index }: { item: number, index: number }) => {
    const { onClickCallback, valueSuffix, selectedValue, isLocked } = this.props;
    return (
      <TouchableOpacity
        disabled={isLocked}
        onPress={() => onClickCallback(item)}
        style={StyleSheet.flatten([styles.buttonStyles, {
          backgroundColor: selectedValue === item ? 'lightgray' : 'transparent',
          borderColor: selectedValue === item ? 'transparent' : 'lightgray',
          marginLeft: index === 0 ? 0 : 8,
          marginRight: index === this.props.presetValues.length - 1 ? 0 : 8
        }])}>
        <TextWithAccessibility style={styles.buttonText}>{item.toFixed(0)}{valueSuffix}</TextWithAccessibility>
      </TouchableOpacity>
    );
  }

  public render() {
    const { presetValues } = this.props;
    return (
      <View>
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal
          data={presetValues}
          renderItem={this.renderItem}
          keyExtractor={(value) => value + ''}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonStyles: {
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: StyleSheet.hairlineWidth,
    justifyContent: 'center',
    padding: 4
  },
  buttonText: {
    fontSize: 14,
  }
});
