import React, { useState } from "react";
import {
    ScrollView,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Keyboard,
    TouchableWithoutFeedback,
} from "react-native";
import DataService from "../DataService";
import Slider from "@react-native-community/slider";

export default function PersonalityTest({ navigation }) {
    const [p1, setp1] = useState(DataService.profile.personality.p1);
    const [p2, setp2] = useState(DataService.profile.personality.p2);
    const [p3, setp3] = useState(DataService.profile.personality.p3);
    const [p4, setp4] = useState(DataService.profile.personality.p4);
    const [p5, setp5] = useState(DataService.profile.personality.p5);

    const handleSubmission = () => {
        currentProfile = DataService.profile;
        currentProfile.personality = { p1, p2, p3, p4, p5 };
        DataService.updateAcc(currentProfile)
            .then((response) => {
                navigation.navigate("Home");
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <ScrollView>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={styles.container}>
                    <View style={styles.questionContainer}>
                        <Text style={styles.questionText}>
                            How much do you like music in a ride?
                        </Text>
                        <Slider
                            style={styles.slider}
                            minimumValue={0}
                            maximumValue={5}
                            step={1}
                            value={p1}
                            onValueChange={(value) => setp1(value)}
                        />
                        <Text style={styles.sliderValue}>{p1}</Text>
                    </View>

                    <View style={styles.questionContainer}>
                        <Text style={styles.questionText}>
                            How much do you like pizza?
                        </Text>
                        <Slider
                            style={styles.slider}
                            minimumValue={0}
                            maximumValue={5}
                            step={1}
                            value={p2}
                            onValueChange={(value) => setp2(value)}
                        />
                        <Text style={styles.sliderValue}>{p2}</Text>
                    </View>

                    <View style={styles.questionContainer}>
                        <Text style={styles.questionText}>
                            Do you like travelling on the holidays?
                        </Text>
                        <Slider
                            style={styles.slider}
                            minimumValue={0}
                            maximumValue={5}
                            step={1}
                            value={p3}
                            onValueChange={(value) => setp3(value)}
                        />
                        <Text style={styles.sliderValue}>{p3}</Text>
                    </View>

                    <View style={styles.questionContainer}>
                        <Text style={styles.questionText}>
                            How often do you take taxis?
                        </Text>
                        <Slider
                            style={styles.slider}
                            minimumValue={0}
                            maximumValue={5}
                            step={1}
                            value={p4}
                            onValueChange={(value) => setp4(value)}
                        />
                        <Text style={styles.sliderValue}>{p4}</Text>
                    </View>

                    <View style={styles.questionContainer}>
                        <Text style={styles.questionText}>
                            How many weekdays do you find yourself getting 1
                            hour of exercise?
                        </Text>
                        <Slider
                            style={styles.slider}
                            minimumValue={0}
                            maximumValue={5}
                            step={1}
                            value={p5}
                            onValueChange={(value) => setp5(value)}
                        />
                        <Text style={styles.sliderValue}>{p5}</Text>
                    </View>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleSubmission}
                    >
                        <Text style={styles.buttonText}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </TouchableWithoutFeedback>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: "#444140",
        height: "100%",
        width: "100%",
        paddingBottom: "10%",
        paddingTop: "25%",
    },
    questionContainer: {
        marginVertical: 15,
    },
    questionText: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
        color: "#F7EBE8",
    },
    slider: {
        width: "100%",
        height: 40,
        color: "#FFF",
        thumbTintColor: "#FFF",
    },
    sliderValue: {
        fontSize: 18,
        alignSelf: "flex-end",
        marginBottom: 10,
        color: "#FFF",
    },
    button: {
        backgroundColor: "#1E1E24",
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        alignSelf: "center",
        marginBottom: 20,
        minWidth: 200,
        borderWidth: 1,
        borderColor: "#FFF",
    },
    buttonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
        alignSelf: "center",
    },
});
