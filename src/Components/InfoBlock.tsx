import { observer } from 'mobx-react';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Dough } from '../store/Dough';
import { getDecimalForFixed } from '../utilities/getDecimalForFixed';
import { TextWithAccessibility } from './TextWithAccessibility';

interface IProps {
  dough: Dough;
}

// TODO : Move text to language constants fileor locize

@observer
export class InfoBlock extends React.Component<IProps>{

  public render() {
    const { dough } = this.props;
    return (
      <View style={styles.infoBlock}>

        <View style={styles.infoRow}>
          <TextWithAccessibility style={styles.infoStyle}>Total Flour</TextWithAccessibility>
          <View style={styles.dottedLine} />
          <TextWithAccessibility style={styles.infoStyle}>
            {dough.totalFlour.toFixed(getDecimalForFixed(dough.totalFlour))} {dough.userInterface.languageConstants!._gram_abbvr}</TextWithAccessibility>
        </View>

        <View style={styles.infoRow}>
          <TextWithAccessibility style={styles.infoStyle}>Total Water</TextWithAccessibility>
          <View style={styles.dottedLine} />
          <TextWithAccessibility style={styles.infoStyle}>
            {dough.totalWater.toFixed(getDecimalForFixed(dough.totalWater))} {dough.userInterface.languageConstants!._gram_abbvr}</TextWithAccessibility>
        </View>

        <View style={styles.infoRow}>
          <TextWithAccessibility style={styles.infoStyle}>Leaven</TextWithAccessibility>
          <View style={styles.dottedLine} />
          <TextWithAccessibility style={styles.infoStyle}>
            {dough.leaven.weight.toFixed(getDecimalForFixed(dough.leaven.weight))} {dough.userInterface.languageConstants!._gram_abbvr}
          </TextWithAccessibility>
        </View>

        <View style={styles.infoRow}>
          <TextWithAccessibility style={styles.infoStyle}>Inoculation</TextWithAccessibility>
          <View style={styles.dottedLine} />
          <TextWithAccessibility style={styles.infoStyle}>
            {(dough.leaven.inoculation).toFixed(getDecimalForFixed(dough.leaven.inoculation))} {dough.userInterface.languageConstants!._percent}
          </TextWithAccessibility>
        </View>

        <View style={styles.infoRow}>
          <TextWithAccessibility style={styles.infoStyle}>Recommended Salt</TextWithAccessibility>
          <View style={styles.dottedLine} />
          <TextWithAccessibility style={styles.infoStyle}>
            {dough.recommendedSalt.toFixed(getDecimalForFixed(dough.recommendedSalt))} {dough.userInterface.languageConstants!._gram_abbvr}
          </TextWithAccessibility>
        </View>

        <View style={styles.infoRow}>
          <TextWithAccessibility style={styles.infoStyle}>Total Weight</TextWithAccessibility>
          <View style={styles.dottedLine} />
          <TextWithAccessibility style={styles.infoStyle}>
            {/* tslint:disable-next-line: max-line-length*/}
            {(dough.totalFlour + dough.totalWater + dough.recommendedSalt).toFixed(getDecimalForFixed(dough.totalFlour + dough.totalWater + dough.recommendedSalt))} {dough.userInterface.languageConstants!._gram_abbvr}
          </TextWithAccessibility>
        </View>

        <View style={styles.infoRow}>
          <TextWithAccessibility style={styles.infoStyle}>Post Bake Weight</TextWithAccessibility>
          <View style={styles.dottedLine} />
          <TextWithAccessibility style={styles.infoStyle}>
            {dough.postBakeWeight.toFixed(getDecimalForFixed(dough.postBakeWeight))} {dough.userInterface.languageConstants!._gram_abbvr}
          </TextWithAccessibility>
        </View>

        <View style={styles.infoRow}>
          <TextWithAccessibility style={styles.infoStyle}>Hydration</TextWithAccessibility>
          <View style={styles.dottedLine} />
          <TextWithAccessibility style={styles.infoStyle}>
            {(dough.totalHydration * 100).toFixed(getDecimalForFixed(dough.totalHydration * 100))} {dough.userInterface.languageConstants!._percent}
          </TextWithAccessibility>
        </View>

        <View style={styles.infoRow}>
          <TextWithAccessibility style={styles.infoStyle}>Initial Volume (Experimental)</TextWithAccessibility>
          <View style={styles.dottedLine} />
          <TextWithAccessibility style={styles.infoStyle}>
            {(dough.experimentalDoughVolume).toFixed(getDecimalForFixed(dough.experimentalDoughVolume))} {dough.userInterface.languageConstants!._liter_abbvr}
          </TextWithAccessibility>
        </View>

        <View style={styles.infoRow}>
          <TextWithAccessibility style={styles.infoStyle}>Final Volume (Experimental)</TextWithAccessibility>
          <View style={styles.dottedLine} />
          <TextWithAccessibility style={styles.infoStyle}>
            {(dough.experimentalBulkVolume).toFixed(getDecimalForFixed(dough.experimentalBulkVolume))} {dough.userInterface.languageConstants!._liter_abbvr}
          </TextWithAccessibility>
        </View>

      </View>
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
    alignSelf: 'center',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginHorizontal: 4,
    marginVertical: 8
  },
  infoRow: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  infoStyle: {
    fontSize: 14,
    textAlign: 'left'
  }
});
