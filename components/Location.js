import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'

export default function Location() {
  return (
    <View >
      <Text style={styles.textStyle}>Location</Text>
      <View style={styles.locationButton}>
        <TextInput style={{ width: '70%', backgroundColor: '#E63946', borderRadius: 5 }} />
        <TouchableOpacity style={styles.buttonStyle}>
          <Text style={{ color: '#FFF', fontWeight: 600, textAlign: 'center' }}>Current</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#E63946'
  },
  locationButton: {
    flexDirection: 'row',
    // alignItems: 'center',
    // flex: 1,
    borderRadius: 5,
    backgroundColor: '#E63946',
    // // borderRadius: 5,
    paddingLeft: 10,
    // marginTop: 10,
    // marginBottom: 25,
    // color: '#FFF',
    height: 40,
    // width: '70%',
    marginTop: 10,
    marginBottom: 20,
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
  inputStyle: {

  },
  buttonStyle: {
    backgroundColor: '#E63946',
    borderRadius: 5,
    padding: 10,
    marginLeft: 20,
    // height: 40,
    // width: '30%'
  }
})