import React from 'react';
import { TouchableOpacity, Image } from 'react-native';

interface IProps {
  onPress(): void;
  disabled?: boolean;
}

export class IncrementButton extends React.Component<IProps>{
  public render() {
    return (
      <TouchableOpacity onPress={this.props.onPress}
        disabled={this.props.disabled}
        style={{
          alignItems: 'center',
          backgroundColor: '#D8D8D8',
          borderRadius: 15,
          height: 30,
          justifyContent: 'center',
          width: 30,
          opacity: !this.props.disabled ? 1 : 0.5
        }}>
        <Image source={require('../icon_plus.png')}
          style={{
            borderRadius: 7.5,
            height: 15,
            opacity: !this.props.disabled ? 1 : 0.5,
            resizeMode: 'contain',
            tintColor: 'black',
            width: 15
          }} />
      </TouchableOpacity>
    );
  }
}
