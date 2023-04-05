import React, { useState } from 'react';
import { ScrollView, View, Text, TextInput, TouchableOpacity, StyleSheet, Keyboard, TouchableWithoutFeedback } from 'react-native';

import Slider from '@react-native-community/slider';

export default function PersonalityTest({ navigation }) {
  const [musicValue, setMusicValue] = useState(0);
  const [pizzaValue, setPizzaValue] = useState(0);
  const [travelValue, setTravelValue] = useState(0);
  const [taxiValue, setTaxiValue] = useState(0);
  const [sampleValue, setSampleValue] = useState(0);

  const handleSubmission = () => {
    console.log(`Music value: ${musicValue}`);
    console.log(`Pizza value: ${pizzaValue}`);
    console.log(`Travel value: ${travelValue}`);
    console.log(`Taxi value: ${taxiValue}`);
    console.log(`Sample value: ${sampleValue}`);
    navigation.navigate('Home'); // Navigation call
  };

  return (
    <ScrollView>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.container}>
                <View style={styles.questionContainer}>
                <Text style={styles.questionText}>How much do you like music in a ride?</Text>
                <Slider
                    style={styles.slider}
                    minimumValue={0}
                    maximumValue={5}
                    step={1}
                    value={musicValue}
                    onValueChange={(value) => setMusicValue(value)}
                />
                <Text style={styles.sliderValue}>{musicValue}</Text>
                </View>

                <View style={styles.questionContainer}>
                <Text style={styles.questionText}>How much do you like pizza?</Text>
                <Slider
                    style={styles.slider}
                    minimumValue={0}
                    maximumValue={5}
                    step={1}
                    value={pizzaValue}
                    onValueChange={(value) => setPizzaValue(value)}
                />
                <Text style={styles.sliderValue}>{pizzaValue}</Text>
                </View>

                <View style={styles.questionContainer}>
                <Text style={styles.questionText}>Do you like travelling on the holidays?</Text>
                <Slider
                    style={styles.slider}
                    minimumValue={0}
                    maximumValue={5}
                    step={1}
                    value={travelValue}
                    onValueChange={(value) => setTravelValue(value)}
                />
                <Text style={styles.sliderValue}>{travelValue}</Text>
                </View>

                <View style={styles.questionContainer}>
                <Text style={styles.questionText}>How often do you take taxis?</Text>
                <Slider
                    style={styles.slider}
                    minimumValue={0}
                    maximumValue={5}
                    step={1}
                    value={taxiValue}
                    onValueChange={(value) => setTaxiValue(value)}
                />
                <Text style={styles.sliderValue}>{taxiValue}</Text>
                </View>

                <View style={styles.questionContainer}>
                <Text style={styles.questionText}>Sample question?</Text>
                <Slider
                    style={styles.slider}
                    minimumValue={0}
                    maximumValue={5}
                    step={1}
                    value={sampleValue}
                    onValueChange={(value) => setSampleValue(value)}
                />
                <Text style={styles.sliderValue}>{sampleValue}</Text>
                </View>

                <TouchableOpacity style={styles.button} onPress={handleSubmission}>
                <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
            </View>
        </TouchableWithoutFeedback>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: 'center',
      paddingHorizontal: 20,
    },
    questionContainer: {
      marginVertical: 20,
    },
    questionText: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    slider: {
      width: '100%',
      height: 40,
    },
    sliderValue: {
      fontSize: 18,
      alignSelf: 'flex-end',
      marginBottom: 10,
    },
    button: {
      backgroundColor: '#4287f5',
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 5,
      alignSelf: 'center',
      marginBottom: 40,
    },
    buttonText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
    },
});
  