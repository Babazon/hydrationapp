import 'es6-symbol/implement';
import { observer } from 'mobx-react';
import React from 'react';
import { RefreshControl, SafeAreaView, StyleSheet, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import '../bugsnagConfig';
import { ErrorBoundary } from '../ErrorBoundary';
import root from '../store/RootStore';
import { AppVm } from './AppVm';
import { InfoBlock } from './InfoBlock';
import { Main } from './Main';

@observer
export default class App extends React.Component {

  constructor(props: {}) {
    super(props);
  }

  private readonly vm: AppVm = new AppVm(root?.dough);

  // private renderItem = ({ item }: { item: [string, RecipeModel] }) => {
  //   return (
  //     <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 4 }}>
  //       <TextWithAccessibility>{item[0].substr(0, 9)}</TextWithAccessibility>
  //       <TextWithAccessibility>
  //         F: {item[1].recipeFlour + ' '}
  //         W: {item[1].recipeWater + ' '}
  //         LW: {item[1].leavenWeight + ' '}
  //         LH: {item[1].leavenHydration + ' '}
  //       </TextWithAccessibility>
  //     </View>
  //   );
  // }

  public render() {

    return (
      <ErrorBoundary>

        <SafeAreaProvider>
          <SafeAreaView style={styles.safeAreaView}>

            <KeyboardAwareScrollView
              refreshControl={<RefreshControl
                refreshing={false}
                onRefresh={this.vm.dough.resetValues}
              />}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.scrollViewContentStyle}>
              {/* <TouchableHighlight onPress={this.vm.dough.persistRecipe}>
                <TextWithAccessibility>Persist this recipe</TextWithAccessibility>
              </TouchableHighlight>

              <FlatList<[string, RecipeModel]>
                renderItem={this.renderItem}
                data={this.vm.dough.localRecipesArray}
                keyExtractor={(item) => item[0]}
              /> */}
              <Main sliderData={this.vm.sliderData} />
              <View style={styles.padding} />
              <InfoBlock dough={this.vm.dough} />

            </KeyboardAwareScrollView>
          </SafeAreaView>

        </SafeAreaProvider>
      </ErrorBoundary >
    );
  }
}

const styles = StyleSheet.create({
  padding: {
    height: 16
  },
  safeAreaView: {
    flex: 1
  },
  scrollViewContentStyle: {
    alignItems: 'stretch',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginHorizontal: 8,
    paddingVertical: 16
  }
});
