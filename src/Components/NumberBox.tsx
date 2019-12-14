import React from 'react';
import { View, TouchableOpacity, TextInput } from 'react-native';
import { observer } from 'mobx-react';
import { TextWithAccessibility } from './TextWithAccessibility';

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
          alignItems: 'stretch',
          borderBottomLeftRadius: 4,
          borderTopLeftRadius: 4,
          flex: 2,
          height: 32,
          justifyContent: 'center',
          backgroundColor: '#EAEAEA'
        }}
        disabled={!this.props.onValueClick}
        onPress={this.props.onValueClick}>

        {!this.props.isKeyboardActive &&
          (<TextWithAccessibility style={{ color: 'black', textAlign: 'right', fontSize: 14, fontWeight: '500', marginHorizontal: 4 }}>
            {this.props.value.toFixed(0)}
          </TextWithAccessibility>)
        }

        {this.props.isKeyboardActive &&
          (<TextInput
            keyboardType={'default'}
            autoFocus
            style={{ color: 'black', textAlign: 'right', fontSize: 14, fontWeight: '500', marginHorizontal: 4 }}
            value={
              this.props.value > 0 ?
                this.props.value.toFixed(0) + '' :
                ''
            }
            onChangeText={(value: string) => {
              if (!isNaN(+value) && this.props.onValueChange) {
                this.props.onValueChange(+value);
              }
            }} />
          )
        }

      </TouchableOpacity>
      <TouchableOpacity
        style={{
          alignItems: 'center',
          borderBottomRightRadius: 4,
          borderTopRightRadius: 4,
          flex: 1,
          height: 32,
          justifyContent: 'center',
          backgroundColor: '#D8D8D8'
        }}
        disabled={!this.props.onSymbolClick}
        onPress={this.props.onSymbolClick}>
        <TextWithAccessibility numberOfLines={1} style={{ color: 'black', textAlign: 'center', fontSize: 14, fontWeight: '500' }}>
          {this.props.symbol}
        </TextWithAccessibility>
      </TouchableOpacity>
    </View>);
  }
}
