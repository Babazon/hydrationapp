import React from 'react';
import { View, TouchableOpacity, Text, TextInput } from 'react-native';
import { observer } from 'mobx-react';

interface IProps {
  value: number;
  onValueClick?(): void;
  onValueChange?(value: number): void;
  symbol: string;
  onSymbolClick?(): void;
  isKeyboardActive: boolean;
}
@observer
export class NumberBox extends React.Component<IProps>{

  public render() {
    return (<View
      style={{
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: 120,
        flex: 2,
        borderColor: 'red'
      }}>
      <TouchableOpacity
        style={{
          alignItems: 'center',
          borderBottomLeftRadius: 8,
          borderTopLeftRadius: 8,
          flex: 2,
          height: 40,
          justifyContent: 'center',
          backgroundColor: '#EAEAEA'
        }}
        disabled={!this.props.onValueClick}
        onPress={this.props.onValueClick}>

        {!this.props.isKeyboardActive &&
          (<Text style={{ color: 'black', textAlign: 'center', fontSize: 14, fontWeight: '500', marginHorizontal: 4 }}>
            {this.props.value.toFixed(0)}
          </Text>)
        }

        {this.props.isKeyboardActive &&
          (<TextInput
            autoFocus
            style={{ color: 'black', textAlign: 'center', fontSize: 14, fontWeight: '500', marginHorizontal: 4 }}
            value={this.props.value + ''}
            onChangeText={(value: string) => {
              if (!isNaN(+value) && this.props.onValueChange) {
                this.props.onValueChange(+value);
              }
            }} />)
        }

      </TouchableOpacity>
      <TouchableOpacity
        style={{
          alignItems: 'center',
          borderBottomRightRadius: 8,
          borderTopRightRadius: 8,
          flex: 1,
          height: 40,
          justifyContent: 'center',
          backgroundColor: '#D8D8D8'
        }}
        disabled={!this.props.onSymbolClick}
        onPress={this.props.onSymbolClick}>
        <Text numberOfLines={1} style={{ color: 'black', textAlign: 'center', fontSize: 14, fontWeight: '500' }}>
          {this.props.symbol}
        </Text>
      </TouchableOpacity>
    </View>);
  }
}
