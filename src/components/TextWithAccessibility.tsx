import React from 'react';
import { Text, TextProps } from 'react-native';

interface IProps extends TextProps {
  children?: string[] | string;
}

export class TextWithAccessibility extends React.Component<IProps>{
  public render() {
    return (
      <Text
        {...this.props}
        maxFontSizeMultiplier={1.5}
        accessible
      >
        {this.props.children}
      </Text>
    );
  }
}
