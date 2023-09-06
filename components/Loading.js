import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'

const Loading = () => {
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size={'large'} color={'#FFF'} />
        </View>
    )
}

export default Loading