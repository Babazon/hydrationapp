import 'es6-symbol/implement';
import { observer } from 'mobx-react';
import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import '../bugsnagConfig';

import { ErrorBoundary } from '../ErrorBoundary';
import dough from '../store/Dough';
import { AppViewModel } from './AppViewModel';
import { InfoBlock } from './InfoBlock';
import { Main } from './Main';

@observer
export default class App extends React.Component {

  constructor(props: {}) {
    super(props);
  }

  private readonly vm: AppViewModel = new AppViewModel(dough);

  public render() {

    return (
      <ErrorBoundary>

        <SafeAreaProvider>
          <SafeAreaView style={styles.safeAreaView}>

            <KeyboardAwareScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.scrollViewContentStyle}>

              <Main sliderData={this.vm.sliderData} />
              <View style={{ height: 16 }} />
              <InfoBlock dough={this.vm.dough} />

            </KeyboardAwareScrollView>
          </SafeAreaView>

        </SafeAreaProvider>
      </ErrorBoundary >
    );
  }
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  scrollViewContentStyle: {
    alignItems: 'stretch',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginHorizontal: 8,
    paddingVertical: 16
  }
});
