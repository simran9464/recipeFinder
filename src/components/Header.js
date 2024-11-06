// Header.js
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ShareIcon } from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function Header({
  appName = "MyApp",
  categoryLogo,
  categoryName,
  onShare,
  isFavourite = false,
  onToggleFavorite,
  showShareButton = true,
  showFavoriteButton = true,
}) {
  const navigation = useNavigation();

  return (
    <View style={styles.headerContainer}>
      {/* Category Logo and Name */}
      <View style={styles.leftSection}>
        {categoryLogo && (
          <Image source={categoryLogo} style={styles.categoryLogo} />
        )}
        {categoryName && (
          <Text style={styles.categoryName}>{categoryName}</Text>
        )}
      </View>

      {/* App Name */}
      <Text style={styles.appName}>{appName}</Text>

      {/* Right Icons */}
      <View style={styles.rightIcons}>
        {showFavoriteButton && (
          <TouchableOpacity style={styles.iconButton} onPress={onToggleFavorite}>
            <HeartIcon color={isFavourite ? "#f64e32" : "gray"} size={hp(3)} />
          </TouchableOpacity>
        )}
        {showShareButton && (
          <TouchableOpacity style={styles.iconButton} onPress={onShare}>
            <ShareIcon size={hp(3)} color="#f64e32" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryLogo: {
    width: hp(3),
    height: hp(3),
    marginRight: 8,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  appName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    textAlign: 'center',
  },
  rightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
});
