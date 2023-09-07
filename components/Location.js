import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
// import GetLocation from './GetLocation'
import * as Loc from 'expo-location'

export default function LocationInput() {

  const [address, setAddress] = useState()

  const getCoords = async () => {
    let geocodedAddress;

    if (address == null) {
      geocodedAddress = await Loc.getCurrentPositionAsync({});
      // let coords = `(${}, ${})`
      let latitude = Number((geocodedAddress.coords.latitude).toFixed(1))
      let longitude = Number((geocodedAddress.coords.longitude).toFixed(1))
      let coordinates = `approx: (${latitude}, ${longitude})`
      setAddress(coordinates)
    }
    else {
      geocodedAddress = await Loc.geocodeAsync(address)

      
    }
    // console.log(address)
    // console.log(geocodedAddress.coords.latitude)

    
  }

  return (
    <View >
      <Text style={styles.textStyle}>Location</Text>
      <View style={styles.locationButton}>
        <TextInput style={{ width: '70%', backgroundColor: '#E63946', borderRadius: 5, color:'#FFF', fontWeight: '600'}} placeholder='address' placeholderTextColor={'#D90429'} value={address} onChangeText={setAddress} />
        <TouchableOpacity style={styles.buttonStyle} >
          <Text style={{ color: '#FFF', fontWeight: 600, textAlign: 'center' }} onPress={getCoords}>Current</Text>
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