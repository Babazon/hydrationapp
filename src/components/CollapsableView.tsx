import React from 'react';
import { Image, StyleSheet, TouchableHighlight, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import Collapsible from 'react-native-collapsible';
import { Assets } from '../assets';

export interface ICollapsableViewProps {
  content: JSX.Element | JSX.Element[];
}

export class CollapsableView extends React.Component<ICollapsableViewProps, { collapsed: boolean }> {

  public state = {
    collapsed: true
  };

  private toggle = () => this.setState((prev) => ({ collapsed: !prev.collapsed }));

  public render() {
    return <View>
      <TouchableHighlight onPress={this.toggle} underlayColor="transparent">
        < >
          {this.state.collapsed && <Image source={Assets.icon_right_chevron} style={styles.icon} />}
          {this.state.collapsed && <Image source={Assets.icon_down_chevron} style={styles.icon} />}
        </>
      </TouchableHighlight>
      <Collapsible collapsed={this.state.collapsed}>
        <Animatable.View
          duration={300}
          easing="ease-out">
          {!!this.props.content && this.props.content}
        </Animatable.View>
      </Collapsible>
    </View>;
  }
}

const styles = StyleSheet.create({
  icon: {
    height: 30,
    resizeMode: 'contain',
    width: 30
  }
});
