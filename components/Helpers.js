import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, createUserWithEmailAndPassword } from 'firebase/auth'
import { database, doc, setDoc, addDoc } from '../firebaseConfig'

import Toast from 'react-native-root-toast'
import { collection, getDoc, updateDoc } from 'firebase/firestore';
import { err } from 'react-native-svg';
import { itemList, initializeItemList, Activity, initializeCategories } from '../recClasses/recClasses';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Loc from 'expo-location'
import { useState } from 'react';

const showToast = (text) => {
    let toast = Toast.show(text, {
        duration: Toast.durations.SHORT,
        backgroundColor: '#D90429',
        position: 150,
        shadow: false,
    });
};

const storeItemList = async () => {
    // in this function we will get the itemList from the recClasses file and store it in async storage

    //call initializeItemList
    let itemList2 = initializeItemList()
    let categoryMapList = initializeCategories()
    try {
        await AsyncStorage.setItem('itemList', JSON.stringify(itemList2));
        await AsyncStorage.setItem('categoryMapList', JSON.stringify(categoryMapList))
    } catch (e) {
        console.log("error storing item list")
    }
}

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
    // only call storeItemList when async storage for 'itemList' and 'categoryMapList' is empty
    if (await AsyncStorage.getItem('itemList') == null || await AsyncStorage.getItem('categoryMapList') == null) {
        storeItemList()
    }
    updateActivityScores(sleepQuality)

    try {
        const currentDate = new Date().toDateString()
        await AsyncStorage.setItem('logged_sleep', 'true')
        await AsyncStorage.setItem("logged_date", currentDate)
        console.log("posted sleep data!")
        await AsyncStorage.setItem('sleepQuality', sleepQuality.toString())

        // store the sleep quality in async storage?
    }
    catch (e) {
        console.log("error updating Async variable")
    }

    // getting current user id
    const auth = getAuth()
    const user = auth.currentUser
    uid = user.uid

    // getting user from database
    const userRef = doc(database, 'users', uid)
    lastDate = ""
    // getting user's last entry
    try {
        const userSnapShot = await getDoc(userRef)
        if (userSnapShot.exists()) {
            userInfo = userSnapShot.data()
            lastDate = userInfo.lastDate
        }
        else {
            console.log("failed to get user data")
        }
    }
    catch (error) {
        console.log('failed to last entry date ', error.message)
        return null
    }

    // getting current date
    const currentDate = new Date().toISOString().slice(0, 10)

    // console.log(currentDate, lastDate)
    // checking if current date equals last entry
    // only post if last date different
    if (currentDate === lastDate) {
        showToast('Already submitted post for today!')
        return null
    }

    // posting sleep quality
    const sleepDataCollection = collection(userRef, "sleepData")
    const dateDoc = doc(sleepDataCollection, currentDate)
    try {
        await setDoc(dateDoc, {
            sleepQuality: sleepQuality
        })

    } catch (error) {
        console.log("error posting sleep ", error.message)
    }



    // updating last user entry date
    try {
        await updateDoc(userRef, {
            lastDate: currentDate
        })
    }
    catch (error) {
        console.log("error updating data: ", error.message)
    }


}

const updateActivityScores = async (sleepQuality) => {
    // get the activity from async storage

    let selectedItems = await AsyncStorage.getItem('selectedItems')
    selectedItems = JSON.parse(selectedItems)
    console.log("selectedItems: ", selectedItems)

    let activityList = await AsyncStorage.getItem('itemList')
    activityList = JSON.parse(activityList)
    activityList = activityList.map(obj => new Activity(obj.name, obj.categoryNames, obj.indScore, obj.numPicks))


    // get the category map list from async storage
    let categoryMapList = await AsyncStorage.getItem('categoryMapList')
    categoryMapList = JSON.parse(categoryMapList)
    const map = new Map();
    for (const [key, value] of Object.entries(categoryMapList)) {
        map.set(key, value);
    }
    categoryMapList = map
    console.log("categorymaplist type: ", typeof categoryMapList)
    console.log("categoryMapList: ", categoryMapList)

    // VEDAANT -- get live sleep data from last night -- 
    // TODO: get sleep goal from async (should be stored when first opening the app along with the sleep quality)
    let hours = 8;
    let sleepGoal = 9;

    // debugging categoryMapList and the type for it

    // 1. sleepquality, 2. sleep duration, 3. activities

    // go through the activityList and search for the activities
    for (let i = 0; i < activityList.length; i++) {
        let activity = activityList[i]
        for (let j = 0; j < selectedItems.length; j++) {
            if (activity.name == selectedItems[j]) {
                activity.updateScore(hours, sleepGoal, sleepQuality, categoryMapList)
            }
        }

        // VEDAANT -- update the score based on sleep quality and sleep duration

    }

    // sort the activityList based on the indScore
    activityList.sort((a, b) => b.indScore - a.indScore)
    try {
        console.log("Updated activityList: ", activityList)
        await AsyncStorage.setItem('itemList', JSON.stringify(activityList));
        console.log("Updated activityList stored in AsyncStorage.");
    } catch (error) {
        console.error("Error storing updated activityList in AsyncStorage:", error.message);
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

// return realtime weather information based on coords
const getWeatherInfo = async () => {
    try {
        // retreives coords
        let geocodedAddress = await Loc.getCurrentPositionAsync({});
        let latitude = Number((geocodedAddress.coords.latitude))
        let longitude = Number((geocodedAddress.coords.longitude))

        // api settings
        const url = `https://weatherapi-com.p.rapidapi.com/current.json?q=${longitude},${latitude}`
        const headers = {
            'X-RapidAPI-Key': '886a660e26msh8db0f67e0667606p1f561ejsn7a7ec6f630d9',
            'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
        }

        // making api call and converting data to json
        const response = await fetch(url, { method: 'GET', headers });
        const data = await response.json();
        console.log(data);
    }
    catch (error) {
        console.error(error);
    }
}

const getLocalTime = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    console.log(hours, minutes, seconds)
    return {hours: hours, minutes: minutes, seconds: seconds};
  };


export { signIn, signUp, postSleepData, getWeatherInfo, getLocalTime}