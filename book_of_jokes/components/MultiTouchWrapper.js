import * as React from 'react';
import { View } from 'react-native';

export default function MultiTouchWrapper({numberOfTouchesExpected, callback, containerStyle, children}) {
  let _onStartShouldSetResponder = function (evt) {
    console.log(evt.nativeEvent.touches);
    return false;
  };
  let _onResponderRelease = function (evt) {
    console.log('released control of this event!');
    // do whatever you want
    console.log(callback);
  };

  return (
    <View
      style={containerStyle}
      onStartShouldSetResponder={_onStartShouldSetResponder}
      onResponderRelease={_onResponderRelease} >
      {children}
    </View>
  );
}


