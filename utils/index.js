import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Image } from "react-native"; // Use standard Image component

export const CachedImage = (props) => {
  const [cachedSource, setCachedSource] = useState(null);
  const { uri } = props;

  useEffect(() => {
    const getCachedImage = async () => {
      try {
        // Check if the image is already cached
        const cachedImageData = await AsyncStorage.getItem(uri);
        if (cachedImageData) {
          setCachedSource({ uri: cachedImageData });
        } else {
          // Fetch the image if not cached
          const response = await fetch(uri);
          const imageBlob = await response.blob();

          // Convert blob to base64
          const base64Data = await new Promise((resolve) => {
            const reader = new FileReader();
            reader.readAsDataURL(imageBlob);
            reader.onloadend = () => resolve(reader.result);
          });

          // Cache the image in AsyncStorage
          await AsyncStorage.setItem(uri, base64Data);
          setCachedSource({ uri: base64Data });
        }
      } catch (error) {
        console.error("Error caching image:", error);
        setCachedSource({ uri }); // Fallback to original URI if caching fails
      }
    };

    if (uri) {
      getCachedImage();
    }
  }, [uri]); // Add uri as a dependency

  return <Image source={cachedSource} {...props} />;
};
