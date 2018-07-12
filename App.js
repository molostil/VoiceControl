/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
        /* <VoiceRecognitionButton></VoiceRecognitionButton> */
        

import React, { Component } from 'react';
import {
  StyleSheet,
  View
} from 'react-native';

import VoiceRecognitionButton from './VoiceRecognitionButton'
import VoiceRecognitionEndless from './VoiceRecognitionEndless'

export default class App extends Component {

  render() {
    return (
      <View style={styles.container}>
        {/* Apparently it's not possible to import two instances      */}
        {/* of Voice in one App, so you have to choose which kind of  */}
        {/* voice recognition should be used                          */}
        {/* WARNING: Endless recognition is still in progress         */}

        {/* <VoiceRecognitionEndless></VoiceRecognitionEndless> */}
        <VoiceRecognitionButton></VoiceRecognitionButton>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
