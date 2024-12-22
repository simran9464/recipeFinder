import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, Alert, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
const UploadedRecipesScreen = () => {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        loadRecipes();
    }, []);

    const loadRecipes = async () => {
        try {
            const storedRecipes = await AsyncStorage.getItem('recipes');
            const parsedRecipes = storedRecipes ? JSON.parse(storedRecipes) : [];
            setRecipes(parsedRecipes);
        } catch (error) {
            Alert.alert("Error", "Failed to load recipes.");
            console.error(error);
        }
    };

    const handleDeleteRecipe = async (index) => {
        try {
            const updatedRecipes = recipes.filter((_, i) => i !== index);
            setRecipes(updatedRecipes);
            await AsyncStorage.setItem('recipes', JSON.stringify(updatedRecipes));
            Alert.alert("Success", "Recipe deleted successfully!");
        } catch (error) {
            Alert.alert("Error", "Failed to delete recipe.");
            console.error(error);
        }
    };

    return (
        // Using ImageBackground with an overlay for darkening effect
        <ImageBackground
        source={require("../../assets/images/plate.jpg")}  
            style={styles.container}
        >
            {/* Semi-transparent black overlay */}
            <View style={styles.overlay}></View>

            <LinearGradient colors={['#f96163', '#ff8364']} style={styles.header}>
      <Text style={styles. headerContent}>My Recipes</Text>
      </LinearGradient>
            <FlatList
                data={recipes}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                    <View style={styles.recipeCard}>
                        <Text style={styles.recipeName}>{item.name}</Text>
                        {item.imageUri && (
                            <Image source={{ uri: item.imageUri }} style={styles.recipeImage} />
                        )}
                        <Text style={styles.recipeDetails}>Ingredients: {item.ingredients}</Text>
                        <Text style={styles.recipeDetails}>Instructions: {item.instructions}</Text>
                        <TouchableOpacity
                            style={styles.deleteButton}
                            onPress={() => handleDeleteRecipe(index)}
                        >
                            <Text style={styles.deleteButtonText}>Delete Recipe</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        paddingTop:120,
        justifyContent: 'flex-start', 
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.4)', 
    },
    title: {
        fontSize: 34, 
        fontWeight: 'bold', 
        color: '#ffffff', 
        textAlign: 'center',
        marginBottom: 30,
        fontFamily: 'Roboto', 
        textShadowColor: '#000', 
        textShadowOffset: { width: 1, height: 1 }, 
        textShadowRadius: 5, 
        letterSpacing: 1, 
        zIndex: 2, 
    },
    
    recipeCard: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)', 
        padding: 20,
        borderRadius: 15,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 8,
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#e2e2e2',
        overflow: 'hidden',
    },
    recipeName: {
        fontSize: 20,
        fontWeight: '600',
        color: '#4CAF50',
        marginBottom: 10,
        fontFamily: 'Roboto',
    },
    recipeImage: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        marginTop: 10,
        marginBottom: 15,
    },
    recipeDetails: {
        fontSize: 16,
        color: '#7f8c8d',
        marginTop: 5,
        lineHeight: 22,
        fontFamily: 'Roboto',
    },
    deleteButton: {
        marginTop: 15,
        paddingVertical: 12,
        backgroundColor: '#FF6347',
        borderRadius: 12,
        alignItems: 'center',
        elevation: 5,
    },
    deleteButtonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 16,
        textTransform: 'uppercase',
    },
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
});

export default UploadedRecipesScreen;
