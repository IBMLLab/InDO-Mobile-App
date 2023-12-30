import React,{useState,useEffect,useCallback} from 'react';
import {Text,View,StyleSheet,Image,ActivityIndicator,ScrollView,RefreshControl} from 'react-native';
 
 

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import HealthChart from '../components/HealthChart';
import CurrentStatus from '../components/CurrentStatus';



const HistoryScreen = ({navigation}) => {

    const [errorMessage,setErrorMessage] = useState("");
    const [result,setResult] = useState(null);
    const [refreshing,setRefreshing] = useState(false);
    
 
     
    const getData = async () => {
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

            const response = await axios.post('https://indoibml.com/api/report/report/list',postData,axiosConfig);

            if(response.data.error){
                setErrorMessage(response.data.message);
            }
            else{
                setResult(response.data.reports);
                setErrorMessage("")    
            }
            
        }catch(err){
            
            setErrorMessage("something went wrong");
        }
    }
  

     
    useEffect(() => {
        getData();
    },[])

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        getData();
        setRefreshing(false);
    })

    if(!result){
        return (
        <View style={{justifyContent:'center',flex:1}}>
        <ActivityIndicator size="large" color="#6C63FF"/>
        <Text style={{alignSelf:'center'}}>Loading...</Text>
        </View>
       
        )
    }
   
    const res = result.reverse();
    return (
        <ScrollView 
        vertical={true} 
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}>
        {errorMessage ? <Text style={styles.errorStyle}>{errorMessage}</Text> : null}
        <Text style={{marginTop:5,marginLeft:2,fontWeight:'bold'}}>Current Status :</Text>
        <CurrentStatus/>
        <HealthChart data={res} name="Glucose Level" graph='glucose_level'/>
        <HealthChart data={res} name="CHO Level" graph='cho_level'/>
        <HealthChart data={res} name="Insuline Level" graph='insuline_level'/>
        </ScrollView>
    );
};


const styles = StyleSheet.create({
    errorStyle:{
        color:'red',
        alignSelf:'center',
        fontWeight:'bold',
        fontSize:16,
        marginTop:5
    },
});




export default HistoryScreen;