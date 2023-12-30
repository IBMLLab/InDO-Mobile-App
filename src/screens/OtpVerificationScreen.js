import React, { useState } from 'react';
import {Text,View,StyleSheet,TouchableOpacity} from 'react-native';
import { Input } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { navigate } from '../navigationRef';

const OtpVerificationScreen = ({navigation}) => {
    const email = navigation.getParam('email');

    const [otp,setOtp] = useState(null);
    const [errorMessage,setErrorMessage] = useState('');
     

    const onSubmit = async ({otp}) => {
        try{
            let axiosConfig = {
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                    "Access-Control-Allow-Origin": "*",
                }
              };
            
            let postData = {
                'email':email,
                'otp_code':otp
            }
            const response = await axios.put('https://indoibml.com/api/auth/account/otp',postData,axiosConfig);
            if(response.data.error){
                setErrorMessage(response.data.message);
            }
            else{
                setErrorMessage('');
                await AsyncStorage.setItem('token',response.data.token);
                await AsyncStorage.setItem('email',email);
                navigate('NewPassword');
            }
            
        }
        catch(err){
            setErrorMessage('something went wrong')
        }
    }

    return (
        <View style={{flex:1,backgroundColor:'white'}}>
           
            <Input
            label="Enter the OTP :"
            value={otp}
            onChangeText={setOtp}
            autoCapitalize="none"
            keyboardType="numeric"
            autoCorrect={false}
            />
            <TouchableOpacity onPress={() => onSubmit({otp})}>
                <Text style={styles.submitButtonStyle}>Submit</Text>
            </TouchableOpacity>
            {errorMessage ? <Text style={styles.errorStyle}>{errorMessage}</Text>:null}
            
        </View>
    )
};



const styles = StyleSheet.create({
    submitButtonStyle:{
        alignSelf:'center',
        padding:10,
        backgroundColor:'#6C63FF',
        borderRadius:20,
    },
    errorStyle:{
        color:'red',
        alignSelf:'center',
    },
    successStyle:{
        color:'grey',
        alignSelf:'center',
    }
});



export default OtpVerificationScreen;