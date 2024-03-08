import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, SafeAreaView, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
// import { ItemCategory, itemList } from '../recClasses/ItemCategory';
import { itemList } from '../recClasses/recClasses';
import SelectableList from '../components/SelectableList';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ActivityScreen = () => {
    const navigation = useNavigation(); // used for navigating to other screens
    var itemNames = itemList.map((item) => item.name); // get the names of the activities like Walk, Run, etc

    const [selectedItems, setSelectedItems] = useState([]); // managed in the useState hook
    // initialized with two values: current state value and function that allows you to update the state

    const handleItemSelect = (newSelectedItems) => {
        //selectedItem is a list that get updated whenever someone selects/deselects item
        console.log("select4ed item: ", newSelectedItems);
        setSelectedItems(newSelectedItems);
    };

    const handleButtonPress = async () => { // take action button
        // navigation.navigate('Home');
        navigation.navigate('Home', { items: selectedItems });
    }
    const handleAddActivity = (userInput) => {
        const updatedItems = [...selectedItems, userInput];
        setSelectedItems(updatedItems);
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.selectableListContainer}>
                <SelectableList data={itemNames} onItemSelect={handleItemSelect} />
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Enter your activity: "
                    />
                    <Button
                        title="Add"
                        // onpress={handleAddActivity}
                        color="#3498db"
                        onPress={handleAddActivity}
                    />
                </View>
            </View>

            <Button title="Take Action!" onPress={handleButtonPress}></Button>
        </SafeAreaView>

    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 50,
        backgroundColor: '#3d3dac',
    },
    selectableListContainer: {
        height: '80%',
        width: '80%',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#3d3dac',
    },
    textInput: {
        height: 40, // Set a fixed height
        flex: 1, // Take remaining space
        borderColor: 'gray',
        borderWidth: 1,
        paddingLeft: 10,
        backgroundColor: '#ecf0f1',
        marginRight: 10, // Add some margin between TextInput and Button
    },
    inputContainer: {
        flexDirection: 'row', // Arrange children horizontally
        alignItems: 'center', // Center vertically
        margin: 10,
    },
    text: {
        fontSize: 40,
        margin: 10,
    },
});

export default ActivityScreen;