import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ItemCategory, itemList } from '../recClasses/ItemCategory';
import SelectableList from '../components/SelectableList';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ActivityScreen = () => {
    const navigation = useNavigation();
    // console.log("testing item list: ", itemList);
    var itemNames = itemList.map((item) => item.itemName);

    const [selectedItems, setSelectedItems] = useState([]);

    const handleItemSelect = (newSelectedItems) => {
        //selectedItem is a list that get updated whenever someone selects/deselects item
        console.log("select4ed item: ", newSelectedItems);
        setSelectedItems(newSelectedItems);
    };

    const handleButtonPress = async () => {
        // navigation.navigate('Home');
        try {
            const jsonValue = JSON.stringify(selectedItems);
            await AsyncStorage.setItem('selectedItems', jsonValue);
            console.log("selected items saved to async storage");

        } catch (e) {
            console.error("failed to save into async storage: ", e);
        }

        await something();
        navigation.navigate('Home', { items: selectedItems });
        console.log("after home: ", selectedItems);
    }

    const something = async () => {
        const jsonValue = await AsyncStorage.getItem('selectedItems');
        if (jsonValue !== null) {
            setSelectedItems(JSON.parse(jsonValue));
            console.log("selected items after async", selectedItems);
        }
    }


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.selectableListContainer}>
                <SelectableList data={itemNames} onItemSelect={handleItemSelect} />
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
    text: {
        fontSize: 40,
        margin: 10,
    },
});

export default ActivityScreen;