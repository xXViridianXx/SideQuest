import { StatusBar, View, Text, SafeAreaView, StyleSheet, TextInput, ScrollView, TouchableOpacity, FlatList } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native'

import {
    UserCircleIcon,
    AdjustmentsHorizontalIcon,
    MagnifyingGlassIcon
} from "react-native-heroicons/outline";
import { getAuth, signOut } from 'firebase/auth';



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

const DATA = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'First Item',
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Second Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
    },
];
const Item = ({ post }) => (


    <TouchableOpacity style={styles.item}>
        <View style={styles.content}>
            <View style={{ padding: 25, width: '60%' }}>
                <Text style={{fontSize: 10, fontWeight: 500, color: '#2b2d42' }}>{post.username}</Text>
                <Text style={{ marginBottom: 0, fontSize: 23, fontWeight: 600, color: '#2b2d42' }}>{post.title}</Text>
                <Text style={{ marginTop: 10, fontSize: 20, fontWeight: 600, color: '#ECB8BC' }}>{post.distance} miles</Text>
            </View>
            <View style={styles.tag}>
                <Text style={{ fontSize: 20, fontWeight: 600, color: '#FFF' }}>${post.payType ? `${post.pay}/${post.payType}` : `${post.pay}`}</Text>
            </View>
        </View>
    </TouchableOpacity>
);

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
                    <UserCircleIcon size='40' color='#E63946' style={styles.profile} onPress={logout} />
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

            <View style={styles.questsContainer}>
                <Text style={styles.questsText}>Quests in your Area</Text>
            </View>
            <View >
                <FlatList
                    data={dummyData}
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
        fontWeight: 600,
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

    },
    item: {
        justifyContent: 'center',
        // alignItems: 'center',
        marginRight: 25,
        marginLeft: 25,
        marginTop: 25,
        backgroundColor: '#FFF',
        borderWidth: 3,
        borderColor: '#E63946',
        borderRadius: 10,

        // also need to do for android using elevation
        shadowColor: 'black',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    tag: {
        backgroundColor: '#E63946',
        width: '40%',
        justifyContent: 'center',
        alignItems: 'center',
        // borderRadius: 10,

        padding: 25
    },
    content: {
        flexDirection: 'row',
        flex: 1
    }
})

