import { StatusBar, View, Text, SafeAreaView, StyleSheet, TextInput, ScrollView, TouchableOpacity, FlatList } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native'

import LogoTopLeft from '../components/LogoTopLeft';


const CreatePost = () => {

  // gives access to navigation object
  const navigation = useNavigation()

  return (
    <SafeAreaView style={styles.container} behavior='padding'>
      <LogoTopLeft profileColor={'#FFF'}/>
    </SafeAreaView>

  )
}

export default CreatePost

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    flex: 1
  },
})