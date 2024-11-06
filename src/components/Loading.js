import React, { cloneElement } from 'react';
import {View,Text,Stylesheet, ActivityIndicator} from 'react-native';

function Loading(props){
 return (
     <View style={{justifyContent:'center',alignItems:'center',flex:1}}>
        <ActivityIndicator {...props}/>
       </View> 
);
}
export default Loading;
