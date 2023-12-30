import React, { useState ,useCallback} from 'react';
import {Text,StyleSheet,Image, TouchableOpacity, ScrollView,RefreshControl} from 'react-native';
import forgotPassword from '../../assets/Images/forgotPassword_img.png';
import { Input } from 'react-native-elements';
import axios from 'axios';
import { navigate } from '../navigationRef';


const ForgetPassword = () => {
    const [email,setEmail] = useState('');
    const [errorMessage,setErrorMessage] = useState('');
    const [successMessage,setSuccessMessage] = useState('');
    const [refreshing,setRefreshing] = useState(false);

    const onSubmit = async ({email}) => {
      try{
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
            }
          };
        
        let postData = {
            'email':email
        }
        const response = await axios.post('https://indoibml.com/api/auth/account/recover',postData,axiosConfig);
      
        if(response.data.error){
            setErrorMessage(response.data.message);
            setSuccessMessage('');
        }
        else{
            setErrorMessage('');
            setSuccessMessage(response.data.message);
            navigate('otpVerification',{email:email});
        } 
      }
      catch(err){
        setErrorMessage('something went wrong')
        setSuccessMessage('');
      }
    }

    const onRefresh = useCallback(() => {
          setRefreshing(false)
    })


    return (
        <ScrollView
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>} 
        vertical={true} 
        style={styles.viewStyle}>
            <Image style={styles.imageStyle} source={forgotPassword}/>
            <Input
            label="ENTER EMAIL ID OF YOUR REGISTERED ACCOUNT"
            leftIcon={{type:'font-awesome',size:24,color:'#6C63FF',name:'envelope'}}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            autoCorrect={false}
            />
            <TouchableOpacity onPress={() => onSubmit({email})}>
                <Text style={styles.submitButtonStyle}>Submit</Text>
            </TouchableOpacity>
            {errorMessage ? <Text style={styles.errorStyle}>{errorMessage}</Text>:null}
            {successMessage ? <Text style={styles.successStyle}>{successMessage}</Text>:null}
        </ScrollView>
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
    imageStyle:{
        width:268,
        height:210,
        alignSelf:'center',
        marginTop:30,
        marginBottom:20,

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


export default ForgetPassword;