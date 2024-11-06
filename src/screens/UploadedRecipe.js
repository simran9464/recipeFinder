import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, Alert, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
        <View style={styles.container}>
            <Text style={styles.title}>Uploaded Recipes</Text>
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
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f2f2f2',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        marginBottom: 20,
    },
    recipeCard: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    recipeName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#4CAF50',
        marginBottom: 10,
    },
    recipeImage: {
        width: '100%',
        height: 150,
        borderRadius: 8,
        marginTop: 10,
    },
    recipeDetails: {
        fontSize: 15,
        color: '#666',
        marginTop: 5,
        lineHeight: 20,
    },
    deleteButton: {
        marginTop: 15,
        paddingVertical: 10,
        backgroundColor: '#FF6347',
        borderRadius: 8,
        alignItems: 'center',
    },
    deleteButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default UploadedRecipesScreen;
