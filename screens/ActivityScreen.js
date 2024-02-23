import React from 'react';
import { View, Text, Button, StyleSheet, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ItemCategory, itemList } from '../recClasses/ItemCategory';
import SelectableList from '../components/SelectableList';

const ActivityScreen = () => {
    const navigation = useNavigation(); // Access navigation object
    console.log("testing item list: ", itemList);
    var itemNames = itemList.map((item) => item.itemName);
    const handleItemSelect = (selectedItem) => {
        console.log("select4ed item: ", selectedItem);
        
    };

    const handleButtonPress = () => {
        navigation.navigate('Home');
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