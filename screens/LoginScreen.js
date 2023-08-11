import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, Button } from 'react-native'
import React, { useState, useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
// import { auth } from '../firebase'

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const signUp = () => {
    auth.createUserWithEmailAndPassword(email, password)
  }

  const nav = useNavigation()
  useLayoutEffect(() => {
    nav.setOptions({
      headerShown: false,
    })
  }, [])

  return (


    // keyboard won't cover input fields

    <KeyboardAvoidingView
      style={styles.container}
      behavior='padding'
    >
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>SideQuest</Text>
      </View>

      <View style={styles.introContainer}>
        <Text style={styles.introText}>Do Tasks. Earn Money.</Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder='Email'
          value={email}
          onChangeText={text => setEmail(text)}
          style={styles.input}
          placeholderTextColor={'#D90429'}
          keyboardType='email-address'

        />

        <TextInput
          placeholder='Password'
          value={password}
          onChangeText={text => setPassword(text)}
          style={styles.input}
          secureTextEntry
          placeholderTextColor={'#D90429'}
        />
        <TouchableOpacity onPress={() => { }}>
          <Text style={{ color: '#FFF', fontWeight: 500, padding: 8, fontSize: 12 }}>Forgot password</Text>
        </TouchableOpacity>
      </View>

      <View
        style={styles.buttonContainer}
      >
        <TouchableOpacity onPress={() => { }} style={styles.button}>
          <Text style={styles.buttonText}>Sign in</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => { }} style={styles.button}>
          <Text style={styles.buttonText}>Sign in with Google</Text>
        </TouchableOpacity>

        <View style={styles.signUpContainer}>
          <Text style={{ color: '#FFF', fontSize: 12 }}>New To The App?</Text>
          <TouchableOpacity onPress={() => { navigation.navigate('Register') }} style={[styles.buttonOutline]}>
            <Text style={styles.buttonOutlineText}> Sign Up</Text>
          </TouchableOpacity>
        </View>

      </View>
    </KeyboardAvoidingView>

  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E63946',
  },

  signUpContainer: {
    flexDirection: 'row',
    // justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
  },
  logoContainer: {
    width: '70%',
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 300
  },
  logoText: {
    color: '#FFF',
    fontSize: 50,
    fontWeight: 'bold',
    fontStyle: 'italic'

  },

  introContainer: {
    width: '70%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20

  },
  introText: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: '500',
    // fontStyle: 'italic'
  },
  inputContainer: {
    width: '70%',

  },
  input: {
    backgroundColor: '#E63946',
    paddingHorizontal: 8,
    paddingVertical: 1,
    borderRadius: 10,
    marginTop: 15,
    borderBottomWidth: 2,
    borderBottomColor: '#D90429',
    color: '#FFF',
  },

  buttonContainer: {
    width: '70%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  button: {
    width: '100%',
    backgroundColor: '#D90429',
    color: '#FFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#e5e5e5'
  },
  buttonOutline: {
    backgroundColor: '#E63946',
    // marginTop: 10,
    // borderColor: '#D90429',
    // borderWidth: 3

  },
  buttonOutlineText: {
    fontWeight: '500',
    fontSize: 14,
    color: '#FFF'

  }
})
