import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import styles from '../styles/styles';

export default function OfferCarpool({ navigation }) {
  const [startPoint, setStartPoint] = useState('');
  const [destination, setDestination] = useState('');
  const [seats, setSeats] = useState('');

  const handleRequest = () => {
    // TODO: Handle ride request based on input values
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleSeatsChange = (value) => {
    // Only allow integer values for number of available seats
    if (value === '' || /^[0-9]+$/.test(value)) {
      setSeats(value);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Request a Ride</Text>

      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>Starting Point:</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={startPoint}
            onChangeText={setStartPoint}
          />
        </View>
      </View>

      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>Destination:</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={destination}
            onChangeText={setDestination}
          />
        </View>
      </View>

      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>Number of Available Seats:</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={seats}
            onChangeText={handleSeatsChange}
            keyboardType="numeric"
          />
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleRequest}>
        <Text style={styles.buttonText}>Request Ride</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleGoBack}>
        <Text style={styles.buttonText}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
}