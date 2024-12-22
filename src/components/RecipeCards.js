import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { heightPercentageToDP } from 'react-native-responsive-screen';

export default function RecipeCards({ index, navigation, item }) {
  return (
    <View style={styles.container}>
      <Pressable
        style={styles.pressable}
        onPress={() => navigation.navigate("RecipeDetails", { ...item })}
      >
        <Image
          source={{ uri: item.strMealThumb }}
          style={[
            styles.image,
            { height: index % 3 === 0 ? heightPercentageToDP(25) : heightPercentageToDP(35) }
          ]}
        />
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.8)"]}
          style={styles.gradient}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
        />
        <Text style={styles.text}>
          {item.strMeal.length > 20 ? `${item.strMeal.slice(0, 20)}...` : item.strMeal}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  pressable: {
    width: '100%',
    paddingRight: 8,
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    borderRadius: 35,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
  gradient: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
    height: heightPercentageToDP(20),
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
  },
  text: {
    fontSize: 25,
    fontWeight: '600',
    color: 'white',
    position: 'absolute',
    bottom: 28,
    left: 8,
    maxWidth: '80%',
  },
});
