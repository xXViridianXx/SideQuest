import React, { useEffect, useState } from 'react'
import { SafeAreaView, View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { Dimensions } from 'react-native';
import Item from '../components/Post'
import { sampleHealthData } from '../Data/sampleHealthData'
import { NapAlgorithm, getEventsForCurrentDay } from '../components/NapAlgorithm';
import NoSideQuests from '../components/NoSideQuests';
import * as Calendar from 'expo-calendar';
import { getAuth, signOut } from 'firebase/auth';
import HealthKit from '../components/HealthKit'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { getWeatherInfo, getLocalTime } from '../components/Helpers';

const width = Dimensions.get('window').width;

const logout = async () => {
    console.log('logging out')
    await signOut(getAuth())
    // await AsyncStorage.setItem('logged_sleep', 'false')
    // console.log("set to false")
}

function formatTime(date) {
    const formattedTime = new Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
        timeZone: 'America/Los_Angeles'
    }).format(date);
    // 
    return formattedTime
}
const accessItemList = async () => {
    try {
        const value = await AsyncStorage.getItem('selectedItems');
        console.log("value itself: ", value);
        return value;
    } catch (error) {
        console.log('Error getting selected items');
        return [];
    }
}

const accessActivityList = async () => {
    try {
        const activities = await AsyncStorage.getItem('itemList');
        return activities;
    } catch (error) {
        console.log('Error getting activity list');
        return [];
    }
}
export default function Home({ route }) {

    // var activityRec = "Go Workout" // update this with actual workout
    // var activityRec = ["Go Workout", "Walk", "Meditate"]

    // if (route.params?.items) {
    //     activityRec = [route.params?.items[0]];
    // }
    // get the async data for selectedItems

    const [activityRec, setActivityRec] = useState([]);
    const [userLogs, setUserLogs] = useState(null);
    // const [activityLogs, setActivityLogs] = useState(null);
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [selectedItems, setSelectedItems] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await accessItemList();
                const newItems = result ? JSON.parse(result) : [];
                console.log("activityRec hererere: ", newItems);
                setActivityRec(newItems);
                console.log("newItems: ", newItems);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                var result = await accessActivityList();
                result = JSON.parse(result);
                let first = result[0];
                let second = result[1];
                let third = result[2];
                let firstSecondThird = [first, second, third];
                let activityList = firstSecondThird.map(obj => obj.name + " " + obj.indScore.toString());

                const newItems = activityList ? activityList : [];
                setActivityRec(newItems);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [activityRec]);



    console.log("activityRec after useeffect() : ", activityRec);

    const items = route.params?.items || [];
    // console.log("items in home page: ", items);

    useEffect(() => {
        (async () => {
            let { status } = await Calendar.requestCalendarPermissionsAsync();
            if (status === 'granted') {
                const events = await getEventsForCurrentDay();
                availableTimeSlots = NapAlgorithm({ events })
                setStartTime(formatTime(availableTimeSlots.startTime))
                setEndTime(formatTime(availableTimeSlots.endTime))
            }

        })();

        let { sleepData, activityData } = HealthKit()

        // await AsyncStorage.setItem('sleepData', JSON.stringify(sleepData))
        setUserLogs(sleepData)
        // setActivityLogs(activityData)


        // console.log("Available Nap Slots: ", (new Date(availableTimeSlots['endTime'])))
        console.log("User Logs: ", userLogs)
        // console.log("Activity Data: ", activityLogs)
        // console.log("Activity Data: ", sampleHealthData)
    }, []);
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <View>
                    <Text style={{ fontSize: 40 }}>Siesta</Text>
                </View>
                <View>
                    <TouchableOpacity onPress={logout}>
                        <Text>Logout</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={getWeatherInfo}>
                        <Text>Test Weather</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={getLocalTime}>
                        <Text>Test Time</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.body}>
                <View style={styles.activity}>
                    <Text style={{ fontSize: 30, paddingBottom: 10 }}>Top Activity for the Day</Text>
                    {activityRec.map((activity, index) => (
                        <Text key={index} style={styles.activityRec}>{activity}</Text>
                    ))}
                </View>

                <View style={styles.nap}>
                    <Text style={{ fontSize: 30, paddingBottom: 10 }}>Recommended Nap Time</Text>
                    <Text style={styles.napRec}>{startTime} - {endTime}</Text>
                </View>

                <View style={styles.sleepLogs}>
                    <FlatList
                        style={{ height: '50%' }}
                        data={userLogs}
                        ListEmptyComponent={NoSideQuests}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item }) => <Item post={item} />}
                        keyExtractor={item => item.id}
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#FFF'
    },
    header: {
        width: width,
        borderBottomWidth: 1,
        alignItems: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 10,
        paddingRight: 10,
    },
    body: {
        display: 'flex',
        flex: 1,
        width: width,
    },
    activity: {
        alignItems: 'center',
        borderBottomWidth: 1,
        paddingTop: 25,
        paddingBottom: 25,
    },
    activityRec: {
        borderWidth: 1,
        borderRadius: 5,
        fontSize: 30,
        padding: (5, 5, 5, 5)
    },
    nap: {
        alignItems: 'center',
        borderBottomWidth: 1,
        paddingTop: 25,
        paddingBottom: 25,
    },
    napRec: {
        borderWidth: 1,
        borderRadius: 5,
        fontSize: 30,
        padding: (5, 5, 5, 5),
    },
    sleepLogs: {
        alignItems: 'center',
        borderBottomWidth: 1,
        paddingTop: 25,
        paddingBottom: 25,
    },

})