import React,{useState} from 'react';
import {View,Text,StyleSheet,TextInput} from 'react-native';
import { Bars3Icon, MagnifyingGlassIcon } from 'react-native-heroicons/outline';
const Search=({ getCategories})=>{
    const[RecipeName,setRecipeName]=useState('');
 return (
    <View style={styles.searchContainer}>
    <View style={styles.searchInputContainer}>
      <MagnifyingGlassIcon color={"#f96163"} size={20}
      onPress={()=>getCategories(RecipeName)} />
      <TextInput
        placeholder="Search Your Favourite Food"
        placeholderTextColor={"gray"}
        style={styles.searchInput}
        value={RecipeName}
        onChangeText={(text)=>setRecipeName(text)}
      />
    </View>
  </View>
);
}
export default Search;
const styles=StyleSheet.create({
    searchContainer: {
        marginTop: 20,
        paddingHorizontal: 15, // Adds horizontal padding to the search container
      },
      searchInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff', // White background for the search input
        borderRadius: 20, // Rounded corners
        paddingHorizontal: 15, // Padding inside the search input
        shadowColor: '#000',
        borderColor:"#f96163",
        borderWidth:1,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3, // Adds some depth
      },
      searchInput: {
        flex: 1, // Take the remaining space
        fontSize: 16,
        paddingVertical: 10, // Padding for vertical spacing
        paddingHorizontal: 10, // Padding for horizontal spacing
        color: '#000', // Black text for readability
      },
})