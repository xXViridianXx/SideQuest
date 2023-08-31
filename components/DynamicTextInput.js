import { StyleSheet, View, TextInput } from 'react-native'
import React, { useState } from 'react'



const DynamicTextInput = () => {
    const [text, setText] = useState('')
    const [height, setHeight] = useState('40')

    const changeSize = (text) => {
        setText(text)
        setHeight(40 + (text.length * 4))
    }
    return (
        <View>
            <TextInput multiline value={text} onChangeText={changeSize} style={styles.inputStyle} />
        </View>
    )
}

export default DynamicTextInput

const styles = StyleSheet.create({
    inputStyle: {
        backgroundColor: '#E63946',
        borderRadius: 5,
        // padding: 10,
        paddingTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 10,
        marginTop: 10,
        color: '#FFF',
        height: 70,

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
        // flexDirection: 'row',
    },
})