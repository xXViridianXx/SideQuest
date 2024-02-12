import { StyleSheet, Text, View, TextInput, Touchable, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
const Reward = () => {

    const [number, setNumber] = useState(5)

    const addOne = () => {
        if (number < 10) {
            setNumber(number + 1)
        }
    }
    const subOne = () => {
        if (number > 1) {
            setNumber(number - 1)
        }
    }
    return (
        <View style={{ flexDirection: 'center', alignItems: 'center' }}>
            <View style={styles.inputStyle}>
                {/* <TextInput style={{ color: '#FFF', fontSize: 200, fontWeight: '600', flex: 1, textAlign: 'center' }} placeholder='7' placeholderTextColor={'#32328f'} /> */}
                <Text style={{ color: '#FFF', fontSize: 200, fontWeight: '600', flex: 1, textAlign: 'center' }}>{number}</Text>
            </View>
            <View style={{ flexDirection: 'row'}}>
                <View>
                    <TouchableOpacity style={styles.button} onPress={subOne}>
                        <Text style={styles.buttonText}>-1</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity style={styles.button} onPress={addOne}>
                        <Text style={styles.buttonText}>+1</Text>
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
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#3d3dac',
        borderRadius: 5,
        // padding: 10,
        width: '60%',
        height: '50%',

        // ...Platform.select({
        //     ios: {
        //         shadowColor: 'black',
        //         shadowOffset: { width: -2, height: 4 },
        //         shadowOpacity: 0.2,
        //         shadowRadius: 3,
        //     },
        //     android: {
        //         elevation: 5,
        //     },
        // }),
    },
    button: {
        width: 150,
        height: 50,
        marginTop: 30,
        marginHorizontal: 5,
        backgroundColor: '#32328f',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        color: '#FFF',
        fontSize: 20,
        fontWeight: 600,
        textAlign: 'center'
    },
})