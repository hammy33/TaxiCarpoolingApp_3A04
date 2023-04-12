import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Keyboard, TouchableWithoutFeedback } from 'react-native';
import styles from '../styles/styles';
import DataService from '../DataService';


export default function WaitForOffer({ navigation }) {

    const refresh = () => {
        DataService.getOffersForRequester(1, 1, 1, 1).then((res) =>
            console.log(res)
        );
    }

    return (
    <View style={styles.container}>
        <Text style={styles.title}>Waiting for Offers</Text>
        

        <TouchableOpacity style={styles.button} onPress={refresh}>
          <Text style={styles.buttonText}>Refresh</Text>
        </TouchableOpacity>


    </View>
  );
}
