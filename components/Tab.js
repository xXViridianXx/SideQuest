import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from '../screens/HomeScreen'
import CreatePostScreen from '../screens/CreatePost'
import { View } from "react-native";
import {
  HomeIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  PlusCircleIcon,
} from "react-native-heroicons/solid";


const Tab = createBottomTabNavigator()

const tabBarStyles = {
  position: 'absolute',
  bottom: '0',
  left: '0',
  right: '0',
  top: '0',
  elevation: '0',
  height: 10,
  backgroundColor: 'black'

}
function MyTabs() {

  return (
    <Tab.Navigator initialRouteName="Home" screenOptions={{
      tabBarShowLabel: false, headerShown: false, height: 60,
      tabBarStyle: {
        backgroundColor: '#FFF',
        height: 90,
        borderTopWidth: 0,


      }
    }}>

      <Tab.Screen name="Post" component={CreatePostScreen} options={{
        headerShown: false, tabBarIcon: ({ focused }) => {
          return (
            <View>
              <PlusCircleIcon name="homeIcon" size={30} color={focused ? '#E63946' : '#ECB8BC'} />
            </View>
          )
        }
      }} />
      <Tab.Screen name="Home" style={{ justifyContent: 'center', alignItems: 'center' }} component={HomeScreen} options={{
        headerShown: false,
        tabBarIcon: ({ focused }) => {
          return (
            <View>
              <HomeIcon name="homeIcon" size={30} color={focused ? '#E63946' : '#ECB8BC'} />
            </View>
          )
        }
      }} />
      <Tab.Screen name="Messages" component={HomeScreen} options={{
        headerShown: false,
        tabBarIcon: ({ focused }) => {
          return (
            <View>
              <ChatBubbleOvalLeftEllipsisIcon name="messageIcon" size={30} color={focused ? '#E63946' : '#ECB8BC'} />
            </View>
          )
        }
      }} />
    </Tab.Navigator>
  );
}

export default MyTabs


