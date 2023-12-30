import React,{useState,useEffect} from 'react';
import {Text,View,StyleSheet,ScrollView,TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Input} from 'react-native-elements';
import axios from 'axios';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

const UserProfileEdit = ({navigation}) => {
    const patient_height = navigation.getParam('patient_height')?navigation.getParam('patient_height'):null;
    const patient_weight = navigation.getParam('patient_weight')?navigation.getParam('patient_weight'):null;
    const patient_condition = navigation.getParam('patient_condition')?navigation.getParam('patient_condition'):'';
    const username = navigation.getParam('name')?navigation.getParam('name'):'';

    const [height,setHeight] = useState(patient_height);
    const [weight,setWeight] = useState(patient_weight);
    const [condition,setCondition] = useState(patient_condition);
    const [name,setName] = useState(username);
    const [errorMessage,setErrorMessage] = useState('');
    const [successMessage,setSuccessMessage] = useState('');



    const updateUserData = async ({height,weight,condition,name}) => {
        try{
            const token = await AsyncStorage.getItem('token');
            const id = await AsyncStorage.getItem('patientId');
            const patient_id = parseInt(id);

            let axiosConfig = {
                headers: {
                    'Authorization':`Bearer ${token}`,
                    'Content-Type': 'application/json;charset=UTF-8',
                    "Access-Control-Allow-Origin": "*",
                }
              };
              
            const postData = {
                 patient_id:patient_id,
                 patient_height:height,
                 patient_weight:weight,
                 patient_condition:condition,
                 User:{
                     name:name,
                 }
            };

            const response = await axios.patch('https://indoibml.com/api/patient/update',postData,axiosConfig);

            if(response.data.error){
                setErrorMessage(response.data.message);
            }
            else{
                setErrorMessage('');
                setSuccessMessage('Data Updated');
                setHeight(response.data.patient.patient_height)
                setWeight(response.data.patient.patient_weight)
                setCondition(response.data.patient.patient_condition)
                setName(response.data.patient.User.name)
                 
            }

        }catch(err){
            setErrorMessage('something went wrong')
        }
    }

 
    return (
        <ScrollView  vertical={true}>
            <Text></Text>
            <Input
            label="Height"
            leftIcon={<MaterialCommunityIcons name="human-male-height" size={24} color="black" />}
            value={height}
            onChangeText={setHeight}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType='numeric'
            placeholder={height} 
            />
            <Input
            label="Weight"
            leftIcon={<FontAwesome5 name="weight" size={24} color="black" />}
            value={weight}
            onChangeText={setWeight}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType='numeric'
            placeholder={weight} 
            />
            <Input
            label="Condition"
            leftIcon={<MaterialCommunityIcons name="state-machine" size={24} color="black" />}
            value={condition}
            onChangeText={setCondition}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder={condition} 
            />
            <Input
            label="User Name"
            leftIcon={<AntDesign name="user" size={24} color="black" />}
            value={name}
            onChangeText={setName}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder={name} 
            />
            <TouchableOpacity onPress={() => {updateUserData({height,weight,condition,name})}}>
            <View style={styles.viewStyle}>
                <Text style={styles.textStyle}>Update</Text>
                </View>
            </TouchableOpacity>
            {errorMessage ?<Text style={styles.errorStyle}>{errorMessage}</Text>:null}
            {successMessage ? <Text style={styles.successStyle}>{successMessage}</Text>:null}
        </ScrollView>
    )
};





const styles = StyleSheet.create({
    scrollViewStyle:{
        flex:1,
        backgroundColor:'white',
    },
    textStyle:{
        color:'white',
        marginTop:3
    },
    viewStyle:{
        width:124,
        height:29,
        alignSelf:'center',
        backgroundColor:'#6C63FF',
        borderRadius:30,
        alignItems:'center'
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


export default UserProfileEdit;