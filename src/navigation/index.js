import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import RecipeDetails from '../screens/RecipeDetails';
import FavoritesScreen from '../screens/FavoritesScreen'; // Ensure you have this screen created
import UploadRecipeScreen from '../screens/UploadRecipeScreen'; // Import the UploadRecipeScreen
import UploadedRecipesScreen from '../screens/UploadedRecipe'; // Import the UploadedRecipesScreen
import Ionicons from 'react-native-vector-icons/Ionicons'; 

// Create stack and tab navigators
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Home Tabs containing screens navigated via the tab navigator
const HomeTabs = () => (
    <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarIcon: ({ color, size }) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = 'home-outline'; // Icon for Home tab
        } else if (route.name === 'Favorites') {
          iconName = 'heart-outline'; // Icon for Favorites tab
        } else if (route.name === 'UploadRecipe') {
          iconName = 'add-circle-outline'; // Icon for UploadRecipe tab
        } else if (route.name === 'UploadedRecipes') {
          iconName = 'list-outline'; // Icon for UploadedRecipes tab
        }

        // Return the appropriate icon
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: 'red', // Active tab color
      tabBarInactiveTintColor: 'gray', // Inactive tab color
    })}
  >
    <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarLabel: 'Home' }} />
    <Tab.Screen name="Favorites" component={FavoritesScreen} options={{ tabBarLabel: 'Favorites' }} />
    <Tab.Screen name="UploadRecipe" component={UploadRecipeScreen} options={{ tabBarLabel: 'Upload' }} />
    <Tab.Screen name="UploadedRecipes" component={UploadedRecipesScreen} options={{ tabBarLabel: 'My Recipes' }} />
  </Tab.Navigator>
);

// Main App Navigation with Stack Navigation including WelcomeScreen
const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Main" component={HomeTabs} />
        <Stack.Screen name="RecipeDetails" component={RecipeDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
