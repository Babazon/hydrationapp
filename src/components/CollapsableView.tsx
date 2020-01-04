import React from 'react';
import { TouchableHighlight, View } from 'react-native';
import Collapsible from 'react-native-collapsible';
import { TextWithAccessibility } from './TextWithAccessibility';

export class CollapsableView extends React.Component<{}, { collapsed: boolean }> {

  public state = {
    collapsed: true
  };
  private collapse = () => this.setState((prev) => ({ collapsed: !prev.collapsed }));

  public render() {
    return <View>
      <TouchableHighlight>
        <TextWithAccessibility onPress={this.collapse}>
          {this.state.collapsed ? 'Expand' : 'Collapse'}
        </TextWithAccessibility>
      </TouchableHighlight>
      <Collapsible collapsed={this.state.collapsed}>
        <TextWithAccessibility onPress={this.collapse}>
          Collapsed content
      </TextWithAccessibility>
      </Collapsible>
    </View>;
  }
}
