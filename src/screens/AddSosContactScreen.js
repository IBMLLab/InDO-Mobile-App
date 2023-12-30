import React,{useState,useEffect} from 'react';
import {Text,View,StyleSheet,TouchableOpacity,ScrollView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Input} from 'react-native-elements';
import axios from 'axios';

import { Entypo } from '@expo/vector-icons';

const AddSosContactScreen = ({navigation}) => {
    const mob1 = navigation.getParam('mob1')?navigation.getParam('mob1'):null;
    const mob2 = navigation.getParam('mob2')?navigation.getParam('mob2'):null;
    const mob3 = navigation.getParam('mob3')?navigation.getParam('mob3'):null;
   
   
    const [mobile1,setMobile1] = useState(mob1);
    const [mobile2,setMobile2] = useState(mob2);
    const [mobile3,setMobile3] = useState(mob3);
    const [errorMessage,setErrorMessage] = useState('');
    const [successMessage,setSuccessMessage] = useState('');

    const addNumbers = async ({mobile1,mobile2,mobile3}) => {
        try{
            const id = await AsyncStorage.getItem('patientId');
            const patient_id = parseInt(id);
            const token = await AsyncStorage.getItem('token')
            const newMob1 = parseInt(mobile1);
            const newMob2 = parseInt(mobile2);
            const newMob3 = parseInt(mobile3);
            
           
            let axiosConfig = {
                headers: {
                    'Authorization':`Bearer ${token}`,
                    'Content-Type': 'application/json;charset=UTF-8',
                    "Access-Control-Allow-Origin": "*",
                }
              };

              
              const postData = {
                  "patient_id":patient_id,
                  "mobile_no_1":newMob1,
                  "mobile_no_2":newMob2,
                  "mobile_no_3":newMob3
              };
              
          
            const response = await axios.post(`https://indoibml.com/api/patient/sos/numbers`,postData,axiosConfig);

              if(response.data.error){
                  setErrorMessage(response.data.Message);
              }
              else{
                  setErrorMessage('');
                  setSuccessMessage(response.data.message)
              }

        }catch(err){
            setErrorMessage('something went wrong');
        }
    };




    const updateNumbers = async ({mobile1,mobile2,mobile3}) => {
        try{
            const id = await AsyncStorage.getItem('patientId');
            const patient_id = parseInt(id);
            const token = await AsyncStorage.getItem('token')
            const newMob1 = parseInt(mobile1);
            const newMob2 = parseInt(mobile2);
            const newMob3 = parseInt(mobile3);
            
           
            let axiosConfig = {
                headers: {
                    'Authorization':`Bearer ${token}`,
                    'Content-Type': 'application/json;charset=UTF-8',
                    "Access-Control-Allow-Origin": "*",
                }
              };

              
              const postData = {
                  "patient_id":patient_id,
                  "mobile_no_1":newMob1,
                  "mobile_no_2":newMob2,
                  "mobile_no_3":newMob3
              };
              
              
            const response = await axios.patch(`https://indoibml.com/api/patient/sos/numbers/update`,postData,axiosConfig);

              if(response.data.error){
                  setErrorMessage(response.data.Message);
              }
              else{
                  setErrorMessage('');
                  setSuccessMessage('Data updated')
              }

        }catch(err){
            
            setErrorMessage('something went wrong');
        }
    };

    const onSubmit = () =>{
        setErrorMessage('');
    }


    return (
        <View>
          <Input
          label="Mobile Number-1"
          leftIcon={<Entypo name="mobile" size={24} color="black" />}
          Value={mobile1}
          onChangeText={setMobile1}
          keyboardType='numeric'
          autoCapitalize="none"
          autoCorrect={false}
          />
          <Input
          label="Mobile Number-2"
          leftIcon={<Entypo name="mobile" size={24} color="black" />}
          Value={mobile2}
          onChangeText={setMobile2}
          keyboardType='numeric'
          autoCapitalize="none"
          autoCorrect={false}
          
          />
          <Input
          label="Mobile Number-3"
          leftIcon={<Entypo name="mobile" size={24} color="black" />}
          Value={mobile3}
          onChangeText={setMobile3}
          keyboardType='numeric'
          autoCapitalize="none"
          autoCorrect={false}
          
          />
           <TouchableOpacity onPress={() => {
               if(mob1==null && mob2==null && mob3 == null){
                    addNumbers({mobile1,mobile2,mobile3});
                    onSubmit()
               }
               else{
                updateNumbers({mobile1,mobile2,mobile3});
                onSubmit()
               }
            }
               }>
                <Text style={styles.buttonStyle}>submit</Text>
                </TouchableOpacity>
                {errorMessage ? <Text style={styles.errorStyle}>{errorMessage}</Text>:null}
                {successMessage ? <Text style={styles.successStyle}>{successMessage}</Text>:null}
        </View>
    )
};



const styles = StyleSheet.create({
    buttonStyle:{
        backgroundColor:'#6C63FF',
        marginTop:20,
        alignSelf:'center',
        padding:10,
        color:'white',
        borderRadius:30
    },
    errorStyle:{
        marginTop:15,
        color:'red',
        fontWeight:'bold',
        fontSize:16,
        alignSelf:'center',
    },
    successStyle:{
        marginTop:15,
       color:'green',
       fontWeight:'bold',
       fontSize:16,
       alignSelf:'center', 
    }
});



export default AddSosContactScreen;