import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Keyboard, TouchableWithoutFeedback } from 'react-native';
import styles from '../styles/styles';
import DataService from '../DataService';

export default function Request({ navigation }) {
  const [start, setStart] = useState('');
  const [destination, setDestination] = useState('');
  const [email, setEmail] = useState('');


  const handleSubmission = () => {
    // Do something with the user's input, e.g. send it to a server
    // and navigate to another screen
    console.log(`Starting point: ${start}`);
    console.log(`Destination: ${destination}`);


    DataService.addOffer(email, 1, 1, 1, 1)

    // Navigate to the Personality Test screen
    navigation.navigate('Waiting');
    return;
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Text style={styles.title}>Request a carpool</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            placeholderTextColor="#aaa"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Starting point"
            placeholderTextColor="#aaa"
            value={start}
            onChangeText={(text) => setStart(text)}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Destination"
            placeholderTextColor="#aaa"
            value={destination}
            onChangeText={(text) => setDestination(text)}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSubmission}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>

      </View>
    </TouchableWithoutFeedback>
  );
}
