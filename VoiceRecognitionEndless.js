import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
} from 'react-native';

import Voice from 'react-native-voice';

const hotWords = ['Attacke', 'Schlaf']

export default class VoiceRecognitionEndless extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recognized: false,
      pitch: '',
      error: '',
      started: false,
      results: [],
      partialResults: [],
      end: false,
      hotwordFound: false
    };
    Voice.onSpeechStart = this.onSpeechStart.bind(this);
    Voice.onSpeechRecognized = this.onSpeechRecognized.bind(this);
    Voice.onSpeechEnd = this.onSpeechEnd.bind(this);
    Voice.onSpeechError = this.onSpeechError.bind(this);
    Voice.onSpeechResults = this.onSpeechResults.bind(this);
    Voice.onSpeechPartialResults = this.onSpeechPartialResults.bind(this);

    this._startRecognizing = this._startRecognizing.bind(this)
    this._stopRecognizing = this._stopRecognizing.bind(this)
    this._cancelRecognizing = this._cancelRecognizing.bind(this)
    this._destroyRecognizer = this._destroyRecognizer.bind(this)
  }

  componentWillUnmount() {
    Voice.destroy().then(Voice.removeAllListeners);
  }

  onSpeechStart(e) {
    this.setState({
      started: true,
    });
    console.log('start')
  }

  onSpeechRecognized(e) {
    this.setState({
      recognized: true,
    });
  }

  onSpeechEnd(e) {
    this.setState({
      end: true,
    });
    console.log('start')
    // this._startRecognizing()
  }

  onSpeechError(e) {
    this.setState({
      error: JSON.stringify(e.error),
    });
  }

  onSpeechResults(e) {
    this.setState({
      results: e.value,
    });
  }

  onSpeechPartialResults(e) {
    this.analyzeHotWords(e.value)
  }

  analyzeHotWords(words){
    words.forEach(word => {
      if(hotWords.includes(word)){
        this._stopRecognizing();
        this.setState({
          hotwordFound: true,
        })
        // setTimeout(() =>{this._startRecognizing()}, 2000)
      }
    });
  }

  async _startRecognizing(e) {
    this.setState({
      recognized: false,
      pitch: '',
      error: '',
      started: false,
      results: [],
      partialResults: [],
      end: false,
      hotwordFound: false,
    });
    try {
      await Voice.start('de-DE');
    } catch (e) {
      console.error(e);
    }
  }

  async _stopRecognizing(e) {
    try {
      await Voice.stop();
    } catch (e) {
      console.error(e);
    }
    this.setState({
      started: false,})
  }

  async _cancelRecognizing(e) {
    try {
      await Voice.cancel();
    } catch (e) {
      console.error(e);
    }
  }

  async _destroyRecognizer(e) {
    try {
      await Voice.destroy();
    } catch (e) {
      console.error(e);
    }
    this.setState({
      recognized: false,
      pitch: '',
      error: '',
      started: false,
      results: [],
      partialResults: [],
      end: false,
      hotwordFound: false
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Endless Voice-Recognition!
        </Text>
        <View style={styles.touchables}> 
          <Button title='Start Endless Recognizing' onPress={this._startRecognizing}></Button>
          <Button title='Stop Recognizing' onPress={this._stopRecognizing}></Button>
          <Button title='Cancel Recognizing' onPress={this._cancelRecognizing}></Button>
          <Button title='Destroy Recognizer' onPress={this._destroyRecognizer}></Button>
        </View>
        <Text>{`Started: ${this.state.started}`}</Text>
        {this.state.hotwordFound ? <Text>HOTWORD FOUND!</Text> : null}
        
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    width: 50,
    height: 50,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  touchables: {
    marginTop: 25,
    backgroundColor: '#eee'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  action: {
    textAlign: 'center',
    color: '#0000FF',
    marginVertical: 5,
    fontWeight: 'bold',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  stat: {
    textAlign: 'center',
    color: '#B0171F',
    marginBottom: 1,
  },
});