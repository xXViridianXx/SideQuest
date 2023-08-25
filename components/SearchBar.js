import { StyleSheet, Text, View, TouchableOpacity, TextInput} from 'react-native'
import React from 'react'
import {
    AdjustmentsHorizontalIcon,
    MagnifyingGlassIcon
} from "react-native-heroicons/outline";

const SearchBar = () => {
    return (
        <View style={styles.searchContainer}>
            <View style={styles.Search}>
                <MagnifyingGlassIcon size='25' color='#ECB8BC' style={styles.searchIcon} />
                <TextInput placeholder='Math Tutor' keyboardType='default' style={styles.searchInput} />
            </View>
            <TouchableOpacity>
                <AdjustmentsHorizontalIcon size='30' color='#E63946' style={styles.filterIcon} />
            </TouchableOpacity>

        </View>
    )
}

export default SearchBar

const styles = StyleSheet.create({
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 15,
        marginRight: 50,
        width: '100%',
    },
    searchIcon: {
        marginLeft: 10,
        marginRight: 4,
    },
    filterIcon: {
        marginLeft: 10,
        marginRight: 25
    },
    Search: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',

        marginLeft: 25,
        width: '80%',
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#E63946'
    },
    searchInput: {
        backgroundColor: '#FFFFFF',
        padding: 10,
        width: '80%',
        fontWeight: 600,
    },
})