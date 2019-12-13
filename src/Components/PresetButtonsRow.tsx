import React from 'react';
import { FlatList, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { observer } from 'mobx-react';

export interface IPresetButtonsRowProps {
  presetValues: number[];
  onClickCallback(value: number): void;
  valueSuffix: string;
  selectedValue: number;
}
@observer
export class PresetButtonsRow extends React.Component<IPresetButtonsRowProps>{

  public renderItem = ({ item, index }: { item: number, index: number }) => {
    const { onClickCallback, valueSuffix, selectedValue } = this.props;
    return (
      <TouchableOpacity
        onPress={() => onClickCallback(item)}
        style={StyleSheet.flatten([styles.buttonStyles, {
          borderColor: selectedValue === item ? 'transparent' : 'lightgray',
          backgroundColor: selectedValue === item ? 'lightgray' : 'transparent',
          marginLeft: index === 0 ? 0 : 8,
          marginRight: index === this.props.presetValues.length - 1 ? 0 : 8

        }])}>
        <Text style={styles.buttonText}>{item.toFixed(0)}{valueSuffix}</Text>
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
