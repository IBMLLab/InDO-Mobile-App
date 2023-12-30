import React, { useState ,useContext,useCallback, useEffect} from 'react';
import {Text,View,StyleSheet,Image, TouchableOpacity,ScrollView,RefreshControl} from 'react-native';
import {Input,Button,Icon} from 'react-native-elements';
import { Context as FitbitUserContext} from '../context/FitbitUserContext';
import * as Linking from 'expo-linking';

import fitbit_image from '../../assets/Images/fitbit_activity_tracker.png'
 
 

const FitbitScreen = () => {
    const {state,fitbitConnect,emptyNotification} = useContext(FitbitUserContext);
    const [fitbitCode,setFitbitCode] = useState('');
    const [refreshing,setRefreshing] = useState(false);

   


    const onRefresh = useCallback(() => {
        setRefreshing(true);
        emptyNotification();
        setRefreshing(false);
        
    })

    return (
        <ScrollView 
        style={styles.viewStyle}
        vertical={true} 
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => {onRefresh();emptyNotification()}}/>}>
     
            
            <Image style={styles.fitbitStyle} source={fitbit_image} />
            <View>
            <Text style={styles.textStyle}>To connect your fitbit device follow these steps below:</Text>
            <Text style={styles.textStyle}>step-1 : Click on the below Link </Text>
            <Text
            style={{color: '#6C63FF',fontSize: 17,textAlign: 'center',  marginTop: 6,marginLeft: 25,
            marginBottom: 20}}
             onPress={ ()=> Linking.openURL('https://indoibml.com/api/patient/fitbit') }>indoibml.com/api/patient/fitbit</Text>
            <Text style={styles.textStyle}>step-2 : Generate a text by clicking on the yellow button on the site and copy paste the code to the given below field</Text>
            <Input
            leftIcon={{type:'font-awesome',size:20,marginTop:15,name:'key'}} 
            style={{marginLeft:10,}}
            value={fitbitCode}
            onChangeText={setFitbitCode}
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={true} 
            placeholder="key"/>
            <Text style={styles.textStyle}>step-3 : submit the text by clicking on the submit Button below</Text> 
            <TouchableOpacity onPress={() => fitbitConnect({fitbitCode})}>
                        <Text style={styles.buttonStyle}>submit</Text>
                </TouchableOpacity>
                {state.errorMessage ? <Text style={styles.errorStyle}>{state.errorMessage}</Text>:null}
                {state.successMessage ? <Text style={styles.successStyle}>{state.successMessage}</Text>:null}
            </View>
        </ScrollView>
    );
};


const styles = StyleSheet.create({
    viewStyle:{
        flex:1,
        backgroundColor:'white',
    },
    fitbitStyle:{
        width:253,
        height:143,
        alignSelf:'center',
        marginTop:20,

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
    successStyle:{
        marginTop:15,
       color:'green',
       fontWeight:'bold',
       fontSize:16,
       alignSelf:'center', 
    },
    textStyle:{
        margin:5,
        fontSize:14,
    }
});



export default FitbitScreen;