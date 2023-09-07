import { View, Text } from 'react-native'
import React, { useState } from 'react'

const GetLocation = () => {


    const fetchCurrentLocation = async () => {
        const [currentLocation, setCurrentLocation] = useState();

        let location = await Location.getCurrentPositionAsync({});
        setCurrentLocation(location);
        console.log(currentLocation)
        return currentLocation
    }

    let location = fetchCurrentLocation()
    return (
        JSON.stringify(location)
    )
}

export default GetLocation