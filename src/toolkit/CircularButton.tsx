import { observer } from 'mobx-react';
import React from 'react';
import { Image, ImageURISource, StyleSheet, TouchableOpacity } from 'react-native';

interface IProps {
  icon: ImageURISource;
  onPress(): void;
  disabled?: boolean;
}

@observer
export class CircularButton extends React.Component<IProps>{
  public render() {
    const { icon, onPress, disabled } = this.props;
    return (
      <TouchableOpacity onPress={onPress}
        disabled={disabled}
        style={StyleSheet.flatten([
          styles.button,
          {
            opacity: !disabled ? 1 : 0.5
          }
        ])}>
        <Image source={icon}
          style={StyleSheet.flatten([
            styles.icon,
            {
              opacity: !disabled ? 1 : 0.5
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
