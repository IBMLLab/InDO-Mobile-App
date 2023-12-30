import react, { useContext, useEffect, useState,useCallback } from 'react';
import {View,StyleSheet,Text,Image,TouchableOpacity,ActivityIndicator,ScrollView,RefreshControl} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Context as FitbitUserContext} from '../context/FitbitUserContext';
import {Input} from 'react-native-elements'
import {navigate} from "../navigationRef";
import axios from 'axios';




const FitbitUserProfileScreen = () => {
    const {state} = useContext(FitbitUserContext);
    const [errorMessage,setErrorMessage] = useState('');
    const [disconnectMessage,setDisconnectMessage] = useState('');
    const [syncMessage,setSyncMessage] = useState('');
    const [profile,setProfile] = useState(null);
    const [refreshing,setRefreshing] = useState(false);

   

    const fitbitDisconnect = async () => {
        try{
            const id = await AsyncStorage.getItem('patientId');
            const token = await AsyncStorage.getItem('token')
            const email = await AsyncStorage.getItem('email')

            const patient_id = parseInt(id)

            let axiosConfig = {
                headers: {
                    'Authorization':`Bearer ${token}`,
                    'Content-Type': 'application/json;charset=UTF-8',
                    "Access-Control-Allow-Origin": "*",
                }
                };
            
            const postData = {
                email:email,
                patient_id:patient_id,
            };
        const response = await axios.post('https://indoibml.com/physical-activity/api/disconnect',postData,axiosConfig);
        
        if(response.data.error){
            setErrorMessage(response.data.message)
        }
        else{
            //data
            setErrorMessage('');
            setSyncMessage('');
            setDisconnectMessage(response.data.message);
            await AsyncStorage.removeItem('fitbit');
            navigate('Fitbit');
        }


        }catch(err){
            setErrorMessage('something went wrong')
        }
        
    }
    
    const fitbitSync = async () => {
        try{
            const token = await AsyncStorage.getItem('token')
            const email = await AsyncStorage.getItem('email')

            let axiosConfig = {
                headers: {
                    'Authorization':`Bearer ${token}`,
                    'Content-Type': 'application/json;charset=UTF-8',
                    "Access-Control-Allow-Origin": "*",
                }
                };
            
            const postData = {
                email:email,
            };

        const response = await axios.post('https://indoibml.com/physical-activity/api/sync/data',postData,axiosConfig);

        if(response.data.error){
            setErrorMessage(response.data.message)
        }
        else{
            //data
            setErrorMessage('');
            setDisconnectMessage('');
            setSyncMessage(response.data.message)
        }


        }
        catch(err){
                setErrorMessage('something went wrong')
        }
        
    }

    const getUserProfile =  async () => {
        try{
            const token = await AsyncStorage.getItem('token')
            const email = await AsyncStorage.getItem('email')

            let axiosConfig = {
                headers: {
                    'Authorization':`Bearer ${token}`,
                    'Content-Type': 'application/json;charset=UTF-8',
                    "Access-Control-Allow-Origin": "*",
                }
                };
            
            const postData = {
                email:email,
            };

        const response = await axios.post('https://indoibml.com/physical-activity/api/profile',postData,axiosConfig);
     
        if(response.data.error){
            setErrorMessage(response.data.message)
        }
        else{
            //data
            setErrorMessage('');
            setDisconnectMessage('');
            setSyncMessage('');
            setProfile(response.data.user_profile)
        }

        }
        catch(err){
                setErrorMessage('something went wrong')
        }
        
    }

     useEffect(()=> {
        getUserProfile();
    },[])

    // if(syncMessage === ''){
    //     return (
    //     <View style={{justifyContent:'center',flex:1}}>
    //     <ActivityIndicator size="small" color="#6C63FF"/>
    //     <Text style={{alignSelf:'center'}}>Loading...</Text>
    //     </View>
       
    //     )
    // }

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        getUserProfile();
        setRefreshing(false);
        
    })

    return (
        <ScrollView 
        vertical={true} 
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}>
            <View style={styles.profileViewStyle}>
            <View>
               <Text style={styles.headingStyle}> Fitbit User Name :</Text>
               {profile != null?<Text style={styles.headingStyle}>{profile.display_name}</Text>:null}
            </View>
             {profile != null ? <Image style={styles.profileImage} source={{uri:profile.avatar}}/>:null}
          </View>
           
            <View style={styles.featureViewStyle}> 
            <TouchableOpacity onPress={() => navigate('UserProfile')}>
                <View style={styles.buttonView}>
                <Text style={styles.buttonTextStyle}>Back</Text>
                </View>  
          </TouchableOpacity>
            <TouchableOpacity onPress={() => fitbitSync()}>
                <View style={styles.buttonView}>
                <Text style={styles.buttonTextStyle}>Sync</Text>
                </View>  
          </TouchableOpacity>
          <TouchableOpacity onPress={() => fitbitDisconnect()}>
                <View style={styles.signOutButtonView}>
                <Text style={styles.buttonTextStyle}>Disconnect</Text>
                </View>  
          </TouchableOpacity>
          </View>
          {errorMessage ? <Text style={styles.errorStyle}>{errorMessage}</Text> : null} 
          {disconnectMessage ? <Text style={styles.disconnectStyle}>{disconnectMessage}</Text> : null} 
          {syncMessage ? <Text style={styles.disconnectStyle}>{syncMessage}</Text> : null} 
        </ScrollView>
    )
}



const styles = StyleSheet.create({
    buttonView:{
        backgroundColor:'#6C63FF',
        alignSelf:'center',
        width:100,
        height:40,
        alignItems:'center',
        borderRadius:30,
    },
    signOutButtonView:{
        backgroundColor:'red',
        alignSelf:'center',
        width:100,
        height:40,
        alignItems:'center',
        borderRadius:30,
    },
    buttonTextStyle:{
      marginTop:10,
      color:'white',  
    },
    featureViewStyle:{
        flexDirection:'row',
        justifyContent:'space-around',
        marginTop:40, 
    },
    errorStyle:{
        color:'red',
        alignSelf:'center',
        fontWeight:'bold',
        fontSize:16,
        marginTop:5
    },
    disconnectStyle:{
        alignSelf:'center',
        fontWeight:'bold',
        fontSize:16,
        marginTop:5,
        color:'#6C63FF' 
    },
    profileViewStyle:{
        backgroundColor:'white',
        marginTop:20,
        alignSelf:'center',
        width:370,
        height:180,
        borderRadius:30,
    },
    headingStyle:{
        marginTop:15,
        fontWeight:'bold',
        opacity:0.6,
        fontSize:16,
        marginLeft:10,
    },
    profileImage:{
        width:93,
        height:103,
        borderRadius:30,
        alignSelf:'flex-end',
        position:'absolute',
        marginTop:20,
        marginRight:20,
        
    },
});



export default FitbitUserProfileScreen;