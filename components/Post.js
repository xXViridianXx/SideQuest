import { View, Text, TouchableOpacity, StyleSheet} from 'react-native'
import React from 'react'

const Post = ({ post }) => {
    return (
        <TouchableOpacity style={styles.item}>
            <View style={styles.content}>
                <View style={{ padding: 25, width: '60%' }}>
                    <Text style={{ fontSize: 10, fontWeight: 500, color: '#252422' }}>{post.username}</Text>
                    <Text style={{ marginBottom: 0, fontSize: 23, fontWeight: 600, color: '#252422' }}>{post.title}</Text>
                    <Text style={{ marginTop: 10, fontSize: 20, fontWeight: 600, color: '#ECB8BC' }}>{post.distance} miles</Text>
                </View>
                <View style={styles.tag}>
                    <Text style={{ fontSize: 20, fontWeight: 600, color: '#FFF' }}>${post.payType ? `${post.pay}/${post.payType}` : `${post.pay}`}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default Post

const styles = StyleSheet.create({
    item: {
        justifyContent: 'center',
        marginRight: 25,
        marginLeft: 25,
        marginTop: 25,
        backgroundColor: '#FFF',
        borderWidth: 3,
        borderColor: '#E63946',
        borderRadius: 10,

        // also need to do for android using elevation
        ...Platform.select({
            ios: {
                shadowColor: 'black',
                shadowOffset: { width: -2, height: 4 },
                shadowOpacity: 0.2,
                shadowRadius: 3,
            },
            android: {
                elevation: 5,
            },
        }),

    },
    tag: {
        backgroundColor: '#E63946',
        width: '40%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 25
    },
    content: {
        flexDirection: 'row',
        flex: 1
    }
})