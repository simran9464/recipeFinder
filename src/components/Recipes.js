import React from 'react';
import {View,Text,Stylesheet} from 'react-native';
import RecipeCards from './RecipeCards';
import {useNavigation} from "@react-navigation/native"
import MasonryList from "@react-native-seoul/masonry-list"
import Loading from './Loading';
export default function Recipes({meals,categories, getCategories}){
    const navigation =useNavigation();
 return (
     <View className="mx-4 space-y-4">
         <Text
         
         style={{
            fontSize:25,
            width:'100%'
         }}>
            {meals.length} Recipes

         </Text>
         <View>
            {
                categories.length==0 || meals.length ==0 ? (
                    <Loading size="large" className="mt-20"/>
                ):(
                    <MasonryList
                    data={meals} keyExtractor={(item)=>item.idMeal}
                    numColumns={2}
                    showsVerticalIndicator={false}
                    renderItem={({item,i})=>(
                    <RecipeCards item={item}
                    index={i}
                    navigation={navigation}
                    style={{width:'100%'}}
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

