import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, Button, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native'
import React, { useState, useLayoutEffect, useEffect } from 'react'
import LoginInputs from '../components/LoginInputs'

import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'



const RegisterScreen = ({ navigation }) => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')


  const signUp = () => {
    const auth = getAuth()
    if (password != confirmPassword) {
      Alert.alert('Password Do Not Match')
      return
    }
    if (email && password) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((credentials) => {
          const user = credentials.user
          console.log('Successfully created and account with', user.email)
        })
        .catch((error) => {
          if (error.code === 'auth/email-already-in-use') {
            Alert.alert('The email is already in use')
          }
          if (error.code === 'auth/invalid-email') {
            Alert.alert("Invalid email")
          }

          console.error('Error creating account', error.message)

        })
    }
    else {
      Alert.alert('Missing required fields')
    }


  }

  // const nav = useNavigation()
  // useLayoutEffect(() => {
  //   nav.setOptions({
  //     headerShown: false,
  //   })
  // }, [])

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (


    // keyboard won't cover input fields

    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior='padding'
      >
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>SideQuest</Text>
        </View>

        <View style={styles.introContainer}>
          <Text style={styles.introText}>Welcome Aboard</Text>
        </View>

        <View style={styles.inputContainer}>

          <LoginInputs labelText={'Username'} input={username} setInput={setUsername} style={styles.input} color={'#D90429'} boardType='default' secure={false} />
          <LoginInputs labelText={'Email'} input={email} setInput={setEmail} style={styles.input} color={'#D90429'} boardType='email-address' secure={false} />
          <LoginInputs labelText={'Password'} input={password} setInput={setPassword} style={styles.input} color={'#D90429'} boardType='default' secure={true} />
          <LoginInputs labelText={'Confirm Password'} input={confirmPassword} setInput={setConfirmPassword} style={styles.input} color={'#D90429'} boardType='default' secure={true} />
        </View>

        <View
          style={styles.buttonContainer}
        >
          <TouchableOpacity onPress={() => { signUp() }} style={styles.button}>
            <Text style={styles.buttonText}>Lets Go</Text>
          </TouchableOpacity>

          <View style={styles.signUpContainer}>
            <Text style={{ color: '#FFF', fontSize: 12, fontWeight: 500 }}>Already Have An Account?</Text>
            <TouchableOpacity onPress={() => { navigation.navigate('Login') }} style={[styles.buttonOutline]}>
              <Text style={styles.buttonOutlineText}> Sign In</Text>
            </TouchableOpacity>
          </View>

        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>

  )
}

export default RegisterScreen

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
    marginTop: 5,
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
