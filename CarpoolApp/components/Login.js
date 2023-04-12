import React, { useState } from 'react';
import { Alert, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
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
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setEmail(text)}
          value={email}
          autoCapitalize="none"
          autoCompleteType="email"
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#444140'
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    alignSelf: 'center',
    color: '#F7EBE8',
  },
  inputContainer: {
    marginBottom: 30,
  },
  input: {
    width: 250,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 10,
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