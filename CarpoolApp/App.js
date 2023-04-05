import * as React from 'react';
import { Text, View, Button } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeScreen from './components/Home';
import Login from './components/Login';
import OfferCarpool from './components/OfferCarpool';

const Stack = createNativeStackNavigator();

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{title: 'Welcome to our carpool app'}}/>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="OfferCarpool" component={OfferCarpool}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyStack