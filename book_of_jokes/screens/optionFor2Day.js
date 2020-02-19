import 'react-native-gesture-handler';
import * as React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import commonStyle from './../assets/styles/common';

export default function OptionFor2DayScreen({navigation}) {
  return (
    <View style={[commonStyle.coreContainer, styles.container]}>
      <Text>what are you looking for today?</Text>
      <Button
        title="Go to Joke preparation screen"
        onPress={() => navigation.navigate('JokePreparation', {name: 'Jason'})}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
  },
});
