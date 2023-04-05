import React from "react";
import styles from "../styles/styles";
import { Text, View, Button } from "react-native";

const HomeScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.bodyText}>
                Here is just a placeholder navigation so that we can go to every
                page
            </Text>
            <Button
                title="Offer Carpool"
                onPress={() => navigation.navigate("OfferCarpool")}
            />
            <Button
                title="Request Carpool"
                onPress={() => navigation.navigate("OfferCarpool")}
            />
        </View>
    );
};

export default HomeScreen;
