import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const QuestInfoScreen = ({route}) => {

  const {postTitle, distance, username, pay, payType, description} = route.params
  return (
    <SafeAreaView>
      <Text>{postTitle}</Text>
      <Text>{username}</Text>
      <Text>{distance}</Text>
      <Text>{pay}</Text>
      <Text>{payType}</Text>
      <Text>{description}</Text>
      
    </SafeAreaView>
  )
}

export default QuestInfoScreen

const styles = StyleSheet.create({})