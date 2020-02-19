import 'react-native-gesture-handler';
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';

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
      <Text>Concentrate and the joke would come out soon...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
  },
});
