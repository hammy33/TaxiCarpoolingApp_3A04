import React from "react";
import styles from "../styles/styles";
import {Text, View, Alert, TextInput, TouchableOpacity, Image} from "react-native";
import DataService from '../DataService';

const Profile = ({ navigation }) => {
    let customerEmail = "" 
    
    DataService.getAccount(customerEmail).then((account) => {account}).catch((error) => {console.log("Cannot retrieve account")});

    const [name, setName] = React.useState(account.name);
    const [email, setEmail] = React.useState(account.email);
    const [password, setPassword] = React.useState(account.password);
    const rating = account.rating;
    const rewards = account.rewards;

    const handleDeleteAccount = () => {
        DataService.deleteAcc(account.email)
        .then(response => {
            console.log("Account deleted successfully", response);
        })
        .catch(error => {
            console.error("Failed to delete account", error);
        });
        navigation.navigate('Home');
    };

    const confirmDelete = () => {
        Alert.alert('Confirmation', 'You cannot go back!', [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {
                text: 'OK',
                onPress: () => handleDeleteAccount
            },
        ]);
    };

    const handleRewards = () => {
        Alert.alert('Rewards', rewards, [
            {
                text: 'OK',
                style: 'OK',
            },
        ]);
    };

    const handleSave = () => {
        const updatedAccount = {
            name: name,
            email: email,
            password: password,
        }

        DataService.updateAcc(updatedAccount)
        .then(response => {
            console.log("Account updated successfully", response);
        })
        .catch(error => {
            console.error("Account update failed", error);
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Profile</Text>
            <Image
                style={{width: 100,
                        height: 100,
                        borderRadius: 100/ 2,
                        alignSelf: 'center',
                        bottom: 10,}}
                source={require('../assets/profile.png')}/>
                
            <View style={{flexDirection: 'row', justifyContent: 'center', paddingHorizontal: 10, bottom: 5}}>
                <View style={{alignItems: 'center' }}>
                    <Text style={{color: '#F7EBE8', fontWeight: 'bold'}}>Rating</Text>
                    <Text style={{color: '#F7EBE8', fontSize: 20,}}>{rating}</Text>
                </View>
                
            </View>

            <View style={styles.profileinput}>
                <TextInput
                    style={styles.input}
                    placeholder="Name"
                    onChangeText={setName}
                    value={name}
                />
            </View>

            <View style={styles.profileinput}>
                <TextInput
                    style={styles.input}
                    placeholder="Phone Number"
                    onChangeText={setNumber}
                    value={number}
                    keyboardType="numeric"
                />
            </View>

            <View style={styles.profileinput}>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    onChangeText={setEmail}
                    value={email}
                />
            </View>

            <View style={styles.profileinput}>
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    onChangeText={setPassword}
                    value={password}
                    //secureTextEntry
                />
            </View>

            <Text style={styles.profiletext}>Personality Test</Text>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("PersonalityTest")}>
                <Text style={styles.buttonText}>Edit</Text>
            </TouchableOpacity>

            <Text style={styles.profiletext}>Rewards</Text>
            <TouchableOpacity style={styles.button} onPress={handleRewards}>
                <Text style={styles.buttonText}>View</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{backgroundColor: '#1E1E24', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 5, marginBottom: 20, minWidth: 200,borderWidth: 1, borderColor: '#FFF',}} onPress={handleSave}>
                <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.profilebutton} onPress={confirmDelete}>
                <Text style={{color: '#E54B4B', fontSize: 18, fontWeight: 'bold', alignSelf: 'center',}}>Delete Account</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Profile;