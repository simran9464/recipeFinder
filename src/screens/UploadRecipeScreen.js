import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, ScrollView, Image } from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient'; // Import the gradient

const UploadRecipeScreen = () => {
    const [name, setName] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [instructions, setInstructions] = useState('');
    

    const isFormComplete = name.trim() && ingredients.trim() && instructions.trim() ;
   // Format the ingredients and instructions
   const formatIngredients = (ingredients) => {
    return ingredients.split('\n').map(ingredient => `• ${ingredient}`).join('\n');
};

const formatInstructions = (instructions) => {
    return instructions.split('\n').map((instruction, index) => `${index + 1}. ${instruction}`).join('\n');
};

    const handleSaveRecipe = async () => {
        if (!isFormComplete) {
            Alert.alert("Incomplete Recipe", "Please fill in all fields before saving.");
            return;
        }

        try {
            const formattedIngredients = formatIngredients(ingredients);
            const formattedInstructions = formatInstructions(instructions);
            const newRecipe = {
                name,
                ingredients:formattedIngredients,
                instructions:formattedInstructions,
               
                createdAt: new Date().toISOString(),
            };
            const storedRecipes = await AsyncStorage.getItem('recipes');
            const recipes = storedRecipes ? JSON.parse(storedRecipes) : [];
            recipes.unshift(newRecipe);
            await AsyncStorage.setItem('recipes', JSON.stringify(recipes));
            Alert.alert("Success", "Recipe saved successfully!");
            setName('');
            setIngredients('');
            setInstructions('');
            
        } catch (error) {
            Alert.alert("Error", "Failed to save the recipe.");
            console.error(error);
        }
    };

    return (
        <LinearGradient
            colors={['#FFEFBA', '#FFFFFF']}  // Gradient from light yellow to white
            style={styles.container}
        >
            <LinearGradient colors={['#f96163', '#ff8364']} style={styles.header}>
           < Text style={styles.headerContent}>Upload Your Recipe</Text>
            </LinearGradient>
             
            <ScrollView contentContainerStyle={styles.scrollContainer}>
               
                <Text style={styles.label}>Recipe Name</Text>
                <TextInput
                    style={styles.input}
                    value={name}
                    onChangeText={setName}
                    placeholder="Enter recipe name"
                />

                <Text style={styles.label}>Ingredients</Text>
                <TextInput
                    style={[styles.input, styles.multilineInput]}
                    value={ingredients}
                    onChangeText={setIngredients}
                    placeholder="Enter ingredients"
                    multiline
                />

                <Text style={styles.label}>Instructions</Text>
                <TextInput
                    style={[styles.input, styles.multilineInput]}
                    value={instructions}
                    onChangeText={setInstructions}
                    placeholder="Enter instructions"
                    multiline
                />

             

              

                <TouchableOpacity  style={[styles.saveButton, isFormComplete && styles.saveButtonActive]} onPress={handleSaveRecipe}>
                    <Text style={styles.saveButtonText}>Save Recipe</Text>
                </TouchableOpacity>
            </ScrollView>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    saveButtonActive: {
        backgroundColor: '#4CAF50',  // Green color when form is complete
    },
    container: {
        flexGrow: 1,
        padding: 20,
        paddingTop:120,
    },
    scrollContainer: {
        paddingBottom: 40,
    },
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        paddingVertical: 35,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        backgroundColor: '#2c3e50', // Dark shade for header
        alignItems: 'center',
        shadowColor: '#2c3e50',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    headerContent: {
        color: 'white',  // White text for visibility on dark background
        fontSize: 20,
        fontWeight: 'bold',
    },
    label: {
        fontSize: 16,
        color: '#555',
        marginBottom: 5,
    },
    input: {
        backgroundColor: '#fff',
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
        fontSize: 16,
        color: '#333',
        marginBottom: 15,
    },
    multilineInput: {
        height: 100,
        textAlignVertical: 'top',
    },
    imagePickerButton: {
        backgroundColor: '#4CAF50', // Green button
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 15,
    },
    imagePickerButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    imagePreview: {
        width: '100%',
        height: 200,
        borderRadius: 8,
        marginBottom: 15,
    },
    saveButton: {
        backgroundColor: '#ff8364',  // Red for save button
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default UploadRecipeScreen;
