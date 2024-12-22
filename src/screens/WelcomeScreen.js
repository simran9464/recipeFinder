import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function WelcomeScreen() {
    const navigation = useNavigation();
    
    return (
        <ImageBackground
            source={require("../../assets/images/plate.jpg")}
            style={styles.container}
        >
            <View style={styles.overlay} />
            <Image 
                source={require("../../assets/images/main.png")} 
                style={styles.centralImage}
            />
            <Text style={styles.premiumText}>40K+ Premium Recipes</Text>
            <Text style={styles.titleText}>Cook Like a Chef</Text>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Main")}>
                <Text style={styles.buttonText}>Let's Go</Text>
            </TouchableOpacity>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.6)', 
    },
    centralImage: {
        width: 300, 
        height: 300,
        resizeMode: 'contain',
        marginBottom: 20,
    },
    premiumText: {
        borderWidth: 1,
        borderColor: 'red',
        color: '#f96163',
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 30,
        paddingVertical: 12,
        textAlign: 'center',
        paddingHorizontal: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        borderRadius: 10, 
    },
    titleText: {
        borderWidth: 1,
        borderColor: '#3c444c',
        fontSize: 42,
        fontWeight: 'bold',
        color: '#3c444c',
        textAlign: 'center',
        marginBottom: 30,
        paddingHorizontal: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.7)', 
        borderRadius: 10, 
    },
    button: {
        backgroundColor: '#f96163',
        borderRadius: 25,
        paddingVertical: 12,
        paddingHorizontal: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 5,
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
