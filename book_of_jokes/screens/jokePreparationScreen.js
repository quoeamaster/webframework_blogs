import 'react-native-gesture-handler';
import * as React from 'react';
import { StyleSheet, Text, View, ImageBackground, Image, TouchableOpacity } from 'react-native';

import commonStyle from './../assets/styles/common';

export default function JokePreparationScreen({route, navigation}) {
  /*
  // J: getting back the route params
  console.log(route.params.name);
  let {name} = route.params;
  console.log(name);
  */
  // TODO: set the background to a full image and place some words... at the top or middle
  // TODO: add LongPress gesture handling too (shake)
  return (
    <View style={[commonStyle.coreContainer, styles.container]}>
      <ImageBackground
        style={commonStyle.fullBackgroundImage}
        source={require('./../assets/images/reactNativeSmiley.jpg')}>
        <View style={styles.captionContainer}>
          <Text style={styles.captionText}>
            Concentrate and the joke would come out soon...{"\n\n"}
            Place your thumbs here
          </Text>
        </View>
        <View style={styles.printContainer}>
          <TouchableOpacity>
            <Image
              style={styles.printImg}
              source={require('./../assets/images/reactNative-prints_left.png')} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              style={styles.printImg}
              source={require('./../assets/images/reactNative-prints.png')} />
          </TouchableOpacity>
        </View>
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
