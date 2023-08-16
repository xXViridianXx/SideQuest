import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, createUserWithEmailAndPassword} from 'firebase/auth'

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

  const signUp = async (email, password, confirmPassword) => {
    const auth = getAuth()
    if (password != confirmPassword) {
      Alert.alert('Password Do Not Match')
      return
    }
    if (email && password) {

      try {
        let credentials = await createUserWithEmailAndPassword(auth, email, password)
        const user = credentials.user
        console.log('Successfully created and account with', user.email)
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

export {signIn, signUp}