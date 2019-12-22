import { computed } from 'mobx';
import { observer } from 'mobx-react';
import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Dough } from '../store/Dough';
import { getDecimalForFixed } from '../utilities/getDecimalForFixed';
import { TextWithAccessibility } from './TextWithAccessibility';

// tslint:disable-next-line: interface-name
interface InfoRenderData {
  label: string;
  unit: string;
  value: string;
}
interface IProps {
  dough: Dough;
}

@observer
export class InfoBlock extends React.Component<IProps>{

  @computed private get renderData(): InfoRenderData[] {
    const { dough } = this.props;

    return [
      {
        label: dough.userInterface.languageConstants!._total_flour,
        unit: dough.userInterface.languageConstants!._gram_abbvr,
        value: dough.totalFlour.toFixed(getDecimalForFixed(dough.totalFlour))
      },
      {
        label: dough.userInterface.languageConstants!._total_water,
        unit: dough.userInterface.languageConstants!._gram_abbvr,
        value: dough.totalWater.toFixed(getDecimalForFixed(dough.totalWater))
      },
      {
        label: dough.userInterface.languageConstants!._total_leaven,
        unit: dough.userInterface.languageConstants!._gram_abbvr,
        value: dough.leaven.weight.toFixed(getDecimalForFixed(dough.leaven.weight))
      },
      {
        label: dough.userInterface.languageConstants!._inoculation,
        unit: dough.userInterface.languageConstants!._percent,
        value: dough.leaven.inoculation.toFixed(getDecimalForFixed(dough.leaven.inoculation))
      },
      {
        label: dough.userInterface.languageConstants!._recommended_salt,
        unit: dough.userInterface.languageConstants!._gram_abbvr,
        value: dough.recommendedSalt.toFixed(getDecimalForFixed(dough.recommendedSalt))
      },
      {
        label: dough.userInterface.languageConstants!._total_dough_weight,
        unit: dough.userInterface.languageConstants!._gram_abbvr,
        value: (dough.totalFlour + dough.totalWater + dough.recommendedSalt)
          .toFixed(getDecimalForFixed(dough.totalFlour + dough.totalWater + dough.recommendedSalt))
      },
      {
        label: dough.userInterface.languageConstants!._total_baked_weight,
        unit: dough.userInterface.languageConstants!._gram_abbvr,
        value: dough.postBakeWeight.toFixed(getDecimalForFixed(dough.postBakeWeight))
      },
      {
        label: dough.userInterface.languageConstants!._total_hydration,
        unit: dough.userInterface.languageConstants!._percent,
        value: (dough.totalHydration * 100).toFixed(getDecimalForFixed(dough.totalHydration * 100))
      },
      {
        label: dough.userInterface.languageConstants!._initial_volume,
        unit: dough.userInterface.languageConstants!._liter_abbvr,
        value: dough.experimentalDoughVolume.toFixed(getDecimalForFixed(dough.experimentalDoughVolume))
      },
      {
        label: dough.userInterface.languageConstants!._final_volume,
        unit: dough.userInterface.languageConstants!._liter_abbvr,
        value: dough.experimentalBulkVolume.toFixed(getDecimalForFixed(dough.experimentalBulkVolume))
      },
    ];
  }

  private renderDataRow = ({ item }: { item: InfoRenderData }) => {
    return (
      <View style={styles.infoRow}>
        <TextWithAccessibility style={styles.infoStyle}>{item.label}</TextWithAccessibility>
        <View style={styles.dottedLine} />
        <TextWithAccessibility style={styles.infoStyle}>
          {item.value} {item.unit}
        </TextWithAccessibility>
      </View>
    );
  }

  public render() {

    return (
      <FlatList<InfoRenderData>
        contentContainerStyle={styles.infoBlock}
        keyExtractor={(item) => item.label}
        renderItem={this.renderDataRow}
        data={this.renderData}
        bounces={false}
        scrollEnabled={false}
      />
    );
  }
}

const styles = StyleSheet.create({
  dottedLine: {
    borderColor: 'gray',
    borderRadius: 1,
    borderStyle: 'dotted',
    borderWidth: 1,
    flex: 1,
    marginBottom: 3,
    marginHorizontal: 4,
    zIndex: 0
  },
  infoBlock: {
    alignItems: 'flex-start',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginHorizontal: 4,
    marginVertical: 8
  },
  infoRow: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%'
  },
  infoStyle: {
    fontSize: 14,
    textAlign: 'left'
  }
});
