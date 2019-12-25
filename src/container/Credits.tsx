import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TextWithAccessibility } from '../toolkit/TextWithAccessibility';

export const Credits: React.FC = () => {
  return (
    <>
      {__DEV__ &&
        <>
          <View style={styles.creditContainer}>
            <TextWithAccessibility style={styles.creditText}>
              Code: @sourdoughpie
            </TextWithAccessibility>
            <TextWithAccessibility style={styles.creditText}>
              Design: @chexee
            </TextWithAccessibility>
            <TextWithAccessibility style={styles.creditText}>
              Feedback: instagram.com/sourdoughpie or basar.yuksel@gmail.com
            </TextWithAccessibility>
          </View>
        </>
      }
    </>
  );
};

const styles = StyleSheet.create({
  creditContainer: {
    alignItems: 'stretch',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  creditText: {
    fontSize: 8,
    textAlign: 'center'
  },
});
