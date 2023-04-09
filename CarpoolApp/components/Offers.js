import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import styles from '../styles/styles';
import DataService from '../DataService';


export default function Offers({route, navigation}) {

    const { start, end } = route.params;
    console.log(start)
    console.log(end)
    
    DataService.getOffersForRequester(1, 1, 1, 1).then((res) =>
      ass = res
    );
    
    console.log(ass)



  return (
    <View style={styles.container}>
        <Text style={styles.title}>Start: {start}</Text>
        <Text style={styles.title}>Destination: {end}</Text>
    </View>
  );
}
