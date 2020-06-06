import React from 'react';
import {View, ActivityIndicator} from 'react-native';

const Loading = () => {
  return (
    <View
      style={{
        flex: 1,
        padding: 20,
        alignContent: 'center',
        justifyContent: 'center',
      }}>
      <ActivityIndicator size="large" color="#2089dc" />
    </View>
  );
};

export default Loading;
