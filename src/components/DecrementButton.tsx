import React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Assets } from '../assets';

interface IProps {
  onPress(): void;
  disabled?: boolean;
}

export class DecrementButton extends React.Component<IProps>{
  public render() {
    return (
      <TouchableOpacity onPress={this.props.onPress}
        disabled={this.props.disabled}
        style={StyleSheet.flatten([
          styles.button,
          {
            opacity: !this.props.disabled ? 1 : 0.5
          }
        ])}>
        <Image source={Assets.icon_minus}
          style={StyleSheet.flatten([
            styles.icon,
            {
              opacity: !this.props.disabled ? 1 : 0.5
            }
          ])}
        />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#D8D8D8',
    borderRadius: 15,
    height: 30,
    justifyContent: 'center',
    width: 30,
  },
  icon: {
    borderRadius: 7.5,
    height: 15,
    resizeMode: 'contain',
    tintColor: 'black',
    width: 15,
  }
});
