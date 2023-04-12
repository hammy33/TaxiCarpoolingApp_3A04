import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Keyboard, TouchableWithoutFeedback } from 'react-native';
import styles from '../styles/styles';
import DataService from '../DataService';

export default function Register({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmission = () => {
    if (!name) {
        alert('Error: Your name is not filled in, please try again.');
        return;
    }
    if (!email || !email.includes('@') || !email.includes('.')) {
        alert('Error: Email Address not valid');
        return;
    }
    if (!password || password.length < 6 || !/\d/.test(password) || !/[a-zA-Z]/.test(password)) {
        alert('Password is not strong enough, must contain at least 6 characters and be composed of both numbers and letters');
        return;
    }
    const newProfile = {
      email: email,
      password: password,
      name: name,
      rating: 0,
      numRatings: 0,
      personality: {
          p1: 0,
          p2: 0,
          p3: 0,
          p4: 0,
          p5: 0,
      },
      rewards: [],
    }
    DataService.register(newProfile)
      .then((response) => {
        navigation.navigate('PersonalityTest');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Text style={styles.title}>Register</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Name"
            placeholderTextColor="#aaa"
            value={name}
            onChangeText={(text) => setName(text)}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email Address"
            placeholderTextColor="#aaa"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#aaa"
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSubmission}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}
