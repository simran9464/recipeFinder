import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { View, Text,TextInput, StyleSheet, Button, ScrollView, TouchableOpacity, Share } from 'react-native';
import { CachedImage } from '../../utils/index';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon, ShareIcon } from "react-native-heroicons/solid";
import axios from 'axios';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { LinearGradient } from 'expo-linear-gradient';
import Loading from "../components/Loading";
import * as Speech from 'expo-speech';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RecipeDetails(props) {
  const item = props.route?.params || {};
  const navigation = useNavigation();
  const [meal, setMeal] = useState(null);
  const [isLoading, setisLoading] = useState(true);
  const [isFavourite, setFavourite] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // New state to manage editing mode
  const [editableInstructions, setEditableInstructions] = useState(''); // New state to hold editable instructions
  const saveInstructions = async () => {
    if (editableInstructions.trim()) {
      // Update the meal's instructions and save to AsyncStorage
      setMeal((prevMeal) => ({ ...prevMeal, strInstructions: editableInstructions }));
      await AsyncStorage.setItem(`instructions_${meal.idMeal}`, editableInstructions); // Save to AsyncStorage with meal ID
      setIsEditing(false);
    }
  };
  const startEditing = () => {
    setEditableInstructions(meal.strInstructions); 
    setIsEditing(true); 
  };
  const shareRecipe = async() =>{
    if(!meal)return;
    const ingredients =ingredientsIndexes(meal)
    .map(i => `${meal["strIngredient"+i]}-${meal["strMeasure"+i]}`)
    .join('\n');


    const message = `
    Recipe: ${meal.strMeal}
    Area: ${meal.strArea}
  
    Ingredients:
    ${ingredients}
    
    Instructions:
    ${meal.strInstructions}
  `;
      try{
        const result =await Share.share({
          message:message.trim(),
        });
        if(result.action === Share.sharedAction){
          if(result.activityType){
            console.log('Shared with activity type:',result.activityType);
          }else{
            console.log('Content shared successfully');
          }
        }else if(result.action === Share.dismissedAction){
          console.log('Share dismissed');
        }
      }catch(error){
        console.error('Error sharing content:', error.message);
      }
  }
  useEffect(() => {

    const checkIfFavorite = async() =>{
      const existingFavorites = await AsyncStorage.getItem('favorites');
      const favorites = existingFavorites ? JSON.parse(existingFavorites) : [];
      const isAlreadyFavorited = favorites.some(fav => fav.idMeal === item.idMeal);
      setFavourite(isAlreadyFavorited);
    };
    getMealData(item.idMeal);
    checkIfFavorite(); // Check if the meal is already a favorite
  }, []);


  
// Function to save the recipe to favorites
const saveToFavorites = async (recipe) => {
  try {
    const existingFavorites = await AsyncStorage.getItem('favorites');
    const favorites = existingFavorites ? JSON.parse(existingFavorites) : [];
    const isAlreadyFavorited = favorites.some(fav => fav.idMeal === recipe.idMeal);

    if (!isAlreadyFavorited) {
      // Include all relevant properties when saving
      const recipeData = {
        idMeal: recipe.idMeal,
        strMeal: recipe.strMeal,
        strMealThumb: recipe.strMealThumb,
        strArea: recipe.strArea,
        strInstructions: recipe.strInstructions,
        // Include ingredients and measures
        ...Array.from({ length: 20 }, (_, i) => ({
          [`strIngredient${i + 1}`]: recipe[`strIngredient${i + 1}`],
          [`strMeasure${i + 1}`]: recipe[`strMeasure${i + 1}`],
        })).reduce((acc, val) => ({ ...acc, ...val }), {}),
      };

      favorites.unshift(recipeData);
      await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
      console.log('Recipe added to favorites');
      setFavourite(true);
    } else {
      // Remove from favorites if it already exists
      const updatedFavorites = favorites.filter(fav => fav.idMeal !== recipe.idMeal);
      await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      console.log('Recipe removed from favorites');
      setFavourite(false);
    }
  } catch (error) {
    console.error('Error saving to favorites:', error);
  }
};


  const getMealData = async (id) => {
    try {
      const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      if (response && response.data) {
        setMeal(response.data.meals[0]);
        setisLoading(false);
      }
    } catch (error) {
      console.log(error.message);
    }
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

  const toggleInstructions = () => {
    if (isPlaying) {
      Speech.stop();
      setIsPlaying(false);
    } else {
      if (meal?.strInstructions) {
        Speech.speak(meal.strInstructions, {
          onDone: () => setIsPlaying(false),
        });
        setIsPlaying(true);
      }
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
      <StatusBar style="light" />

      <View style={styles.imageContainer}>
        <CachedImage
          uri={item.strMealThumb}
          sharedTransitionTag={item.strMeal}
          style={styles.image}
        />
        <LinearGradient
          colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.6)']}
          style={styles.overlay}
        />
      </View>

      <View style={styles.topButtons}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <ChevronLeftIcon name="chevron-left" size={heightPercentageToDP(3.4)} color="#f64e32" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            saveToFavorites(meal);
          }}
          style={styles.heartButton}
        >
          <HeartIcon
            name={isFavourite ? 'favorite' : 'favorite-border'}
            color={isFavourite ? "#f64e32" : "gray"}
            size={30}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.shareBtn}>
              <ShareIcon size={24} color='#f64e32'  onPress={shareRecipe}>

              </ShareIcon>
            </TouchableOpacity>
      </View>

      {isLoading ? (
        <Loading size={100} />
      ) : (
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{meal?.strMeal}</Text>
          <Text style={styles.area}>{meal?.strArea}</Text>

          <View style={styles.ingredientsContainer}>
            <Text style={styles.sectionTitle}>Ingredients</Text>
            {ingredientsIndexes(meal).map((i) => (
              <View style={styles.ingredientRow} key={i}>
                <View style={styles.ingredientBullet} />
                <Text style={styles.ingredientText}>{meal["strIngredient" + i]} - {meal["strMeasure" + i]}</Text>
              </View>
            ))}
          </View>

          <View style={styles.instructionsContainer}>
            <Text style={styles.sectionTitle}>Instructions</Text>
            <Button title={isPlaying ? "Pause Instructions" : "Listen to Instructions"} onPress={toggleInstructions} />
            <TouchableOpacity onPress={startEditing}>
                  <Text style={styles.editText}>Edit</Text>
                </TouchableOpacity>
            {isEditing ? (
              <View>
                <TextInput
                  style={styles.instructionsTextInput}
                  value={editableInstructions}
                  onChangeText={setEditableInstructions}
                  multiline
                  numberOfLines={4}
                />
                <Button title="Save Instructions" onPress={saveInstructions} />
              </View>
            ) : (
              <View>
                <Text style={styles.instructionsText}>{meal?.strInstructions}</Text>
                
              </View>
            )}
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  instructionsTextInput: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  editText: {
    fontSize: 16,
    color: '#f64e32',
    textDecorationLine: 'underline',
    marginTop:12
  },
  scrollContainer: { paddingBottom: 30 },
  imageContainer: { position: 'relative', width: '100%', height: heightPercentageToDP(45) },
  image: { width: '100%', height: '100%', borderRadius: 10 },
  overlay: { ...StyleSheet.absoluteFillObject, borderRadius: 10 },
  topButtons: { position: 'absolute', top: 40, left: 0, right: 0, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20 },
  backButton: { padding: 10, backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: 50, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 4 },
  heartButton: { padding: 10, backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: 50, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 4 },
  contentContainer: { padding: 20, backgroundColor: 'white', borderTopLeftRadius: 50, borderTopRightRadius: 50, marginTop: -46 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#333', marginBottom: 5 },
  area: { fontSize: heightPercentageToDP(3), color: '#555', marginBottom: 20, fontWeight: 'medium' },
  ingredientsContainer: { paddingHorizontal: 16, paddingTop: 8, backgroundColor: '#f9f9f9', borderRadius: 10, paddingVertical: 10 },
  sectionTitle: { fontSize: heightPercentageToDP(2.5), fontWeight: 'bold', marginBottom: 10 },
  ingredientRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 5, borderBottomWidth: 1, borderBottomColor: '#eee' },
  ingredientBullet: { height: heightPercentageToDP(1.5), width: heightPercentageToDP(1.5), backgroundColor: '#f64e32', borderRadius: 50, marginRight: 8 },
  ingredientText: { fontSize: heightPercentageToDP(1.7), color: '#333' },
  instructionsContainer: {
    paddingHorizontal: 16,
    paddingTop: 20,
    backgroundColor: '#ffffff',  // Lighter background for modern feel
    borderRadius: 12,  // Slightly more rounded corners
    paddingVertical: 20,
    shadowColor: '#000',  // Shadow for depth
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5, // For Android shadow support
    marginBottom: 20, // Space from other elements
    borderWidth: 1, // Adding a border for more definition
    borderColor: '#e0e0e0', // Light grey border color
  },
  
  

  instructionsText: {
    fontSize: heightPercentageToDP(2), // Adjusted font size for readability
    marginTop: 10,
    color: '#333', // Darker text for contrast
    lineHeight: 24, // More space between lines for better readability
    fontFamily: 'Roboto', // Use a modern, clean font family
    fontWeight: '500', // Medium weight for subtle emphasis
  },
  // instructionsContainer: { paddingHorizontal: 16, paddingTop: 16, backgroundColor: '#f9f9f9', borderRadius: 10, paddingVertical: 10 },
  shareBtn:{position:'absolute',right:20,top:60,backgroundColor:'white',borderRadius:50,padding:12},
  // instructionsText: { fontSize: heightPercentageToDP(1.8), marginTop: 8, color: '#333' },
});