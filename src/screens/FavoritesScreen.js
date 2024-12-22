import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { MagnifyingGlassIcon } from 'react-native-heroicons/outline';

const FavoritesScreen = () => {
  const [favorites, setFavorites] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch favorites from AsyncStorage
  const getFavorites = async () => {
    try {
      const favoritesData = await AsyncStorage.getItem('favorites');
      console.log('Raw data from AsyncStorage:', favoritesData);
      const parsedFavorites = favoritesData ? JSON.parse(favoritesData) : [];
      console.log('Parsed favorites:', parsedFavorites);
      setFavorites(parsedFavorites);
    } catch (error) {
      console.error('Error retrieving favorites:', error);
    }
  };

  useEffect(() => {
    getFavorites();
  }, []);

  useEffect(() => {
    console.log('Updated favorites:', favorites);
  }, [favorites]);

  // Function to delete a recipe from favorites
  const deleteFavorite = async (idMeal) => {
    try {
      const updatedFavorites = favorites.filter(fav => fav.idMeal !== idMeal);
      await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      setFavorites(updatedFavorites);
      Alert.alert('Deleted', 'Recipe removed from favorites.');
    } catch (error) {
      console.error('Error deleting from favorites:', error);
    }
  };

  // Function to filter recipes based on the search query
  const filteredFavorites = favorites.filter((item) =>
    item.strMeal.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderItem = ({ item }) => {
    return (
      <View style={styles.itemContainer}>
        <Image source={{ uri: item.strMealThumb }} style={styles.image} />
        <TouchableOpacity onPress={() => deleteFavorite(item.idMeal)} style={styles.deleteButton}>
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.strMeal}</Text>
          <Text style={styles.subTitle}>Area: {item.strArea}</Text>
          <Text style={styles.instructionsText}>{item.strInstructions}</Text>
          <Text style={styles.sectionTitle}>Ingredients:</Text>
          {ingredientsIndexes(item).map((i) => (
            <Text key={i} style={styles.ingredientText}>
              {item["strIngredient" + i]} - {item["strMeasure" + i]}
            </Text>
          ))}
        </View>
      </View>
    );
  };

  const ingredientsIndexes = (meal) => {
    if (!meal) return [];
    let indexes = [];
    for (let i = 1; i <= 20; i++) {
      if (meal["strIngredient" + i]) {
        indexes.push(i);
      }
    }
    return indexes;
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#f96163', '#ff8364']} style={styles.header}>
        <Text style={styles.headerContent}>Favorite Recipes</Text>
      </LinearGradient>
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <MagnifyingGlassIcon color={"#f96163"} size={20} />
          <TextInput
            placeholder="Search Your Favourite Food"
            placeholderTextColor={"gray"}
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery} // Update searchQuery on change
          />
        </View>
      </View>
      {filteredFavorites.length === 0 ? (
        <Text>No favorites found.</Text>
      ) : (
        <FlatList
          data={filteredFavorites}
          renderItem={renderItem}
          keyExtractor={(item, index) => item.idMeal ? item.idMeal.toString() : index.toString()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    paddingVertical: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
    alignItems: 'center',
  },
  headerContent: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    paddingTop: 100,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  emptyText: {
    fontSize: 18,
    color: '#888',
    textAlign: 'center',
    marginTop: 50,
  },
  itemContainer: {
    marginBottom: 20,
    borderRadius: 15,
    backgroundColor: '#fff',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  textContainer: {
    padding: 15,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  subTitle: {
    fontSize: 16,
    color: '#555',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#444',
    marginTop: 10,
    marginBottom: 5,
  },
  ingredientText: {
    fontSize: 14,
    color: '#555',
    marginLeft: 10,
    marginBottom: 2,
  },
  deleteButton: {
    backgroundColor: '#f64e32',
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  searchContainer: {
    marginVertical: 16,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 15,
    shadowColor: '#000',
    borderColor: "#f96163",
    borderWidth: 1,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 10,
    color: '#000',
  },
});

export default FavoritesScreen;
