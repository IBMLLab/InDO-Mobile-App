import React,{useContext,useState,useEffect,useCallback} from 'react';
import {Text,View,StyleSheet,ActivityIndicator,TouchableOpacity,Image,ScrollView,RefreshControl} from 'react-native';
import Spacer from '../components/Spacer';
import { Context as AuthContext } from '../context/AuthContext';
import { Context as FitbitUserContext} from '../context/FitbitUserContext';
import { navigate } from '../navigationRef';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import profile from "../../assets/Images/profile_img.jpg";
import yoga from "../../assets/Images/yoga_pic.png";

const UserProfileScreen = () => {
    const {signOut} =useContext(AuthContext);
    const {tryFitbitSignIn} = useContext(FitbitUserContext);
    const [docId,setDocId] = useState(null);
    const [data,setData] = useState(false);
    const [userName,setUserName] = useState('');
    const [doctor,setDoctor] = useState('');
    const [height,setHeight] = useState(null);
    const [weight,setWeight] = useState(null);
    const [condition,setCondition] = useState('');
    const [errorMsg,setErrorMsg] = useState('');
    const [refreshing,setRefreshing] = useState(false);

   
    const getUserData = async () => {
        try{
            const token = await AsyncStorage.getItem('token');
            let axiosConfig = {
                headers: {
                    'Authorization':`Bearer ${token}`,
                    'Content-Type': 'application/json;charset=UTF-8',
                    "Access-Control-Allow-Origin": "*",
                }
              };
              const response = await axios.get('https://indoibml.com/api/patient/profile',axiosConfig);
               
              if(response.data.error){
                  setErrorMsg('response.data.message');
              }
              else{
                  
                  const patient_id = response.data.patient.patient_id.toString();
                
                  await AsyncStorage.setItem('patientId',patient_id);
                  setErrorMsg('');
                  setUserName(response.data.patient.User.name);
                  setHeight(response.data.patient.patient_height);
                  setWeight(response.data.patient.patient_weight);
                  setCondition(response.data.patient.patient_condition);
                  setDocId(response.data.patient.Doctor);
                  setData(true);
              }

        }catch(err){
            setErrorMsg('something went wrong')
        }
    }

    const getDocData = async () => {
        try{
            const token = await AsyncStorage.getItem('token');
           
            let axiosConfig = {
                headers: {
                    'Authorization':`Bearer ${token}`,
                    'Content-Type': 'application/json;charset=UTF-8',
                    "Access-Control-Allow-Origin": "*",
                }
              };
            const response = await axios.get(`https://indoibml.com/api/doctor/profile?doctor_id=${docId}`,axiosConfig);
           if(response.data.error){
               setErrorMsg(response.data.message);
           }else{
               setErrorMsg('');
               setDoctor(response.data.doctor.User.name);
           }

        }catch(err){
            setErrorMsg('something went wrong')
        }
    }
    useEffect(() => {
        getUserData();
        
    },[])

    useEffect(() => {
        getDocData();
    },[docId])

    const onRefresh = useCallback(() => {
        getUserData();
    })
     

    if(!data){
        return (
            <View style={{justifyContent:'center',flex:1}}>
            <ActivityIndicator size="large" color="#6C63FF"/>
            <Text style={{alignSelf:'center'}}>Loading...</Text> 
            <TouchableOpacity onPress={() => signOut()}>
                <View style={styles.signOutButtonView}>
                <Text style={styles.buttonTextStyle}>Sign Out</Text>
                </View>  
          </TouchableOpacity> 
            </View>
        )
    }


    return (
        <ScrollView 
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
        vertical={true} 
        style={styles.viewStyle}>
            <View style={styles.profileViewStyle}>
             <View>
                <Text style={styles.headingStyle}>User Name :</Text>
                <Text style={styles.profileTextStyle}>{userName}</Text>
                <Text style={styles.headingStyle}>Associated Doctor:</Text>
                <Text style={styles.profileTextStyle}>Dr.{doctor}</Text>
             </View>
             <Image style={styles.profileImage} source={profile}/>
          </View>
            <View style={styles.profileViewStyle}>
             <View>
                <Text style={styles.headingStyle}>Height :</Text>
                <Text style={styles.profileTextStyle}>{height}</Text>
                <Text style={styles.headingStyle}>Weight :</Text>
                <Text style={styles.profileTextStyle}>{weight}</Text>
                <Text style={styles.headingStyle}>Condition :</Text>
                <Text style={styles.profileTextStyle}>{condition}</Text>
             </View>
             <Image style={styles.profileImage} source={yoga}/>
          </View>
            <Spacer>
            <TouchableOpacity onPress={() => navigate('UserProfileEdit',{
                patient_height:height,
                patient_weight:weight,
                patient_condition:condition,
                name:userName
            })}>
                <View style={styles.buttonView}>
                <Text style={styles.buttonTextStyle}>Edit Profile</Text>
                </View>  
          </TouchableOpacity>
            </Spacer>
            <Spacer/>
            {errorMsg ? <Text style={styles.errorStyle}>{errorMsg}</Text> : null}
            <View style={styles.featureViewStyle}>
            
            <TouchableOpacity onPress={() => tryFitbitSignIn()}>
                <View style={styles.buttonView}>
                <Text style={styles.buttonTextStyle}>Fitbit Connect</Text>
                </View>  
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigate('GoogleFit')}>
                <View style={styles.buttonView}>
                <Text style={styles.buttonTextStyle}>Google Fit</Text>
                </View>  
          </TouchableOpacity>
          <TouchableOpacity onPress={() => signOut()}>
                <View style={styles.signOutButtonView}>
                <Text style={styles.buttonTextStyle}>Sign Out</Text>
                </View>  
          </TouchableOpacity> 
            </View>
            
        </ScrollView>
       
    );
};


const styles = StyleSheet.create({
    viewStyle:{

    },
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
    profileImage:{
        width:93,
        height:103,
        borderRadius:30,
        alignSelf:'flex-end',
        position:'absolute',
        marginTop:20,
        
    },
    headingStyle:{
        marginTop:15,
        fontWeight:'bold',
        opacity:0.6,
        fontSize:16,
        marginLeft:10,
    },
    profileTextStyle:{
        marginLeft:15,
    },
    profileViewStyle:{
        backgroundColor:'white',
        marginTop:20,
        alignSelf:'center',
        width:370,
        height:180,
        borderRadius:30,
    },
    featureViewStyle:{
        flexDirection:'row',
        justifyContent:'space-around',
        marginTop:40, 
    },
    errorStyle:{
        marginTop:15,
        color:'red',
        fontWeight:'bold',
        fontSize:16,
        alignSelf:'center',
    },
    
});



export default UserProfileScreen;