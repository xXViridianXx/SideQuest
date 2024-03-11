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
import * as Location from 'expo-location'

// 
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
export default function Home({ route, navigation }) {

    // var activityRec = "Go Workout" // update this with actual workout
    // var activityRec = ["Go Workout", "Walk", "Meditate"]

    // if (route.params?.items) {
    //     activityRec = [route.params?.items[0]];
    // }
    // get the async data for selectedItems

    const params = route.params
    const [activityRec, setActivityRec] = useState([]);
    const [userLogs, setUserLogs] = useState([]);
    // const [activityLogs, setActivityLogs] = useState(null);
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [selectedItems, setSelectedItems] = useState([]);
    const [forceUpdate, setForceUpdate] = useState(false);

    // handleing user log screen stuff (complicated ask vedaant to explain...)
    useEffect(() => {
        console.log('Home:', params)

        if (params && params.index > 0) {
            const {sleepData} = HealthKit()
            navigation.navigate('UserLogs', {userLogs: sleepData, index: params.index + 1})
        }
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await accessItemList();
                const newItems = result ? JSON.parse(result) : [];
                setActivityRec(newItems);
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
                let activityList = firstSecondThird.map(obj => obj.name ); // for testing: + " " + obj.indScore.toString()

                const newItems = activityList ? activityList : [];
                setActivityRec(newItems);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [activityRec]);

    useEffect(() => {
        const fetchData = async () => {
            let { status } = await Calendar.requestCalendarPermissionsAsync();
            if (status === 'granted') {
                const events = await getEventsForCurrentDay();
                const availableTimeSlots = await NapAlgorithm({ events })
                setStartTime(availableTimeSlots ? formatTime(availableTimeSlots.startTime) : '')
                setEndTime(availableTimeSlots ? formatTime(availableTimeSlots.endTime) : '')
            }

            ({ status } = await Location.requestForegroundPermissionsAsync());
            if (status !== 'granted') {
                console.log('Permission to access location was denied');
            }
        };

        fetchData()

    }, []);



    useEffect(() => {
        const getUserLogs = () => {
            let { sleepData } = HealthKit()
            setUserLogs(sleepData)
        }

        getUserLogs()//LEVI this is where the workout time should be done
    }, [userLogs])


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
                    {startTime ?
                        (
                            <Text style={styles.napRec}> {startTime} - {endTime}</Text>
                        )
                        :
                        (
                            <Text style={styles.napRec}>No Naps Recommended</Text>
                        )
                    }
                </View>
                
                {/* Put the circular progress tracker here for activity duration */}
                
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