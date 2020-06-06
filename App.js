/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';

import * as React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import UserSearch from './src/components/UserSearch';
import Albums from './src/components/Albums';
import Photos from './src/components/Photos';
import Comments from './src/components/Comments'

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
   
        <Stack.Screen
          name="user-search"
          component={UserSearch}
          options={{title: 'UserSearch'}}
        />
        <Stack.Screen
          name="user-albums"
          component={Albums}
          options={{title: 'Albums'}}
        />
        <Stack.Screen
          name="album-photos"
          component={Photos}
          options={{title: 'Photos'}}
        />
           <Stack.Screen
          name="photo-comments"
          component={Comments}
          options={{title: 'Comments'}}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
