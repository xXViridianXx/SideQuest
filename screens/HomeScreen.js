import { StatusBar, View, Text, SafeAreaView, StyleSheet, TextInput, ScrollView } from 'react-native'
// import { StatusBar } from 'expo-status-bar';
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import {
    UserCircleIcon,
    AdjustmentsHorizontalIcon,
    MagnifyingGlassIcon
} from "react-native-heroicons/outline";
import { SearchBar } from 'react-native-screens';



const HomeScreen = () => {

    // gives access to navigation object
    const navigation = useNavigation()

    // as soon as the screen mounts
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        })
    }, [])

    return (
        <SafeAreaView style={styles.container} behavior='padding'>

            {/* status bar */}
            <StatusBar barStyle="light-content" />
            {/* Header: Search, profile, logo */}

            <View style={styles.headerContainer}>
                <View style={styles.logoContainer}>
                    <Text style={styles.logoText}>SideQuest</Text>
                </View>
                <View>
                    <UserCircleIcon size='50' color='#D90429' style={styles.profile} />
                </View>
            </View>

            {/* Search Bar */}
            <View style={styles.searchContainer}>
                <View style={styles.Search}>
                    <MagnifyingGlassIcon size='25' color='#ECB8BC' style={styles.searchIcon} />
                    <TextInput placeholder='Math Tutor' keyboardType='default' style={styles.searchInput} />
                </View>
                <AdjustmentsHorizontalIcon size='30' color='#D90429' style={styles.filterIcon} />

            </View>

            {/* body */}

            <ScrollView>

            </ScrollView>

            {/* Side Quests near you */}

        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#E63946',
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
        flexDirection: 'row',
        alignItems: 'center',

        marginLeft: 25,
        width: '76%',
        backgroundColor: '#FFFFFF',
        borderRadius: 5,
    },
    searchInput: {
        backgroundColor: '#FFFFFF',
        placeholderTextColor: '#ECB8BC',
        padding: 10,
        width: '78%',
    },
    logoContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    logoText: {
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: '600',

    },
})

