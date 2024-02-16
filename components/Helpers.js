import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, createUserWithEmailAndPassword } from 'firebase/auth'
import { database, doc, setDoc, addDoc } from '../firebaseConfig'

import Toast from 'react-native-root-toast'
import { collection, getDoc } from 'firebase/firestore';


const showToast = (text) => {
  let toast = Toast.show(text, {
    duration: Toast.durations.SHORT,
    backgroundColor: '#D90429',
    position: 150,
    shadow: false,
  });
};

const createDocument = async (email, username, uid) => {
  // getting current date
  const currentDate = new Date().toISOString().slice(0, 10)
  try {
    const userRef = doc(database, 'users', uid)
    await setDoc(userRef, {
      email: email,
      username: username,
      lastDate: currentDate
    })

    const sleepDataCollectionRef = collection(userRef, "sleepData")

    // creating date document
    const dateDoc = doc(sleepDataCollectionRef, currentDate)

    const userInfo = {
      sleepQuality: 0
    }

    try {
      await setDoc(dateDoc, userInfo)
    }
    catch (error) {
      console.log('Error, submitting sleep info')
    }
    console.log(`Data submitted; uid: ${uid}`)
  }
  catch (error) {
    console.log('Error' + error.message)
  }
}

const postSleepData = async (sleepQuality) => {

  // getting current user id
  const auth = getAuth()
  const user = auth.currentUser
  uid = user.uid

  // getting user from database
  const userRef = doc(database, 'users', uid)
  console.log(userRef)
  const lastDate = ""

  // getting user's last entry
  try {
    const userInfo = await getDoc(userRef)
    lastDate = userInfo.lastDate
    console.log(lastDate)
    if (!userInfo.exists) {
      console.log("User info doesn't exist")
      return null
    }
  }
  catch (error) {
    console.log('failed to get last entry date')
    return null
  }

  // getting current date
  const currentDate = new Date().toISOString().slice(0, 10)

  // checking if current date equals last entry
  if (currentDate == lastDate) {
    showToast('Already submitted post for today!') 
    return null
  }

  const sleepDataCollection = collection(userRef, "sleepData")
  const dateDoc = doc(sleepDataCollection, currentDate)
  try {
    await setDoc(dateDoc, {
      sleepQuality: sleepQuality
    })
  
  } catch (error) {
    console.log("error posting sleep")
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
        showToast('Invalid email address')
      }
      if (error.code === 'auth/wrong-password') {
        showToast('Invalid password')
      }
      showToast('Invalid credentials')
      console.error('Error signing in: ', error.message)
    }
  }
  else if (email) {
    showToast('Enter password')
  }
  else if (password) {
    showToast('Enter email')
  }
  else {
    showToast('Enter email and password')
  }
}

const signUp = async (email, password, confirmPassword, username) => {
  const auth = getAuth()
  if (password != confirmPassword) {
    showToast('Password Do Not Match')
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
        showToast('The email is already in use')
      }
      if (error.code === 'auth/invalid-email') {
        showToast("Invalid email")
      }

      console.error('Error creating account', error.message)

    }
  }
  else {
    showToast('Missing required fields')
  }
}

export { signIn, signUp, postSleepData}