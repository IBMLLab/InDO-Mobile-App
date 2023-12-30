import React,{useState,useEffect,useCallback} from 'react';
import {Text,View,StyleSheet,ScrollView,RefreshControl} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {navigate} from '../navigationRef';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign } from '@expo/vector-icons';
import * as SMS from 'expo-sms';

const SosScreen = () => {
    const [mobile1,setMobile1] = useState(null);
    const [mobile2,setMobile2] = useState(null);
    const [mobile3,setMobile3] = useState(null);
    const [errorMessage,setErrorMessage] = useState('');
    const [refreshing,setRefreshing] = useState(false);
    const [smsAvailable,setSmsAvailable] = useState(null);
    
    const getSosContact = async () => {
        try{
            const patient_id = await AsyncStorage.getItem('patientId');
            const token = await AsyncStorage.getItem('token')
          
            let axiosConfig = {
                headers: {
                    'Authorization':`Bearer ${token}`,
                    'Content-Type': 'application/json;charset=UTF-8',
                    "Access-Control-Allow-Origin": "*",
                }
              };
              
            const response = await axios.get(`https://indoibml.com/api/patient/sos?patient_id=${patient_id}`,axiosConfig);

              

              if(response.data.error){
                  setErrorMessage(response.data.Message);
              }
              else{
                  setErrorMessage('');
                  setMobile1(response.data.numbers.mobile_no_1);
                  setMobile2(response.data.numbers.mobile_no_2);
                  setMobile3(response.data.numbers.mobile_no_3);
              }

        }catch(err){
             
            setErrorMessage('something went wrong plz add your contacts or Refresh');
        }
    }
    useEffect(() => {
        getSosContact();
    },[])

    const onRefresh = useCallback(() => {
        getSosContact();
    })

    const sendSOS = async () => {
        const isAvailable = await SMS.isAvailableAsync();
        let arr = []
        if(mobile1){
            arr.push(mobile1.toString())
        }
        if(mobile2){
            arr.push(mobile2.toString())
        }
        if(mobile3){
            arr.push(mobile3.toString())
        }

            if (isAvailable) {
            // do your SMS stuff here
            const { result } = await SMS.sendSMSAsync(arr,
                'My health condition is not good,plz reach out to me ASAP');
                
            } 
            else {
            
             setSmsAvailable('SMS facility is not available in your device')
            }
    }

    return (
        <ScrollView
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>} 
        vertical={true}>
            
            <TouchableOpacity onPress={() => navigate('SOSContactAdd',{
                mob1:mobile1,
                mob2:mobile2,
                mob3:mobile3
            })}>
               <Text style={styles.textStyle}>Add or Edit Max 3 Contacts to your SOS List
               {<AntDesign name="addusergroup" size={24} color="black" />}</Text>
            </TouchableOpacity>
            <View style={styles.contactViewStyle}>
                 <AntDesign style={{alignSelf:'center',marginBottom:10,}} name="contacts" size={24} color="#6C63FF" />
                <Text style={styles.contactTextStyle}>Contact Number 1:  {mobile1}</Text>
                <Text style={styles.contactTextStyle}>Contact Number 2:  {mobile2}</Text>
                <Text style={styles.contactTextStyle}>Contact Number 3:  {mobile3}</Text>
            </View>
                <TouchableOpacity onPress={() => sendSOS()}>
                        <Text style={styles.buttonStyle}>Send SOS</Text>
                </TouchableOpacity>
                {errorMessage ? <Text style={styles.errorStyle}>{errorMessage}</Text>:null}
                {smsAvailable ? <Text style={styles.errorStyle}>{smsAvailable}</Text>:null}
            </ScrollView>
    );
};


const styles = StyleSheet.create({
    scrollViewStyle:{

    },
    textStyle:{
        backgroundColor:'#6C63FF',
        alignSelf:'center',
        padding:10,
        marginTop:30,
        color:'white',
    },
    contactViewStyle:{
        backgroundColor:'white',
        padding:40,
        borderRadius:30,
        marginTop:30,
        marginLeft:10,
        marginRight:10,
    },
    contactTextStyle:{
       marginTop:10,  
    },
    buttonStyle:{
        backgroundColor:'#6C63FF',
        marginTop:20,
        alignSelf:'center',
        padding:10,
        borderRadius:30,
        color:'white',
    },
    errorStyle:{
        marginTop:15,
        color:'red',
        fontWeight:'bold',
        fontSize:16,
        alignSelf:'center',
    },
    smsStyle:{
        marginTop:15,
        color:'grey',
        fontWeight:'bold',
        fontSize:12,
        alignSelf:'center',  
    }
});



export default SosScreen;