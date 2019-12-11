import React from 'react';
import { FlatList, View, Text, TouchableOpacity } from 'react-native';
import { observer } from 'mobx-react';

export interface IPresetButtonsRowProps {
  presetValues: number[];
  onClickCallback(value: number): void;
  valueSuffix: string;
  selectedValue: number;
}
@observer
export class PresetButtonsRow extends React.Component<IPresetButtonsRowProps>{

  public renderItem = ({ item }: { item: number }) => {
    const { onClickCallback, valueSuffix, selectedValue } = this.props;
    return (
      <TouchableOpacity
        onPress={() => onClickCallback(item)}
        style={{
          marginHorizontal: 8,
          padding: 4,
          justifyContent: 'center',
          alignItems: 'center',
          borderColor: selectedValue === item ? 'transparent' : 'lightgray',
          backgroundColor: selectedValue === item ? 'lightgray' : 'transparent'
        }}>
        <Text style={{ fontSize: 14 }}>{item.toFixed(0)}{valueSuffix}</Text>
      </TouchableOpacity>
    );
  }

  public render() {
    const { presetValues } = this.props;
    return (
      <View>
        <FlatList
          horizontal
          data={presetValues}
          renderItem={this.renderItem}
          keyExtractor={(value) => value + ''}
        />
      </View>
    );
  }
}
