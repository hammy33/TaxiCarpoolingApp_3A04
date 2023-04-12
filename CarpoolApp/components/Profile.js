import React from "react";
import styles from "../styles/styles";
import {Text, View, Alert, TextInput, TouchableOpacity, Image, Modal} from "react-native";
import DataService from '../DataService';

const Profile = ({ navigation }) => {
    // DataService.getAccount(customerEmail).then((account) => {account}).catch((error) => {console.log("Cannot retrieve account")});
    account = DataService.profile
    const [name, setName] = React.useState(account.name);
    const [email, setEmail] = React.useState(account.email);
    const [password, setPassword] = React.useState(account.password);
    const rating = account.rating;
    const rewards = account.rewards;

    const [isVisible, setIsVisible] = React.useState(false);
    const toggleModal = () => { setIsVisible(!isVisible);};

    const handleDeleteAccount = () => {
        DataService.deleteAcc(account.email)
        .then(response => {
            console.log("Account deleted successfully", response);
        })
        .catch(error => {
            console.error("Failed to delete account", error);
        });
        navigation.navigate('Welcome');
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
                onPress: () => handleDeleteAccount,
            },
        ]);
    };

    const handleSave = () => {
        // const updatedAccount = {
        //     name: name,
        //     email: email,
        //     password: password,
        // }

        account.name = name
        account.email = email
        account.password = password

        DataService.updateAcc(account)
        .then(response => {
            console.log("Account updated successfully", response);
            Alert.alert('Save Successful', [
                {
                    text: 'OK',
                    style: 'OK',
                },
            ]);
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
            <View>
                <TouchableOpacity style={styles.button} onPress={toggleModal}>
                    <Text style={styles.buttonText}>View</Text>
                </TouchableOpacity>
                <Modal
                visible={isVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={toggleModal}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ backgroundColor: 'white', padding: 20 }}>
                            <Text style={{fontWeight: 'bold', fontSize: 18,}}>Rewards</Text>
                            <Text>{rewards}</Text>
                            <TouchableOpacity onPress={toggleModal}>
                                <Text style={{alignSelf: 'center', top: 5, fontWeight: 'bold'}}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>

            <TouchableOpacity style={{backgroundColor: '#1E1E24', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 5, marginBottom: 20, minWidth: 350,borderWidth: 1, borderColor: '#FFF',}} onPress={handleSave}>
                <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.profilebutton} onPress={confirmDelete}>
                <Text style={{color: '#E54B4B', fontSize: 18, fontWeight: 'bold', alignSelf: 'center',}}>Delete Account</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Profile;