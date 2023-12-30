import React from 'react';
import {Text,View,StyleSheet,Image,TouchableOpacity} from 'react-native';

import StartSvg from '../../assets/svg/startSvg.svg';
import startPhoto from '../../assets/Images/medicine.png';
 

const StartScreen = ({navigation}) => {
    return (
        <View style={styles.viewStyle}>
            <Image style={styles.image} source={startPhoto}/>
            <View style={styles.getStarted}>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                       <Text style={styles.textStyle}>Get Started</Text>
            </TouchableOpacity>
            </View>
        </View>
    );
};



const styles = StyleSheet.create({

    viewStyle:{
        backgroundColor:'white',
        flex:1,
    },
    getStarted:{
        backgroundColor:'#6C63FF',
        height:40,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:20,
        marginHorizontal:90,
        marginTop:80,

    },

    textStyle:{
        color:'white',
        fontSize:16,
    },

    image:{
        height:328,
        width:426,
        alignSelf:'center',
        marginVertical:50,
    }
});


export default StartScreen;