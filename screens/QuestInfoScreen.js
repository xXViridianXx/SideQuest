import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {
  ArrowLeftCircleIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  HeartIcon,
} from "react-native-heroicons/outline";
import { useNavigation } from '@react-navigation/native';

const QuestInfoScreen = ({ route }) => {

  const navigation = useNavigation()
  const { postTitle, distance, username, pay, payType, description } = route.params
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#E63946' }}>


      <View style={{ height: '20%', marginLeft: 25, marginTop: 25, marginRight: 25, }}>

        <View style={{ paddingTop: 25 }}>
          <TouchableOpacity>
            <Text style={styles.username}>{username}</Text>
          </TouchableOpacity>
          <View>
            <Text style={styles.title}>{postTitle}</Text>
          </View>
        </View>
      </View>

      <View style={styles.metaDataContainer}>
        <View style={{ padding: 10, borderRadius: 10, }}>
          <Text style={{ fontSize: 25, fontWeight: '600', color: '#FFF' }}>
            {distance} miles
          </Text>
        </View>

        <View style={{ backgroundColor: '#FFF', padding: 10, borderRadius: 10 }}>
          <Text style={{ fontSize: 25, fontWeight: '600', color: '#E63946', }}>
            ${payType ? `${pay}/${payType}` : `${pay}`}
          </Text>
        </View>
      </View>





      <View style={{ backgroundColor: '#FFF', height: '55%' }}>
        <ScrollView style={{ padding: 25 }}>

          <View>
            <View style={{ borderBottomWidth: 3, borderBottomColor: '#e5e5e5', paddingBottom: 10 }}>
              <Text style={{ fontSize: 30, fontWeight: 'bold', color: '#2b2d42' }}>Description</Text>
            </View>

            <View style={{ marginTop: 25 }}>
              <Text style={{ color: "#2b2d42", fontWeight: '500' }}>{description}</Text>
            </View>
          </View>

          <View>
            <View style={{ borderBottomWidth: 3, borderBottomColor: '#e5e5e5', paddingBottom: 10, marginTop: 25 }}>
              <Text style={{ fontSize: 30, fontWeight: 'bold', color: '#2b2d42' }}>Location</Text>
            </View>
          </View>
        </ScrollView>
      </View>


      <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 25, backgroundColor: '#FFF', paddingBottom: '100%' }}>
        <TouchableOpacity style={{ height: '50', marginTop: 10, borderRadius: 50, backgroundColor: '#E63946' }}>
          <ArrowLeftCircleIcon onPress={() => navigation.navigate('Home')} color={'#FFF'} size={50} />
        </TouchableOpacity >

        <TouchableOpacity style={{ marginTop: 10, height: '50', borderRadius: 50 }}>
          <ChatBubbleOvalLeftEllipsisIcon color={'#E63946'} size={50} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default QuestInfoScreen

const styles = StyleSheet.create({
  username: {
    fontSize: 20, fontWeight: '600', color: '#FFF'
  },
  title: {
    fontSize: 40, fontWeight: 'bold', color: '#FFF'
  },
  metaDataContainer: {
    flexDirection: 'row', justifyContent: 'space-between', margin: 25
  }
})