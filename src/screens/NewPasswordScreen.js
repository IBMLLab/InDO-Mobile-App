import React, { useState } from 'react';
import {View,Text,StyleSheet,TouchableOpacity} from 'react-native';
import { navigate } from '../navigationRef';
import { Input } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';


const NewPasswordScreen = () => {
    const [password1,setPassword1] = useState('');
    const [password2,setPassword2] = useState('');
    const [errorMessage,setErrorMessage] = useState('');

    const onSubmit = async (password1) => {
        try{
            const token = await AsyncStorage.getItem('token');
            let axiosConfig = {
                headers: {
                    'Authorization':`Bearer ${token}`,
                    'Content-Type': 'application/json;charset=UTF-8',
                    "Access-Control-Allow-Origin": "*",
                }
              };
            
            let postData = {
                'password':password1
            }

            const response = await axios.patch('https://indoibml.com/api/auth/account/password',postData,axiosConfig);
        
            if(response.data.error){
                setErrorMessage(response.data.message);
            }
            else{
                navigate('Status');
            }

        }catch(err){
            setErrorMessage('something went wrong')
        }
    }


    const onError = () => {
        setErrorMessage('passwords you entered do not match with each other');
    }
    return (
        <View style={styles.viewStyle}>
            <Input
            label="Enter your new password"
            value={password1}
            onChangeText={setPassword1}
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={true}
            />
             <Input
            label="Enter your password again"
            value={password2}
            onChangeText={setPassword2}
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={true}
            />
             <TouchableOpacity onPress={() => {
                 if(password1 === password2){
                    onSubmit(password1)
                 }
                 else{
                     
                     onError();
                 }
             }}>
                <Text style={styles.submitButtonStyle}>Submit</Text>
            </TouchableOpacity>
            {errorMessage ? <Text style={styles.errorStyle}>{errorMessage}</Text>:null}
        </View>
    )
};


const styles = StyleSheet.create({
    viewStyle:{
        flex:1,
        backgroundColor:'white',
    },
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
});


export default NewPasswordScreen;