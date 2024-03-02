// import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
// import QuestInfoScreen from './screens/QuestInfoScreen';
import SleepInfoScreen from './screens/SleepInfoScreen';
import CreatePost from './screens/CreatePost';
import { React, useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import Tabs from './components/Tab';
import { setUser } from './redux/slices/user';

import { getAuth, onAuthStateChanged, initializeAuth } from 'firebase/auth'

import ActivityScreen from './screens/ActivityScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Stack = createNativeStackNavigator();


// Start a timer for 5 seconds





export default function Index() {


    // gives root state in call back: user slice
    const user = useSelector(state => state.user.currentUser)

    const dispatch = useDispatch()


    const auth = getAuth()


    // let loggedSleepAsync = false

    const [loggedSleepAsync, setLoggedSleepAsync] = useState(false);
    // setup logged_sleep async boolean value
    useEffect(() => {
      AsyncStorage.getItem('logged_sleep').then(value =>{
        if (value && value === 'true') {
          console.log('Already logged sleep')
          // This gets the hours of the current day
          // If the hours is past 5 then set the logged_sleep and loggedSleepAsync to false so it forces the user to post sleep
          console.log(new Date().getHours());
          if (new Date().getHours() >= 5) {
            AsyncStorage.setItem('logged_sleep', 'false').then(() => {
              console.log('logged_sleep stored as false successfully.');
            })
            .catch(error => {
              console.error('Error storing boolean value:', error);
            });
          }
          setLoggedSleepAsync(true)
        }
        else if (!value) {
          console.log('logged value does not exist')

          AsyncStorage.setItem('logged_sleep', 'false').then(() => {
            console.log('logged_sleep stored as false successfully.');
          })
          .catch(error => {
            console.error('Error storing boolean value:', error);
          });
        }
        else if (value === 'false') {
          console.log('Logged sleep was false')
          setLoggedSleepAsync(false)
        }
      }).catch(error => {
        console.log(error)
      })
    },[]);

    // update the boolean value at logged_lseep to true after logging sleep for the first time today

    onAuthStateChanged(auth, (u) => {
        let email = null
        if (u != null) {
            email = u.email
        }

        dispatch(setUser(email))
    })

  if (user) {
    console.log("loggedSleepAsync: ", loggedSleepAsync)
    if (!loggedSleepAsync) {
      return (
        <NavigationContainer>
          <Stack.Navigator>
            {/* <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} /> */}
            <Stack.Screen name="CreatePost" component={CreatePost} options={{ headerShown: false }} />
            <Stack.Screen name="Tabs" component={Tabs} options={{ headerShown: false }} />
          </Stack.Navigator>
        </NavigationContainer>
      );
    }
    else {
      return (
        <NavigationContainer>
          <Stack.Navigator>
            {/* <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} /> */}
            <Stack.Screen name="Tabs" component={Tabs} options={{ headerShown: false }} />
            <Stack.Screen name="SleepInfoScreen" component={SleepInfoScreen} options={{ headerShown: false }} />
          </Stack.Navigator>
        </NavigationContainer>
      );
    }
  }
  else {
    return (
      <NavigationContainer initialRouteName='Login'>
        <Stack.Navigator >
          <Stack.Screen name='Login' component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name='Register' component={RegisterScreen} options={{ headerShown: false }} />
          {/* <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Tabs" component={Tabs} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

}
