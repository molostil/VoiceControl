import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Button
} from 'react-native';

import Tts from 'react-native-tts'


export default class TextToSpeech extends Component {
  
  constructor(props) {
    super(props)
    Tts.setDefaultLanguage('de-DE')
    Tts.setDefaultVoice('com.apple.ttsbundle.Anna-compact')
    Tts.addEventListener('tts-start', (event) => console.log("start", event));
    Tts.addEventListener('tts-finish', (event) => console.log("finish", event));
    Tts.addEventListener('tts-cancel', (event) => console.log("cancel", event));
  }

  speak = () => {
    if(this.props.text){
      const concat = this.props.text.join(' ')
      Tts.getInitStatus().then(() => {
        Tts.speak(concat);
      });
    }
  }

  render() {
    return(
      <View>
        <Button title="Repeat!" onPress={this.speak}></Button>
      </View>
    )
  }
}