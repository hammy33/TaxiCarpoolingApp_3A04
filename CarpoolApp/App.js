import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeScreen from './components/Home';
import Login from './components/Login';
import OfferCarpool from './components/OfferCarpool';
import QRScanner from './components/QRScanner.js';


const Stack = createNativeStackNavigator();

const MyStack = () => {
  return (
    <NavigationContainer initialRouteName="Welcome">
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={navigationOptions={headerShown: false}}/>
        <Stack.Screen name="Login" component={Login} options={navigationOptions={headerShown: false}}/>
        <Stack.Screen name="OfferCarpool" component={OfferCarpool} options={navigationOptions={headerShown: false}}/>
        <Stack.Screen name="QRScanner" component={QRScanner} options={navigationOptions={headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyStack
