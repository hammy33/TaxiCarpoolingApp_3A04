import React, { useState } from 'react';
import { Alert, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import styles from '../styles/styles';
import DataService from '../DataService';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmission = () => {
    DataService.login(email, password)
      .then(token => {
        navigation.navigate('Home');
      })
      .catch(error => {
        Alert.alert('Error', 'Incorrect email/password combination. Please try again.', [
          { text: 'OK', onPress: () => {} }
        ]);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
        <View style={[styles.inputContainer, { flex: 1 }]}>
          <TextInput
            style={[styles.input, { flex: 1 }]}
            multiline={true} 
            placeholder="Email"
            placeholderTextColor="#aaaaaa"
            onChangeText={(text) => setEmail(text)}
            value={email}
            autoCapitalize="none"
            autoCompleteType="email"
            keyboardType="email-address"
          />
        </View>
        
        <View style={[styles.inputContainer, { flex: 1 }]}>
          <TextInput
            style={[styles.input, { flex: 1 }]}
            multiline={true} 
            placeholder="Password"
            placeholderTextColor="#aaaaaa"
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry={true}
          />
        </View>
      <TouchableOpacity style={styles.button} onPress={handleSubmission}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}
