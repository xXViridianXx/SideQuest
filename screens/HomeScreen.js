import { StatusBar, View, Text, SafeAreaView, StyleSheet, TextInput, ScrollView, TouchableOpacity, FlatList } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native'


import { getAuth, signOut } from 'firebase/auth';
import Item from '../components/Post'
import NoSideQuests from '../components/NoSideQuests';
import LogoTopLeft from '../components/LogoTopLeft';
import SearchBar from '../components/SearchBar';



const dummyData = [
    {
        id: 1,
        username: 'James',
        title: 'Car trouble',
        distance: 3,
        post: 'I need help fixing my car\'s engine. I\'m not really sure what\'s wrong. It would be awesome if someone could help',
        payType: null,
        pay: 50
    },
    {
        id: 2,
        username: 'Aaron',
        title: 'Cooking assistant',
        distance: .5,
        post: 'I need someone to help me cook a large amount of food for this upcomming event on Saturday. I will be making pizza, and a giant chocolate cake',
        payType: 'hr',
        pay: 30
    },
    {
        id: 3,
        username: 'Tim',
        title: 'Math tutor wanted',
        distance: 5,
        post: 'My daughter is struggling in math and she could really use the help in geomerty and calculs. Pay is negotaible',
        payType: 'hr',
        pay: 25
    },
    {
        id: 4,
        username: 'Viridian',
        title: 'App development',
        distance: 5,
        post: 'I\'m coding an app and it would be really cool if someone in the neighborhood could help me',
        payType: 'hr',
        pay: 15
    }
]

const logout = async () => {
    console.log('logging out')
    await signOut(getAuth())
}
const HomeScreen = () => {

    // gives access to navigation object
    const navigation = useNavigation()

    return (
        <SafeAreaView style={styles.container} behavior='padding'>

            {/* status bar */}
            {/* <StatusBar barStyle="light-content" /> */}
            {/* Header: Search, profile, logo */}
            <LogoTopLeft profileColor={'#E63946'}/>

            {/* Search Bar */}
            <SearchBar/>
            {/* body */}

            <View style={styles.questsContainer}>
                <Text style={styles.questsText}>Quests in your Area</Text>
            </View>
            <View style={{height: 500, backgroundColor: '#FFF'}}>
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
        color: '#E63946',
        fontSize: 20,
        fontWeight: '600',
    },
})

