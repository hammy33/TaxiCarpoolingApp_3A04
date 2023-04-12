import React, { useState, useEffect } from 'react';
import { Text, View, Button, StyleSheet, Linking, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner'
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles';
import { TouchableOpacity } from 'react-native-gesture-handler';


export default function QRScanner({ navigation }) {

    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        try {
          const carInfo = JSON.parse(data);
          if (carInfo.approved_by_taxiMate === true) {
            const { name, model, color } = carInfo;
            Alert.alert(
              'Taxi Details',
              `Taxi ID: ${carInfo.id}\nCar Model: ${model}\nDriver's Name: ${name}\nColor: ${color}`,
              [
                {
                  text: 'Cancel',
                  onPress: () => setScanned(false),
                  style: 'cancel',
                },
                {
                  text: 'Confirm',
                  onPress: () => navigation.navigate('OfferCarpool', { carInfo: carInfo }),
                },
              ],
              { cancelable: false }
            );
          } else {
            Alert.alert(
              'Not Recognized',
              'This is not a TaxiMate recognized QR Code, please try again',
              [
                {
                  text: 'OK',
                  onPress: () => setScanned(false),
                  style: 'cancel',
                },
              ],
              { cancelable: false }
            );
          }
        } catch (error) {
          console.log(error);
          Alert.alert(
            'Error',
            'There was an error scanning the QR code, please try again',
            [
              {
                text: 'OK',
                onPress: () => setScanned(false),
                style: 'cancel',
              },
            ],
            { cancelable: false }
          );
        }
      };
    
    const handleGoBack = () => {
        navigation.goBack();
    };

    if (hasPermission === null) {
        return <Text>Requesting for Camera Permission</Text>
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>
    }
    return (
        <View style={styles.container}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handleGoBack} style={styles.goBackButton}>
                <Ionicons name="ios-arrow-back" size={24} color="white" />
            </TouchableOpacity>
          </View>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
          />
        </View>
      );
}
