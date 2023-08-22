import { StatusBar, View, Text, SafeAreaView, StyleSheet, TextInput, ScrollView, TouchableOpacity } from 'react-native'
// import { StatusBar } from 'expo-status-bar';
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native'

import {
    UserCircleIcon,
    AdjustmentsHorizontalIcon,
    MagnifyingGlassIcon
} from "react-native-heroicons/outline";
import { getAuth, signOut } from 'firebase/auth';



const DummyData = {
    James: {
        distance: 3,
        post: 'I need help fixing my car\'s engine. I\'m not really sure what\'s wrong. It would be awesome if someone could help',
        payType: 'flat',
        pay: 50
    },
    Aaron: {
        distance: .5,
        post: 'I need someone to help me cook a large amount of food for this upcomming event on Saturday. I will be making pizza, and a giant chocolate cake',
        payType: 'hr',
        pay: 30
    },
    Tim: {
        distance: 5,
        post: 'My daughter is struggling in math and she could really use the help in geomerty and calculs. Pay is negotaible',
        payType: 'hr',
        pay: 25
    }
}

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
            <StatusBar barStyle="light-content" />
            {/* Header: Search, profile, logo */}

            <View style={styles.headerContainer}>
                <View style={styles.logoContainer}>
                    <Text style={styles.logoText}>SideQuest</Text>
                </View>
                <TouchableOpacity>
                    <UserCircleIcon size='40' color='#E63946' style={styles.profile} onPress={logout}/>
                </TouchableOpacity>
            </View>

            {/* Search Bar */}
            <View style={styles.searchContainer}>
                <View style={styles.Search}>
                    <MagnifyingGlassIcon size='25' color='#ECB8BC' style={styles.searchIcon} />
                    <TextInput placeholder='Math Tutor' keyboardType='default' style={styles.searchInput} />
                </View>
                <TouchableOpacity>
                    <AdjustmentsHorizontalIcon size='30' color='#E63946' style={styles.filterIcon} />
                </TouchableOpacity>

            </View>

            {/* body */}

            <View style= {styles.questsContainer}>
                <Text style={styles.questsText}>Quests in your Area</Text>
            </View>

            <ScrollView>
            </ScrollView>

            {/* Side Quests near you */}


        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF',
        flex: 1
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 15,
        marginRight: 50,
        width: '100%',
    },
    headerContainer: {
        flexDirection: 'row',
        marginTop: 25,
        paddingRight: 20,
        paddingLeft: 25,

    },
    searchIcon: {
        marginLeft: 10,
        marginRight: 4,
    },
    filterIcon: {
        marginLeft: 10,
        marginRight: 25
    },
    Search: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',

        marginLeft: 25,
        width: '80%',
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#E63946'
    },
    searchInput: {
        backgroundColor: '#FFFFFF',
        padding: 10,
        width: '80%',
    },
    logoContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    logoText: {
        color: '#E63946',
        fontSize: 20,
        fontWeight: '600',
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

    }
})

