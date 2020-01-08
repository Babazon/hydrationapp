import { observer } from 'mobx-react';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TextWithAccessibility } from '../components/TextWithAccessibility';
import dough from '../store/Dough';
import { InfoBlockVm, InfoRenderData } from './InfoBlockVm';

@observer
export class InfoBlock extends React.Component {

  private readonly vm: InfoBlockVm = new InfoBlockVm(dough);

  private readonly renderDataRow = ({ item }: { item: InfoRenderData }) => {
    return (
      <View style={styles.infoRow} key={item.label}>
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
      <View style={styles.infoBlock}>
        {
          this.vm.infoBlockData.slice().map((item: InfoRenderData) => {
            return this.renderDataRow({ item });
          })}
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
    fontSize: 16,
    textAlign: 'left'
  }
});
