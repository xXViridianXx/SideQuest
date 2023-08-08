import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { UserCircleIcon } from "react-native-heroicons/outline";



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
            {/* Header: Search, profile, logo */}
            <View style={styles.headerContainer}>
                <View style={styles.logoContainer}>
                    <Text style={styles.logoText}>SideQuest</Text>
                </View>
                <View>
                    <UserCircleIcon size='50' color='#D90429' style={styles.profile} />
                </View>
            </View>
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#E63946',
        flex: 1
    },
    headerContainer: {
        flexDirection: 'row',
        marginTop: 25,
        paddingRight: 20,
        paddingLeft: 25,

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

