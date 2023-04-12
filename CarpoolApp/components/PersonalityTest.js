import React, { useState } from 'react';
import { ScrollView, View, Text, TextInput, TouchableOpacity, StyleSheet, Keyboard, TouchableWithoutFeedback } from 'react-native';
import DataService from '../DataService';
import Slider from '@react-native-community/slider';

export default function PersonalityTest({ navigation }) {
  const [q1, setq1] = useState(0);
  const [q2, setq2] = useState(0);
  const [q3, setq3] = useState(0);
  const [q4, setq4] = useState(0);
  const [q5, setq5] = useState(0);

  const handleSubmission = () => {
    currentProfile = DataService.profile
    currentProfile.personalityTest = { q1, q2, q3, q4, q5 }
    DataService.updateAcc(currentProfile)
      .then((response) => {
        navigation.navigate('Home');
      })
      .catch((error) => {
        console.log(error);
      });
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
                    value={q1}
                    onValueChange={(value) => setq1(value)}
                />
                <Text style={styles.sliderValue}>{q1}</Text>
                </View>

                <View style={styles.questionContainer}>
                <Text style={styles.questionText}>How much do you like pizza?</Text>
                <Slider
                    style={styles.slider}
                    minimumValue={0}
                    maximumValue={5}
                    step={1}
                    value={q2}
                    onValueChange={(value) => setq2(value)}
                />
                <Text style={styles.sliderValue}>{q2}</Text>
                </View>

                <View style={styles.questionContainer}>
                <Text style={styles.questionText}>Do you like travelling on the holidays?</Text>
                <Slider
                    style={styles.slider}
                    minimumValue={0}
                    maximumValue={5}
                    step={1}
                    value={q3}
                    onValueChange={(value) => setq3(value)}
                />
                <Text style={styles.sliderValue}>{q3}</Text>
                </View>

                <View style={styles.questionContainer}>
                <Text style={styles.questionText}>How often do you take taxis?</Text>
                <Slider
                    style={styles.slider}
                    minimumValue={0}
                    maximumValue={5}
                    step={1}
                    value={q4}
                    onValueChange={(value) => setq4(value)}
                />
                <Text style={styles.sliderValue}>{q4}</Text>
                </View>

                <View style={styles.questionContainer}>
                <Text style={styles.questionText}>How many weekdays do you find yourself getting 1 hour of exercise?</Text>
                <Slider
                    style={styles.slider}
                    minimumValue={0}
                    maximumValue={5}
                    step={1}
                    value={q5}
                    onValueChange={(value) => setq5(value)}
                />
                <Text style={styles.sliderValue}>{q5}</Text>
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
        paddingHorizontal: 20,
        backgroundColor: '#444140',
        height: '100%',
        width: '100%',
        paddingBottom:'10%',
        paddingTop: '25%'
      },
      questionContainer: {
        marginVertical: 15,
      },
      questionText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#F7EBE8'
      },
      slider: {
        width: '100%',
        height: 40,
        color: '#FFF',
        thumbTintColor: '#FFF',
      },
      sliderValue: {
        fontSize: 18,
        alignSelf: 'flex-end',
        marginBottom: 10,
        color: '#FFF',
      },
      button: {
        backgroundColor: '#1E1E24',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        alignSelf: 'center',
        marginBottom: 20,
        minWidth: 200,
        borderWidth: 1,
        borderColor: '#FFF',
      },
      buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        alignSelf: 'center',
      },
});