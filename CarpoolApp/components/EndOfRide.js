import React, { useState } from 'react';
import { ScrollView, View, Text, TextInput, TouchableOpacity, StyleSheet, Keyboard, TouchableWithoutFeedback, SafeAreaView, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import styles from '../styles/styles';

export default function EndOfRide({ navigation }) {

    const handleSubmission = () => {
        navigation.navigate('Home'); // Navigation call
    };

    const rollRewards = () => {
      if(isClosed) {
        console.log("Rewards rolled")
        setClosed(false)
        setReward(Math.floor(Math.random() * 10) + 1)
      }
    }

    const [reward, setReward] = useState(0);
    const [starRating, setStarRating] = useState(null);
    const [isClosed, setClosed] = useState(true);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.heading}>{starRating ? `${starRating}*` : 'Tap to rate'}</Text>
        <View style={styles.stars}>
          <TouchableOpacity onPress={() => setStarRating(1)}>
            <MaterialIcons
              name={starRating >= 1 ? 'star' : 'star-border'}
              size={32}
              style={starRating >= 1 ? styles.starSelected : styles.starUnselected}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setStarRating(2)}>
            <MaterialIcons
              name={starRating >= 2 ? 'star' : 'star-border'}
              size={32}
              style={starRating >= 2 ? styles.starSelected : styles.starUnselected}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setStarRating(3)}>
            <MaterialIcons
              name={starRating >= 3 ? 'star' : 'star-border'}
              size={32}
              style={starRating >= 3 ? styles.starSelected : styles.starUnselected}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setStarRating(4)}>
            <MaterialIcons
              name={starRating >= 4 ? 'star' : 'star-border'}
              size={32}
              style={starRating >= 4 ? styles.starSelected : styles.starUnselected}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setStarRating(5)}>
            <MaterialIcons
              name={starRating >= 5 ? 'star' : 'star-border'}
              size={32}
              style={starRating >= 5 ? styles.starSelected : styles.starUnselected}
            />
          </TouchableOpacity>
        </View>
        <Image source={isClosed ? require('../assets/closed.png') : require('../assets/open.png')} style={styles.chest} />
        <TouchableOpacity style={styles.homeButton} onPress={rollRewards}>
            <Text style={styles.homeButtonText}>Get Reward</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.homeButton} onPress={() => navigation.navigate("Home")}>
            <Text style={styles.homeButtonText}>Go back to Home</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
    
}