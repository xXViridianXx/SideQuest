import { Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView, View, Text, SafeAreaView, StyleSheet, TextInput, Image, ScrollView, TouchableOpacity } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native'

import LogoTopLeft from '../components/LogoTopLeft';
import DynamicTextInput from '../components/DynamicTextInput';
import Location from '../components/Location';
import Reward from '../components/Reward';

const CreatePost = () => {

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  // gives access to navigation object
  const navigation = useNavigation()

  return (
    <SafeAreaView style={styles.container} behavior='padding'>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior='padding'>

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* <LogoTopLeft profileColor={'#FFF'} /> */}

          <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 25, marginRight: 25, marginLeft: 25 }}>
            <View>
              <Text style={styles.postText}>Post A Quest</Text>
            </View>
            <View>
              <Image style={styles.imageStyles} source={require("../images/hero.png")} />
            </View>
          </View>

          <View style={{ backgroundColor: '#FFF', padding: 25, borderRadius: 25}}>
            <Text style={styles.textStyle}>Title</Text>
            <TextInput style={styles.inputStyle} placeholder='Soccer Coach Needed' placeholderTextColor={'#D90429'}/>

            <View >
              <Reward />
            </View>
            <Location />



            <Text style={styles.textStyle}>Description</Text>
            <DynamicTextInput />
          </View>

          <View>
            <TouchableOpacity>
              <View style={{backgroundColor: '#D90429', justifyContent: 'center', alignItems: 'center', borderRadius: 20, height: 40,marginLeft: 25, marginRight: 25, marginBottom: 25}}>
                <Text style={{color: '#FFF', fontSize: 20, fontWeight: '600'}}>Post</Text>
              </View>
            </TouchableOpacity>
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
    marginBottom: 15,

  },
  textStyle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#E63946'
  },
  inputStyle: {
    backgroundColor: '#E63946',
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    marginBottom: 25,
    color: '#FFF',
    flexDirection: 'row',
    height: 40,

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
})