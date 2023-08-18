// import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import { React, useEffect, useState } from 'react';
import RegisterScreen from './screens/RegisterScreen';
import { Provider, useSelector } from 'react-redux';
import { store } from './redux/store';

const Stack = createNativeStackNavigator();

export default function Index() {

  // gives root state in call back: user slice
  const user  = useSelector(state => state.user.currentUser)

  if (user) {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
  else {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='Login' component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name='Register' component={RegisterScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
