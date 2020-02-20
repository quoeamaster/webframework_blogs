import 'react-native-gesture-handler';  // J: add gesture handler (native)
import * as React from 'react';
import { Platform, StatusBar, StyleSheet, View, Text } from 'react-native';
import { SplashScreen } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import BottomTabNavigator from './navigation/BottomTabNavigator';
import useLinking from './navigation/useLinking';

import OptionFor2DayScreen from './screens/optionFor2Day';
import JokePreparationScreen from './screens/jokePreparationScreen';

const Stack = createStackNavigator();

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  //const [initialNavigationState, setInitialNavigationState] = React.useState();
  const containerRef = React.useRef();  // J: reference to a component
  //const { getInitialState } = useLinking(containerRef);

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        // J: show splashScreen
        SplashScreen.preventAutoHide();

        // Load our initial navigation state
        //setInitialNavigationState(await getInitialState());

        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font,
          'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        // J: when all resources loaded, hide the splashScreen
        setLoadingComplete(true);
        SplashScreen.hide();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return null;
  } else {
    // styles.container
    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        <NavigationContainer ref={containerRef} >
          <Stack.Navigator>
            <Stack.Screen
              name="Options" component={OptionFor2DayScreen}
              options={{ title: 'options for today' }} />
            <Stack.Screen
              name="JokePreparation" component={JokePreparationScreen}
              options={{ headerShown: false, headerBackTitleVisible: false, }} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    );
  }
}

/*
function Home({navigation}) {
  return (
    <View>
      <Text>hello World</Text>
    </View>
  );
}
*/

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
