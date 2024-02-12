import { StatusBar, View, Text, SafeAreaView, StyleSheet, TextInput, ScrollView, TouchableOpacity, FlatList } from 'react-native'
import React, { useState, useEffect} from 'react'
import { useNavigation } from '@react-navigation/native'
import * as Location from 'expo-location'
import HealthKit from '../components/HealthKit'


import { getAuth, signOut } from 'firebase/auth';
import Item from '../components/Post'
import NoSideQuests from '../components/NoSideQuests';
import LogoTopLeft from '../components/LogoTopLeft';
import SearchBar from '../components/SearchBar';



const dummyData = [
    {
        id: 1,
        day: 'Monday',
        caffeine: 50,
        steps: 3000,
        sleepQuality: 5,
        post: 'I need help fixing my car\'s engine. I\'m not really sure what\'s wrong. It would be awesome if someone could help',
        payType: null,
    },
    {
        id: 2,
        day: 'Tuesday',
        caffeine: 20,
        steps: 10000,
        sleepQuality: 8,
        post: 'I need someone to help me cook a large amount of food for this upcomming event on Saturday. I will be making pizza, and a giant chocolate cake',
        payType: 'hr',
        pay: 30
    },
    {
        id: 3,
        day: 'Thursday',
        caffeine: 0,
        steps: 7000,
        sleepQuality: 9,
        post: 'My daughter is struggling in math and she could really use the help in geomerty and calculs. Pay is negotaible',
    },
    {
        id: 4,
        day: 'Friday',
        caffeine: 15,
        steps: 5000,
        sleepQuality: 9,
        post: 'I\'m coding an app and it would be really cool if someone in the neighborhood could help me',
    }
]

const logout = async () => {
    console.log('logging out')
    await signOut(getAuth())
}
const HomeScreen = () => {


    useEffect(() => {
        (async () => {
          
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
          }

          HealthKit()

        })();
      }, []);



    // gives access to navigation object
    const navigation = useNavigation()

    return (
        <SafeAreaView style={styles.container} behavior='padding'>

                {/* status bar */}
                {/* <StatusBar barStyle="light-content" /> */}
                {/* Header: Search, profile, logo */}
                <LogoTopLeft profileColor={'#3d3dac'} />

                {/* Search Bar */}
                <SearchBar />
                {/* body */}
            <View style={styles.questsContainer}>
                <Text style={styles.questsText}>Sleep Data</Text>
            </View>
            <View style={{ height: 550, backgroundColor: '#FFF' }}>
                <FlatList
                    data={dummyData}
                    ListEmptyComponent={NoSideQuests}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => <Item post={item} />}
                    keyExtractor={item => item.id}
                />
            </View>

        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF',
        flex: 1
    },
    questsContainer: {
        alignItems: 'center',
        marginTop: 50,
        borderBottomWidth: 2,
        borderBottomColor: '#e5e5e5',
        marginRight: 25,
        marginLeft: 25,
        padding: 10
    },
    questsText: {
        color: '#3d3dac',
        fontSize: 20,
        fontWeight: '600',
    },
})

