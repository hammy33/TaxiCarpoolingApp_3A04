import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import styles from '../styles/styles';
import DataService from '../DataService';

export default function WaitingToAcceptOffer({ route, navigation }) {
    const { carInfo } = route.params;
    const [requestInfo, setRequestInfo] = useState(null);

    useEffect(() => {
        const interval = setInterval(() => {
            DataService.getRequestsForOfferer(DataService.profile.email)
                .then(requests => {
                    const request = requests.find(req => req.email === DataService.profile.email);
                    if (request) {
                        DataService.getAccount(request.email)
                            .then(account => {
                                setRequestInfo({
                                    name: account.name,
                                    personalityTestResults: account.personalityTestResults,
                                });
                            });
                    }
                });
        },);

        return () => clearInterval(interval);
    }, []);

    const handleAccept = () => {
        // Navigate to map screen
        navigation.navigate('Map');
    }

    const handleReject = () => {
        // Clear request info and stay on the same screen
        setRequestInfo(null);
    }

    return (
        <View style={styles.container}>
            {requestInfo ? (
                <>
                    <Text style={styles.waitTitle}>New Carpool Request!</Text>
                    <View style={{ marginVertical: 40 }}>
                        <Text style={styles.waitText}>Name: {requestInfo.name}</Text>
                        <Text style={styles.waitText}>Personality Test Results: {requestInfo.personalityTestResults}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Button title="Reject" onPress={handleReject} />
                        <View style={{ width: 20 }} />
                        <Button title="Accept" onPress={handleAccept} />
                    </View>
                </>
            ) : (
                <>
                    <Text style={styles.waitTitle}>Waiting for Carpool Requests!</Text>
                    <View style={{ marginVertical: 40 }}>
                        <Text style={styles.waitText}>Driver's Name: {carInfo.name}</Text>
                        <Text style={styles.waitText}>Car Model: {carInfo.model}</Text>
                        <Text style={styles.waitText}>Color: {carInfo.color}</Text>    
                    </View>
                </>
            )}
        </View>
  );
}




