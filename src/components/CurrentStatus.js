import React,{useEffect,useState} from 'react';
import {View,Text,StyleSheet,Image,ActivityIndicator} from 'react-native';

import axios from 'axios';
import personalGoal from '../../assets/Images/personal_goal_img.png';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DefaultValue = 'NA';
const CurrentStatus = () => {
   const [errorMessage,setErrorMessage] = useState('');
   const [currentData,setCurrentData] = useState(null)

    const getDataLatest = async () => {
        try{
            const email = await AsyncStorage.getItem('email');
            const token = await AsyncStorage.getItem('token');
            let axiosConfig = {
                headers: {
                    'Authorization':`Bearer ${token}`,
                    'Content-Type': 'application/json;charset=UTF-8',
                    "Access-Control-Allow-Origin": "*",
                }
              };

            const postData = {
                email:email
            }
            
            const response = await axios.post('https://indoibml.com/api/report/latest',postData,axiosConfig);
        
            if(response.data.error){
                setErrorMessage(response.data.message);
            }
            else{
                setCurrentData(response.data.reports[0]);
                setErrorMessage("")    
            }
            
        }catch(err){
            
            setErrorMessage("something went wrong");
        }
    }


    useEffect(() => {
        getDataLatest();
    },[])
    
    if(!currentData){
        return (
        <View style={{justifyContent:'center',flex:1}}>
        <ActivityIndicator size="small" color="#6C63FF"/>
        <Text style={{alignSelf:'center'}}>Loading...</Text>
        </View>
       
        )
    }

   const result = currentData

    return (
       <View>
        <View style={styles.currentStatusStyle}>
        {errorMessage ? <Text style={styles.errorStyle}>{errorMessage}</Text> : null}
        <Text style={styles.textStyle}>
                    Glucose Level : {result.glucose_level.toFixed(3) ?result.glucose_level.toFixed(3):DefaultValue}
                    </Text>
                <Text style={styles.textStyle}>CHO Level : {result.cho_level.toFixed(3)}</Text>
                <Text style={styles.textStyle}>Insuline Dose Size : {result.insuline_level.toFixed(3)}</Text>
                <Text style={styles.textStyle}>Last Meal Time : {result.meal_time === null ?DefaultValue : result.meal_time.slice(11,19)}</Text>
                <Text style={styles.textStyle}>Insuline Dose Time : {result.sensor_time.slice(11,19)}</Text>
                <Text style={styles.textStyle}>Physical Activity : {result.physical_activity_level}</Text>
        </View>
        <Image style={styles.imageStyle} source={personalGoal}/>
       </View>
    )
}



const styles = StyleSheet.create({
    currentStatusStyle:{
        height:173,
        width:370,
        alignSelf:'center',
        borderRadius:20,
        opacity:0.5,
        // backgroundColor:'#6C63FF',
        marginTop:10,
    },
    imageStyle:{
        width:135,
        height:118,
        position:'absolute',
        marginLeft:260,
        borderBottomLeftRadius:20,
        marginTop:40
    },
    textStyle:{
        marginTop:5,
        fontSize:14,
        fontWeight:'bold',
        marginLeft:5,
    },
    errorStyle:{
        color:'red',
        alignSelf:'center',
        fontWeight:'bold',
        fontSize:16,
        marginTop:5
    },

});


export default CurrentStatus;