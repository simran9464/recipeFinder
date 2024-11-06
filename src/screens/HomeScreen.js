import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, StatusBar, SafeAreaView, ScrollView, TouchableOpacity, Alert, Image, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; // Import LinearGradient for gradient effect
import { Bars3Icon, MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import Categories from '../components/Categories';
import axios from "axios";
import Recipes from '../components/Recipes';

export default function HomeScreen() {
  const [activeCategory, setActiveCategory] = useState('Beef');
  const [categories, setCategories] = useState([]);
  const [meals, setMeals] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (text) => {
    setSearchTerm(text);  // Update the search term
  };

  const filteredMeals = meals.filter((meal) =>
    meal.strMeal.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    getCategories();
    getRecipes();
  }, []);

  const handleChangeCategory = (category) => {
    getRecipes(category);
    setActiveCategory(category);
    setMeals([]);
  };

  const getCategories = async () => {
    try {
      const response = await axios.get(
        "https://www.themealdb.com/api/json/v1/1/categories.php"
      );
      if (response && response.data) {
        setCategories(response.data.categories);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const getRecipes = async (category = "Beef") => {
    try {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
      );
      if (response && response.data) {
        setMeals(response.data.meals);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const activeCategoryImage = categories.find((cat) => cat.strCategory === activeCategory)?.strCategoryThumb;

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <SafeAreaView>
        <ScrollView showsVerticalScrollIndicator={false}>
          <LinearGradient colors={['#f96163', '#ff8364']} style={styles.header}>
            <View style={styles.headerContent}>
              {activeCategoryImage && (
                <Image
                  source={{ uri: activeCategoryImage }}
                  style={styles.categoryImage}
                />
              )}
              <View style={styles.headerTextContainer}>
                <Text style={styles.headerText}>Recipe Findings</Text>
                <Text style={styles.subHeaderText}>{activeCategory} Recipes</Text>
              </View>
            </View>
          </LinearGradient>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>
              "Deliciously fast,
            </Text>
            <Text style={styles.titleSubText}> made just for you."</Text>
          </View>
          <View style={styles.searchContainer}>
            <View style={styles.searchInputContainer}>
              <MagnifyingGlassIcon color={"#f96163"} size={20} />
              <TextInput
                placeholder="Search Your Favourite Food"
                placeholderTextColor={"gray"}
                style={styles.searchInput}
                value={searchTerm}
                onChangeText={handleSearch}
              />
            </View>
          </View>
          <View>
            {categories.length > 0 && (
              <Categories
                categories={categories}
                activeCategory={activeCategory}
                handleChangeCategory={handleChangeCategory}
              />
            )}
          </View>
          {/* Recipes list start here */}
          <View>
            <Recipes meals={filteredMeals} categories={categories} />
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTextContainer: {
    marginLeft: 15,
  },
  headerText: {
    color: '#fff',
    fontSize: 26,
    fontWeight: 'bold',
  },
  subHeaderText: {
    color: '#fff',
    fontSize: 16,
    marginTop: 4,
  },
  categoryImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#fff',
    resizeMode: 'cover',
    marginLeft: 10,
  },
  titleContainer: {
    marginTop: 20,
    alignItems: 'flex-start',
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#ffffff',
    borderRadius: 15,
    marginHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#f96163',
    textAlign: 'start',
    marginBottom: 5,
  },
  titleSubText: {
    fontSize: 22,
    color: '#555',
    textAlign: 'left',
  },
  searchContainer: {
    marginTop: 20,
    paddingHorizontal: 15,
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
