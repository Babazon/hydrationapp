import { observer } from 'mobx-react';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ISliderRowProps, SliderRow } from '../toolkit/SliderRow';

interface IMainProps {
  sliderData: ISliderRowProps[];
}

@observer
export class Main extends React.Component<IMainProps>{

  private readonly renderSlider = ({ item }: { item: ISliderRowProps, index: number }) => {
    return (
      <View style={StyleSheet.flatten([styles.sliderRow])} key={item.label}>
        <SliderRow
          {...item}
        />
      </View>
    );
  }

  public render() {
    return (
      <>
        {this.props.sliderData.slice().map((item: ISliderRowProps, index: number) => {
          return this.renderSlider({ item, index });
        })
        }
      </>
    );
  }
}

const styles = StyleSheet.create({
  sliderRow: {
    height: 80,
    paddingBottom: 8
  }
});
