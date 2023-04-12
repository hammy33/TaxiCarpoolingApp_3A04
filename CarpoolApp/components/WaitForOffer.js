import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Keyboard, TouchableWithoutFeedback } from 'react-native';
import styles from '../styles/styles';
import DataService from '../DataService';


export default function WaitForOffer({ navigation }) {

    const refresh = () => {
        console.log('this worked')
        DataService.getOffersForRequester(1, 1, 1, 1).then((res) =>
            {if (res != null){
                console.log(res)
            }
            }
        );

        DataService.getCarpool('1', '1').then((res) => 
            console.out(res)
        );
        navigation.navigate('Waiting')
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
