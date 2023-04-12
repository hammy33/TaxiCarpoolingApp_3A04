import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import styles from '../styles/styles';
import DataService from '../DataService';

export default function EndOfRide({ navigation }) {

    const handleSubmission = () => {
      // Calculates new rating for the other pooler
      if(starRating != undefined) {
        // Gets carpool
        let carpool
        DataService.getCarpool(DataService.profile.email).then((res) =>
          carpool = res
        )
        console.log(carpool)
        let poolerEmail = "";
        // Chooses correct carpooler
        if(carpool != undefined) {
          if(carpool.carpoolers[0] == DataService.profile.email) {
            poolerEmail = carpool.carpooler[1]
          } else {
            poolerEmail = carpool.carpooler[0]
          }
          let acc = null
          DataService.getAccount(poolerEmail).then((res) =>
            acc = res
          )
          console.log(acc.rating)
          if(!Number.isInteger(acc.rating) || !Number.isInteger(acc.numRating)) {
            acc.rating = starRating
            acc.numRating = 0
          } else {
            acc.rating = (acc.rating * acc.numRatings + starRating) / (acc.numRatings + 1)
            acc.numRating += 1
          }
          DataService.updateAcc(acc)
          console.log("Rating: " + DataService.getAccount(poolerEmail).rating + " Rating count: " + DataService.getAccount(poolerEmail).numRating)
        }
      }
      navigation.navigate('Home'); // Navigation call
    };

    const rollRewards = () => {
      if(isClosed) {
        console.log("Rewards rolled")
        setClosed(false)
        let randomReward = Math.floor(Math.random() * 10) + 1
        setReward(randomReward)
        let clientProfile = DataService.profile
        console.log(randomReward)
        clientProfile.rewards.push(randomReward)
        DataService.updateAcc(clientProfile)
        console.log(DataService.profile.rewards)
      }
    }

    const [reward, setReward] = useState(null);
    const [starRating, setStarRating] = useState(starRating);
    const [isClosed, setClosed] = useState(true);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.heading}>Your fare is: </Text>
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
            <Text style={styles.homeButtonText}>{reward ? `You've earned ${reward}% off your next trip!` : 'Tap to open'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.homeButton} onPress={handleSubmission}>
            <Text style={styles.homeButtonText}>Go back to Home</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
    
}