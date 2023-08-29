import { Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView, View, Text, SafeAreaView, StyleSheet, TextInput, Image, ScrollView, TouchableOpacity } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native'

import LogoTopLeft from '../components/LogoTopLeft';
import DynamicTextInput from '../components/DynamicTextInput';
import Location from '../components/Location';


const CreatePost = () => {

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  // gives access to navigation object
  const navigation = useNavigation()

  return (
    <SafeAreaView style={styles.container} behavior='padding'>
      <KeyboardAvoidingView style={{flex: 1}} behavior='padding'>

        <ScrollView showsVerticalScrollIndicator={false}>
          <LogoTopLeft profileColor={'#FFF'} />

          <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 25, marginRight: 25, marginLeft: 25 }}>
            <View>
              <Text style={styles.postText}>Post A Quest</Text>
            </View>
            <View>
              <Image style={styles.imageStyles} source={require("../images/hero.png")} />
            </View>
          </View>

          <View style={{ backgroundColor: '#E63946', padding: 25, borderRadius: 25, height: '100%' }}>
            <Text style={styles.textStyle}>Title</Text>
            <TextInput style={styles.inputStyle} />


            <Text style={styles.textStyle}>Reward</Text>

            <View style={styles.inputStyle}>
              <View >
                <Text style={{ color: '#FFF' }}>$ </Text>
              </View>
              <TextInput style={{ color: '#FFF' }} placeholder='20' placeholderTextColor={'#E63946'} />
            </View>

            {/* <Text style={styles.textStyle}>Location</Text>
          <View style={styles.locationButton}>
            <TextInput style={styles.inputStyle} />
            <TouchableOpacity style={{ width: '25%', height: 30, backgroundColor: 'e5e5e5' }}>
              <Text style={{ backgroundColor: '#FFF' }}>Use Current</Text>
            </TouchableOpacity>
          </View> */}
            <Location />



            <Text style={styles.textStyle}>Description</Text>
            <DynamicTextInput />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>


  )
}

export default CreatePost

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    flex: 1
  },
  postText: {
    color: '#E63946',
    fontSize: 25,
    fontWeight: '600',
    textAlign: 'center',
  },
  imageStyles: {
    height: 150,
    width: 150,
    marginTop: 15,
    marginBottom: 15
  },
  textStyle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFF'
  },
  inputStyle: {
    backgroundColor: '#D90429',
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    marginBottom: 25,
    color: '#FFF',
    flexDirection: 'row',
    height: 40
  },
  money: {
    flexDirection: 'row',
    // justifyContent: 'center',
    alignItems: 'center',
  },
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
  }
})