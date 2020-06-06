import React from 'react';
import {View, Text} from 'react-native';

const Message = ({text}) => {
  return (
    <View
      style={{
        flex: 1,
        margin: 30,
        alignContent: 'stretch',
        justifyContent: 'center',
      }}>
      <Text style={{fontSize: 30, color: '#2089dc'}}>{text}</Text>
    </View>
  );
};

export default Message;
