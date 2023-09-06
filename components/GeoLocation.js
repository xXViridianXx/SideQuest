import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as Location from 'expo-location'

const GeoLocation = ({address}) => {

    const [location, setLocation] = useState()

    useEffect(() => {
        const askPermission = async () => {
            let {granted} = await Location.requestForegroundPermissionsAsync

            if(granted !== 'granted') {
                console.log('Grant permission please')
                return
            }

            let currentLocation = await Location.getCurrentPositionAsync(address)
            setLocation(currentLocation)
            console.log(currentLocation)
        }

        askPermission()
    }, [])
  return (
    <View>
      <Text>GeoLocation</Text>
    </View>
  )
}

export default GeoLocation