import 'es6-symbol/implement';
import { observer } from 'mobx-react';
import React from 'react';
import { RefreshControl, SafeAreaView, StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { AppViewModel } from './AppViewModel';
import './bugsnagConfig';
import { Credits } from './container/Credits';
import { InfoBlock } from './container/InfoBlock';
import { Main } from './container/Main';
import { ErrorBoundary } from './ErrorBoundary';
import dough from './store/Dough';
import { Header } from './toolkit/Header';

@observer
export default class App extends React.Component {

  constructor(props: {}) {
    super(props);
  }

  private readonly vm: AppViewModel = new AppViewModel(dough);

  public render() {

    return (
      <ErrorBoundary>
        <SafeAreaView style={styles.safeAreaView}>
          <KeyboardAwareScrollView
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                title={this.vm.dough.userInterface.languageConstants._reset}
                refreshing={false}
                onRefresh={this.vm.dough.resetValues}
              />}
            contentContainerStyle={styles.scrollViewContentStyle}>
            <Header isPremium={this.vm.isPremium} setPremium={this.vm.setPremium} saveRecipe={this.vm.saveRecipe} />
            <Main sliderData={this.vm.sliderData} />
            <InfoBlock dough={this.vm.dough} />
            <Credits />

          </KeyboardAwareScrollView>
        </SafeAreaView>
      </ErrorBoundary >
    );
  }
}

const styles = StyleSheet.create({

  safeAreaView: {
    flex: 1,
    marginTop: 16
  },
  scrollViewContentStyle: {
    alignItems: 'stretch',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginHorizontal: 8,
    paddingVertical: 16
  }
});
