import React, { useState, useEffect } from "react";
import {
    Text,
    View,
    Image,
    Button,
    TouchableOpacity,
    ImageBackground,
} from "react-native";
import styles from "../styles/styles";
import DataService from "../DataService";

let active = true;
const MapScreen = ({ navigation }) => {
    const [startPoint, setStartPoint] = useState({ long: 0, lat: 0 });
    const [destination, setDestination] = useState({ long: 0, lat: 0 });

    const handleEnd = () => {
        console.log("here22");

        DataService.endCarpool(DataService.profile.email)
            .then((res) => {
                active = false;
                navigation.navigate("Home");
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        const interval = setInterval(() => {
            if (active) {
                DataService.getCarpool(DataService.profile.email)
                    .then((res) => {
                        console.log(res);
                        setStartPoint(res.startCord);
                        setDestination(res.endCord);
                        if (res.active === false) {
                            active = false;
                            navigation.navigate("Home");
                        }
                    })
                    .catch((err) => {
                        active = false;
                        navigation.navigate("Home");
                        console.log(err);
                    });
            } else {
                navigation.navigate("Home");
            }
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <View>
            <ImageBackground
                source={require("../assets/map.png")}
                style={{ width: "100%", height: "100%" }}
            >
                <View style={{ left: 300, top: 200 }}>
                    <Image
                        source={require("../assets/pin.webp")}
                        style={{ width: 20, height: 27 }}
                    />
                    <Text>
                        {startPoint.long}, {startPoint.lat}
                    </Text>
                </View>
                <View style={{ left: 80, top: 550 }}>
                    <Image
                        source={require("../assets/pin.webp")}
                        style={{ width: 20, height: 27 }}
                    />
                    <Text>
                        {destination.long}, {destination.lat}
                    </Text>
                </View>
                <TouchableOpacity
                    style={{ ...styles.button, top: "80%" }}
                    onPress={handleEnd}
                >
                    <Text style={styles.buttonText}>End Ride</Text>
                </TouchableOpacity>
            </ImageBackground>
        </View>
    );
};

export default MapScreen;
