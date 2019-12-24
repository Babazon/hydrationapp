import { observer } from 'mobx-react';
import React from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { getDecimalForFixed } from '../utilities/getDecimalForFixed';
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

  private readonly onChangeText = (value: string) => {
    if (!isNaN(+value) && this.props.onValueChange) {
      this.props.onValueChange(+value);
    }
  }

  public render() {

    return (<View
      style={styles.container}>
      <TouchableOpacity
        style={styles.valueText}
        disabled={!this.props.onValueClick}
        onPress={this.props.onValueClick}>

        {!this.props.isKeyboardActive &&
          (
            <TextWithAccessibility style={styles.staticValue}>
              {this.props.value.toFixed(getDecimalForFixed(this.props.value))}
            </TextWithAccessibility>
          )
        }

        {this.props.isKeyboardActive &&
          (
            <TextInput
              keyboardType={'default'}
              autoFocus
              style={styles.textInput}
              value={`${this.props.value.toFixed(getDecimalForFixed(this.props.value))}`}
              onChangeText={this.onChangeText} />
          )
        }

      </TouchableOpacity>
      <TouchableOpacity
        style={styles.symbolTouchable}
        disabled={!this.props.onSymbolClick}
        onPress={this.props.onSymbolClick}>
        <TextWithAccessibility numberOfLines={1} style={styles.symbolText}>
          {this.props.symbol}
        </TextWithAccessibility>
      </TouchableOpacity>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderRadius: 8,
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 120
  },
  staticValue: {
    color: 'black',
    fontSize: 14,
    fontWeight: '500',
    marginHorizontal: 4,
    textAlign: 'right'
  },
  symbolText: {
    color: 'black',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center'
  },
  symbolTouchable: {
    alignItems: 'center',
    backgroundColor: '#D8D8D8',
    borderBottomRightRadius: 4,
    borderTopRightRadius: 4,
    flex: 1,
    height: 32,
    justifyContent: 'center'
  },
  textInput: {
    color: 'black',
    fontSize: 14,
    fontWeight: '500',
    marginHorizontal: 4,
    textAlign: 'right'
  },
  valueText: {
    alignItems: 'stretch',
    backgroundColor: '#EAEAEA',
    borderBottomLeftRadius: 4,
    borderTopLeftRadius: 4,
    flex: 2,
    height: 32,
    justifyContent: 'center'
  }
});
