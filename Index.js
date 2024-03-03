// import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
// import QuestInfoScreen from './screens/QuestInfoScreen';
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

  const [loggedSleepAsync, setLoggedSleepAsync] = useState(true);
  // setup logged_sleep async boolean value
  // useEffect(() => {
  //   AsyncStorage.getItem('logged_sleep').then(value => {
  //     if (value && value === 'true') {
  //       console.log('Already logged sleep')
  //       // This gets the hours of the current day
  //       // If the hours is past 5 then set the logged_sleep and loggedSleepAsync to false so it forces the user to post sleep
  //       console.log(new Date().getHours());
  //       if (new Date().getHours() >= 5) {
  //         AsyncStorage.setItem('logged_sleep', 'false').then(() => {
  //           console.log('logged_sleep stored as false successfully.');
  //         })
  //           .catch(error => {
  //             console.error('Error storing boolean value:', error);
  //           });
  //       }
  //       setLoggedSleepAsync(true)
  //     }
  //     else if (!value) {
  //       console.log('logged value does not exist')

  //       AsyncStorage.setItem('logged_sleep', 'false').then(() => {
  //         console.log('logged_sleep stored as false successfully.');
  //       })
  //         .catch(error => {
  //           console.error('Error storing boolean value:', error);
  //         });
  //     }
  //     else if (value === 'false') {
  //       console.log('Logged sleep was false')
  //       setLoggedSleepAsync(false)
  //     }
  //   }).catch(error => {
  //     console.log(error)
  //   })
  // }, []);

  const getAsyncSleepLog = async () => {
    try {
      const logged = await AsyncStorage.getItem("logged_sleep")
      console.log("In getAsyncSleepLog logged: " + logged)
      setLoggedSleepAsync(logged === 'false' ? false : true);
    }
    catch (e) {
      console.log("In didUserLogSleep: " + e)
    }
  }

  onAuthStateChanged(auth, (u) => {
    let email = null
    if (u != null) {
      email = u.email
    }

    dispatch(setUser(email))
  })

  useEffect(() => {
    const fetchData = async () => {
      await getAsyncSleepLog();
    };

    fetchData();
  }, []);

  useEffect(() => {
    const checkTime = async () => {
      const currentDate = new Date();
      const currentHour = currentDate.getHours();
      console.log("current hour: " + currentHour, "logged: " + loggedSleepAsync)
      // Check if the current time is past 5 AM and the check hasn't been made for today
      if (currentHour >= 5 && loggedSleepAsync) {
        const checkMadeForToday = await AsyncStorage.getItem('checkMadeForToday');
        console.log("check for today: " + checkMadeForToday)
        if (!checkMadeForToday) {
          await AsyncStorage.setItem('checkMadeForToday', 'true');
          await AsyncStorage.setItem('logged_sleep', 'false');
          setLoggedSleepAsync(false);
        }
      }
    };

    checkTime();
  }, [loggedSleepAsync]); // Run the effect when loggedSleepAsync changes

  useEffect(() => {
    const resetDay = async () => {
      const currentDate = new Date();
      const currentDay = currentDate.getDate();
      const storedDay = await AsyncStorage.getItem('currentDay');
      console.log("storedDate: " + storedDay)
      console.log("currentDate: " + currentDate)
      if (storedDay !== currentDay.toString()) {
        await AsyncStorage.setItem('checkMadeForToday', ''); // Clear check for today
        await AsyncStorage.setItem('currentDay', currentDay.toString());
      }
    }
    resetDay()
  })

  if (user) {
    // console.log("bruhhhh " + loggedSleepAsync)
    if (false == loggedSleepAsync) {
      return (
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="CreatePost" component={CreatePost} options={{ headerShown: false }} />
            <Stack.Screen name="Tabs" component={Tabs} options={{ headerShown: false }} />
          </Stack.Navigator>
        </NavigationContainer>
      );
    }
    // console.log("in else statement")
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Tabs" component={Tabs} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
  else {
    return (
      <NavigationContainer initialRouteName='Login'>
        <Stack.Navigator >
          <Stack.Screen name='Login' component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name='Register' component={RegisterScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

}
