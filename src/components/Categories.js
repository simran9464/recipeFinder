import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';

function Categories({ categories, activeCategory, handleChangeCategory }) {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {categories.map((category, index) => {
          let isActive = category.strCategory === activeCategory;
          let activeBtnStyle = isActive ? styles.activeButton : styles.inactiveButton;

          return (
            <TouchableOpacity
              key={index}
              style={styles.categoryWrapper} // Wrapper for the image and text
              onPress={() => handleChangeCategory(category.strCategory)}
            >
              <View style={[styles.categoryContainer, activeBtnStyle]}>
                <Image
                  source={{ uri: category.strCategoryThumb }}
                  style={styles.categoryImage}
                />
              </View>
              <Text style={styles.categoryText}>
                {category.strCategory}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  scrollContainer: {
    alignItems: 'center',
    paddingVertical: 8, // Less vertical padding
  },
  categoryWrapper: {
    alignItems: 'center',
    marginHorizontal: 6, // Space between categories
  },
  categoryContainer: {
    backgroundColor: '#fff',
    borderRadius: 40,
    padding: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 2, // Shadow effect for the image container
  },
  activeButton: {
    borderColor: '#f64e32',
    backgroundColor: '#f64e32',
    borderWidth: 3,
    transform: [{ scale: 1.0 }],
    

    shadowColor: '#f64e32',
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  inactiveButton: {
    backgroundColor: '#f0f0f0',
  },
  categoryImage: {
    width: 45, // Image size
    height: 45,
    borderRadius: 22.5, // Fully rounded image
  },
  categoryText: {
    marginTop: 8, // Space between image and text
    fontSize: 13, // Font size for the category name
    color: '#333',
    fontWeight: '500',
  },
});

export default Categories;
