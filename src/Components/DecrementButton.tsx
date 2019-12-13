import React from 'react';
import { TouchableOpacity, Image } from 'react-native';

interface IProps {
  onPress(): void;
}

export class DecrementButton extends React.Component<IProps>{
  public render() {
    return <TouchableOpacity onPress={this.props.onPress}
      style={{ height: 30, width: 30, borderRadius: 15, justifyContent: 'center', alignItems: 'center', backgroundColor: '#D8D8D8' }}>
      <Image source={require('../icon_minus.png')}
        style={{ height: 15, width: 15, borderRadius: 7.5, resizeMode: 'contain', tintColor: 'black' }} />
    </TouchableOpacity>;
  }
}
