import { StyleSheet, Text, View, TextInput, Touchable, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

const Reward = () => {

    const [flatButtonPressed, setFlatButtonPressed] = useState(true)
    const [hourlyButtonPressed, setHourlyButtonPressed] = useState(false)

    const selectFlatType = () => {
        setFlatButtonPressed(true)
        setHourlyButtonPressed(false)
    }

    const selectHourlyType = () => {
        setFlatButtonPressed(false)
        setHourlyButtonPressed(true)
    }

    return (
        <View>
            <Text style={styles.textStyle}>Reward</Text>

            <View style={{ flexDirection: 'row' }}>
                <View style={styles.inputStyle}>
                    <View >
                        <Text style={{ color: '#FFF', fontSize: 30, fontWeight: '600' }}>$ </Text>
                    </View>
                    <TextInput style={{ color: '#FFF', fontSize: 30, fontWeight: '600', flex: 1 }} placeholder='20' placeholderTextColor={'#E63946'} />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                    <TouchableOpacity onPress={selectFlatType} style={{ marginLeft: 10, backgroundColor: '#E63946' }}>
                        <View style={styles.payType}>
                            <Text style={flatButtonPressed ? styles.buttonPressed : styles.buttonNotPressed}>Flat</Text>
                        </View>

                    </TouchableOpacity>
                    <TouchableOpacity onPress={selectHourlyType} style={{backgroundColor: '#E63946', marginRight: 25}}>
                        <View style={styles.payType}>
                            <Text style={hourlyButtonPressed ? styles.buttonPressed : styles.buttonNotPressed}>Hourly</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default Reward

const styles = StyleSheet.create({
    inputStyle: {
        marginTop: 10,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#D90429',
        borderRadius: 5,
        padding: 10,
        width: '58%',
        height: 70
    },
    textStyle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#FFF'
    },
    payType: {
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    buttonPressed: {
        color: '#FFF',
        fontSize: 20,
        fontWeight: '600'
    },
    buttonNotPressed: {
        color: '#D90429',
        fontSize: 15,
        // fontWeight: '600'
    }
})