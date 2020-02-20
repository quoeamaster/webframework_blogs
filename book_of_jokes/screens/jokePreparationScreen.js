import 'react-native-gesture-handler';
import * as React from 'react';
import { StyleSheet, Text, View, ImageBackground, Image, TouchableOpacity, Vibration } from 'react-native';

import commonStyle from './../assets/styles/common';

import MultiTouchWrapper from './../components/MultiTouchWrapper';

export default function JokePreparationScreen({route, navigation}) {
  /*
  // J: getting back the route params
  console.log(route.params.name);
  let {name} = route.params;
  console.log(name);
  */
  // set the background to a full image and place some words...
  // at the top or middle; use either a position absolute or alignItems feature to restructure your components on top of the ImageBackground
  //
  // TODO: add LongPress gesture handling too (shake)
  // TODO: add a new common multi-tap component =>
  //  https://egghead.io/lessons/react-native-detect-multiple-touches-in-react-native-with-the-gesture-responder-system

  const DEFAULT_CAPTION = `Concentrate and the joke would come out soon...
  
Place your thumbs here`;
  const [isJokeRetrieved, setJokeRetrieved] = React.useState(false);
  const [joke, setJoke] = React.useState(null);
  const [captionMsg, setCaptionMsg] = React.useState(DEFAULT_CAPTION);
  //const captionTextRef = React.useRef();

  let _onThumbsLongPress = function (evt) {
    // check number of touches (not really necessary though....)
    if (evt && evt.touchHistory && evt.touchHistory.numberActiveTouches &&
      evt.touchHistory.numberActiveTouches === 2) {
      // get the joke first
      _fetchJoke();

      // shake the phone....
      const PATTERN = [500, 1000];
      Vibration.vibrate(PATTERN);
    }
  };
  let _onThumbsPressOut = function (evt) {
    // TODO: if isJokeRetrieved === true... display it etc
    if (isJokeRetrieved === true) {
      if (joke.hasOwnProperty("joke")) {
        setCaptionMsg(joke.joke);
      }
    }
    console.log('released', joke);
  };

  let _fetchJoke = async function () {
    const JOKE_API = "https://icanhazdadjoke.com/";
    setJoke(null);
    try {
      let response = await fetch(JOKE_API, {
        method: "GET",
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      let jsonResponse = await response.json();
      setJoke(jsonResponse);
      setJokeRetrieved(true);

      return jsonResponse;

    } catch (e) {
      console.error(e);
    }
  };


  return (
    <View style={[commonStyle.coreContainer, styles.container]}>
      <ImageBackground
        style={commonStyle.fullBackgroundImage}
        source={require('./../assets/images/reactNativeSmiley.jpg')}>
        <View style={styles.captionContainer}>
          <Text style={styles.captionText}>
            {captionMsg}
          </Text>
        </View>

        <TouchableOpacity
          onLongPress={_onThumbsLongPress}
          onPressOut={_onThumbsPressOut}
          style={styles.printContainer}>
          <Image
            style={styles.printImg}
            source={require('./../assets/images/reactNative-prints_left.png')} />
          <Image
            style={styles.printImg}
            source={require('./../assets/images/reactNative-prints.png')} />
        </TouchableOpacity>

      </ImageBackground>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
  },
  captionContainer: {
    flex: 1,
    alignSelf: "center",
    paddingTop: 120,
    paddingLeft: 20,
    paddingRight: 20,
  },
  captionText: {
    fontSize: 40,
    color: "rgba(255,255,255,1.0)",
    fontWeight: "800",
    textAlign: "center",
  },
  printContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  printImg: {
    width: 120,
    height: 120,
  },
});

/*
using a wrapper to detect multi-gesture / taps

          <MultiTouchWrapper
            numberOfTouchesExpected="2"
            callback={() => alert('yo')}
            containerStyle={styles.printContainer}
            children={this} >
            <TouchableOpacity style={styles.printContainer}>
              <Image
                style={styles.printImg}
                source={require('./../assets/images/reactNative-prints_left.png')} />
              <Image
                style={styles.printImg}
                source={require('./../assets/images/reactNative-prints.png')} />
            </TouchableOpacity>
          </MultiTouchWrapper>
 */
