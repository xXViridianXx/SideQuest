import { View, Text, StyleSheet, Image} from 'react-native'
import React from 'react'
import notFound from '../images/notFound.png'

const NoSideQuests = () => {
    return (
        <View style={styles.container}>
            <Image source={require('../images/notFound.png')} style={styles.image} />
            <Text style={styles.containerText}>Nothing Found</Text>
        </View>
    )
}

export default NoSideQuests

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 25,
        marginLeft: 25,
        marginRight: 25,

    },
    containerText: {
        color: '#e5e5e5',
        fontSize: 25,
        fontWeight: '600',
        marginTop: 25,
    },
    image: {
        height: 150,
        width: 150,
        marginTop: 30,
        marginRight: 25,
        marginLeft: 25,
    }
})