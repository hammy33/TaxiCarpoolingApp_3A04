import React from "react";
import styles from "../styles/styles";
import {Text, View, Button, TextInput, TouchableOpacity, Image} from "react-native";

const Profile = ({ navigation }) => {
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [number, setNumber] = React.useState('');

    const handleDeleteAccount = () => {
        navigation.navigate('Home');
    };

    const handleSave = () => {
        navigation.navigate('Home');
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
                source={require('../assets/profilepicture.png')}/>

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
                    placeholder="Email"
                    onChangeText={setEmail}
                    value={email}
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

            <Text style={styles.profiletext}>Personality Test</Text>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("PersonalityTest")}>
                <Text style={styles.buttonText}>Edit</Text>
            </TouchableOpacity>

            <Text style={styles.profiletext}>Rewards</Text>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Home")}>
                <Text style={styles.buttonText}>View</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{backgroundColor: '#1E1E24', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 5, marginBottom: 20, minWidth: 200,}} onPress={handleDeleteAccount}>
                <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.profilebutton} onPress={handleDeleteAccount}>
                <Text style={{color: '#ff0000', fontSize: 18, fontWeight: 'bold', alignSelf: 'center',}}>Delete Account</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Profile;