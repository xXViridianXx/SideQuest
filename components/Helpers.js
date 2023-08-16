import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, createUserWithEmailAndPassword } from 'firebase/auth'
import { Alert } from 'react-native'

import { database, doc, setDoc} from '../firebaseConfig'
import { collection } from 'firebase/firestore'


const createDocument = async (email, username, uid) => {
  try {
    await setDoc(doc(database, 'users', uid), {
      email: email,
      username: username
    })
    console.log(`Data submitted; uid: ${uid}`)
  }
  catch (error) {
    console.log('Error' + error.message)
  }
}

const signIn = async (email, password) => {
  const auth = getAuth()
  if (email && password) {
    try {
      let userSignInInfo = await signInWithEmailAndPassword(auth, email, password)
      
      const user = userSignInInfo.user
      console.log('Logged In With', user.email)
    }
    catch (error) {
      if (error.code === 'auth/user-not-found') {
        Alert.alert("Invalid email address")
      }
      if (error.code === 'auth/wrong-password') {
        Alert.alert("Invalid password")
      }
      console.error('Error signing in: ', error.message)
    }
  }
  else if (email) {
    Alert.alert('Enter password')
  }
  else if (password) {
    Alert.alert('Enter email')
  }
  else {
    Alert.alert('Enter email')
    Alert.alert('Enter password')
  }
}

const signUp = async (email, password, confirmPassword, username) => {
  const auth = getAuth()
  if (password != confirmPassword) {
    Alert.alert('Password Do Not Match')
    return
  }
  if (email && password) {

    try {
      let credentials = await createUserWithEmailAndPassword(auth, email, password)
      const user = credentials.user
      uid = user.uid
      createDocument(email, username, uid)
      console.log('Successfully created an account with', user.email)
    }
    catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        Alert.alert('The email is already in use')
      }
      if (error.code === 'auth/invalid-email') {
        Alert.alert("Invalid email")
      }

      console.error('Error creating account', error.message)

    }
  }
  else {
    Alert.alert('Missing required fields')
  }
}

export { signIn, signUp}