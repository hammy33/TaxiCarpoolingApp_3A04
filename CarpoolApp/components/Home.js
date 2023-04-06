import React from "react";
import { Text, View, Button, TouchableOpacity } from "react-native";
import styles from "../styles/styles";

const HomeScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("OfferCarpool")}>
                <Text style={styles.buttonText}>Offer Carpool</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("OfferCarpool")}>
                <Text style={styles.buttonText}>Request Carpool</Text>
            </TouchableOpacity>
        </View>
    );
};

export default HomeScreen;
