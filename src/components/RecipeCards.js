import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {View,Text,StyleSheet, Pressable,Image} from 'react-native';
import { heightPercentageToDP } from 'react-native-responsive-screen';

 export default function RecipeCards({index,navigation,item}){
 return (
     <View>
        <Pressable
        style={{
            width:'100%',
            paddingRight:8
        }}
        className="flex justify-center mb-4 space-y-1"
        onPress={()=> navigation.navigate("RecipeDetails",{...item})}
        >
                <Image
                source={{
                    uri:item.strMealThumb
                }}
                style={{
                    width:'100%',
                    borderRadius:35,
                    height: index %3 ==0 ? heightPercentageToDP(25)  :heightPercentageToDP(35),
                    
                }}className="bg-black/5 relative"
                />
                <LinearGradient
                colors={["transparent","rgba(0,0,0,0.8)"]}
                    style={{
                        position:'absolute',
                        width:"100%",
                        bottom:0,
                        height:heightPercentageToDP(20),
                        borderBottomLeftRadius:35,
                        borderBottomRightRadius:35
                    }}
                    start={{x:0.5,y:0}}
                    end={{x:0.5,y:1}}
                />
                <Text style={{fontSize:25}}
                className="font-semibold ml-2 text-white absolute bottom-7 left-2 max-w-[80%]"
                >
                    {item.strMeal.length > 20
                        ? item.strMeal.slice(0,20) + "..."
                        : item.strMeal
                     }
                </Text>
        </Pressable>
        
       </View> 
);
}

