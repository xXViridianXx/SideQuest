// import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
// import QuestInfoScreen from './screens/QuestInfoScreen';
import SleepInfoScreen from './screens/SleepInfoScreen';
import { React, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import Tabs from './components/Tab';
import { setUser } from './redux/slices/user';

import { getAuth, onAuthStateChanged, initializeAuth } from 'firebase/auth'

import HelloWorldScreen from './screens/HelloWorldScreen';
import ActivityScreen from './screens/ActivityScreen';


const Stack = createNativeStackNavigator();


// Start a timer for 5 seconds





export default function Index() {


    // gives root state in call back: user slice
    const user = useSelector(state => state.user.currentUser)

    const dispatch = useDispatch()


    const auth = getAuth()




    // useEffect(() => {

    onAuthStateChanged(auth, (u) => {

        // console.log(`Look it's ${u.email}`)
        let email = null
        if (u != null) {
            email = u.email
        }

        dispatch(setUser(email))

        // dispatch(setUser(0))
        // console.log(`Look it's ${u.email}`)

        // if (user) {
        //   navigation.replace('Home')
        // }


    })
    // })

  if (user) {
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
