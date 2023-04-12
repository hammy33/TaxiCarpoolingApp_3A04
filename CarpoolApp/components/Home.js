import React from "react";
import { Text, View, Image, Button, TouchableOpacity } from "react-native";
import styles from "../styles/styles";

const HomeScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate("Profile")} style={{position: 'absolute', top: 30, right: 30, }}>
                <Image source={require('../assets/profile.png')} style={styles.profileImage}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Welcome")} style={{position: 'absolute', top: 30, left: 30, }}>
                <Image source={require('../assets/logout.png')} style={styles.profileImage}/>
            </TouchableOpacity>
            <Image source={require('../assets/TaxiMateApp.png')} style={styles.homeLogo} />
            <View style={styles.homeContainer}>
                <TouchableOpacity style={styles.homeButton} onPress={() => navigation.navigate("QRScanner")}>
                    <Text style={styles.homeButtonText}>Offer Carpool</Text>
                </TouchableOpacity>
                <Text> </Text>
                <TouchableOpacity style={styles.homeButton} onPress={() => navigation.navigate("Request")}>
                    <Text style={styles.homeButtonText}>Request Carpool</Text>
                </TouchableOpacity>
                <Text> </Text>
                <TouchableOpacity style={styles.homeButton} onPress={() => navigation.navigate("EndOfRide")}>
                    <Text style={styles.homeButtonText}>End Of Ride Test</Text>
                </TouchableOpacity>
                <Text> </Text>
            </View>
        </View>
    );
};

export default HomeScreen;
