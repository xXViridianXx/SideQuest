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
            <TextInput multiline value={text} onChangeText={changeSize} style={styles.inputStyle}/>
        </View>
    )
}

export default DynamicTextInput

const styles = StyleSheet.create({
    inputStyle: {
        backgroundColor: '#D90429',
        borderRadius: 5,
        padding: 10,
        marginTop: 10,
        marginBottom: 25,
        color: '#FFF',
        height: 70,
        // flexDirection: 'row',
    },
})