import React from 'react';
import { View, Text } from 'react-native';
import styles from '../styles/styles';

export default function WaitingToAcceptOffer() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Waiting for accepted offer, stay patient!</Text>
    </View>
  );
}
