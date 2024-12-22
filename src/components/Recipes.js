import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import RecipeCards from './RecipeCards';
import { useNavigation } from "@react-navigation/native";
import MasonryList from "@react-native-seoul/masonry-list";
import Loading from './Loading';

export default function Recipes({ meals, categories, getCategories }) {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>
                {meals.length} Recipes
            </Text>
            <View>
                {
                    categories.length === 0 || meals.length === 0 ? (
                        <Loading size="large" style={styles.loading} />
                    ) : (
                        <MasonryList
                            data={meals}
                            keyExtractor={(item) => item.idMeal}
                            numColumns={2}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item, i }) => (
                                <RecipeCards
                                    item={item}
                                    index={i}
                                    navigation={navigation}
                                    style={styles.recipeCard}
                                />
                            )}
                            onEndReachedThreshold={0.1}
                        />
                    )
                }
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 16,
        spaceY: 16,
    },
    headerText: {
        fontSize: 25,
        width: '100%',
    },
    loading: {
        marginTop: 20,
    },
    recipeCard: {
        width: '100%',
    },
});
