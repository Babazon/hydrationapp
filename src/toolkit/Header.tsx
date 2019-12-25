import { observer } from 'mobx-react';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { TextWithAccessibility } from './TextWithAccessibility';

export interface IHeaderProps {
  isPremium: boolean;
  setPremium(): void;
  saveRecipe(): void;
}

@observer
export class Header extends React.Component<IHeaderProps> {
  public render() {
    const { isPremium, setPremium, saveRecipe } = this.props;
    return (
      <View style={styles.container}>
        <TouchableOpacity style={StyleSheet.flatten([styles.button])} onPress={saveRecipe}>
          <TextWithAccessibility>
            Save Recipe
          </TextWithAccessibility>
        </TouchableOpacity>
        <TextWithAccessibility style={StyleSheet.flatten([styles.title])}>
          Hydration
        </TextWithAccessibility>
        <TouchableOpacity style={StyleSheet.flatten([styles.button])} onPress={setPremium} disabled={isPremium}>
          <>
            {!isPremium &&
              <TextWithAccessibility>
                Try Premium
            </TextWithAccessibility>
            }
            {isPremium &&
              <TextWithAccessibility>
                Trying Premium
              </TextWithAccessibility>
            }
          </>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    borderColor: 'lightblue',
    borderRadius: 8,
    borderWidth: 1,
    justifyContent: 'center',
    padding: 4
  },
  container: {
    alignItems: 'center',
    flex: 3,
    flexDirection: 'row',
    height: 60,
    justifyContent: 'space-between'
  },
  title: {
    fontWeight: 'bold',
    marginHorizontal: 4
  }
});
