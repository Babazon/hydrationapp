import React from 'react';
import { TouchableHighlight, View } from 'react-native';
import Collapsible from 'react-native-collapsible';
import { TextWithAccessibility } from './TextWithAccessibility';

export class CollapsableView extends React.Component<{}, { collapsed: boolean }> {

  public state = {
    collapsed: false
  };
  private collapse = () => this.setState((prev) => ({ collapsed: !prev.collapsed }));

  public render() {
    return <View>
      <Collapsible collapsed={this.state.collapsed}>
        <TouchableHighlight>
          <TextWithAccessibility onPress={this.collapse}>
            hi
      </TextWithAccessibility>
        </TouchableHighlight>
      </Collapsible>
    </View>;
  }
}
