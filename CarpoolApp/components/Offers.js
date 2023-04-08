import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import styles from '../styles/styles';

export default function Offers({route, navigation}) {

    const { start, end } = route.params;
    console.log(start)
    console.log(end)

  return (
    <View style={styles.container}>
        <Text style={styles.title}>Start: {start}</Text>
        <Text style={styles.title}>Destination: {end}</Text>
    </View>
  );
}
