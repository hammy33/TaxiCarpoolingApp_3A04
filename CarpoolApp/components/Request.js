import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import styles from '../styles/styles';
import LocationIQ from 'react-native-locationiq';
import DataService from '../DataService';


export default function OfferCarpool({ navigation }) {

  const [startPoint, setStartPoint] = useState('');
  const [destination, setDestination] = useState('');

  LocationIQ.init("dec43a4fbe212b");
  
  const handleRequest = () => {
    console.log("handling request")
    LocationIQ.search(startPoint).then(
      startResponse => {
        const startCordLong = Number(startResponse[0].lon);
        const startCordLat = Number(startResponse[0].lat);
  
        // Convert destination to coordinates
        LocationIQ.search(destination).then(
          destResponse => {
            const endCordLong = Number(destResponse[0].lon);
            const endCordLat = Number(destResponse[0].lat);
  
            // Call addOffer function with coordinates
            DataService.getOffersForRequester(startCordLong, startCordLat, endCordLong, endCordLat).then(response => {
              console.log(response[0]["offerer"]);
              DataService.addRequest(response[0]["offerer"], DataService.profile.email) 
            }).catch(error => {
              console.error(error);
            });
          },
          destError => {
            console.error(destError);
          }
        );
      },
      startError => {
        console.error(startError);
      }
    );
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
      <Text style={styles.title}>Offer a Ride</Text>

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

      <TouchableOpacity style={styles.button} onPress={handleRequest}>
        <Text style={styles.buttonText}>Request Ride</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleGoBack}>
        <Text style={styles.buttonText}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
}
