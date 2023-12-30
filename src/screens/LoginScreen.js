import React,{useState,useContext} from 'react';
import {View,Text,StyleSheet,Image,TouchableOpacity} from 'react-native';
import {Input,Button,Icon} from 'react-native-elements';
import { Context as AuthContext } from '../context/AuthContext';
import { navigate } from '../navigationRef';

import Spacer from '../components/Spacer';
import LoginImage from '../../assets/Images/Login.png';

const LoginScreen = ({navigation}) => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const {state,signIn} = useContext(AuthContext);

    return (
        <View style={styles.viewStyle}>
            
            <Image style={styles.LoginImageStyle} source={LoginImage}/>
            <Input
             leftIcon={{type:'font-awesome',size:20,marginTop:15,name:'envelope'}}
             style={styles.userInputEmailViewStyle} 
             value={email}
             onChangeText={setEmail}
             autoCapitalize="none"
             autoCorrect={false}
             placeholder="Email"/>

            <Input
            leftIcon={{type:'font-awesome',size:20,marginTop:15,name:'key'}} 
            style={{marginLeft:10,}}
            value={password}
            onChangeText={setPassword}
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={true} 
            placeholder="password"/>
             
            {state.errorMessage ? <Text style={styles.errorMessage}>{state.errorMessage}</Text>: null}

            <View style={styles.submitStyle}>
            <TouchableOpacity 
            onPress={() => signIn({email,password})}>
                       <Text style={{fontSize:16,color:'white'}}>Log In</Text>
            </TouchableOpacity>
            </View>

           
              <TouchableOpacity onPress={()=> navigate('forgotPassword')}>
              <Text style={{alignSelf:'center',marginTop:10}}>
                  Forgot your password 
              <Text style={{textDecorationLine:'underline',color:'#6C63FF'}}>click here</Text>
              </Text>
                
              </TouchableOpacity>

            <Text style={{marginLeft:15,marginTop:15,}}>If you don't have an account, contact to one of our doctor.</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    viewStyle:{
        flex:1,
        backgroundColor:'white',
    },
    LoginImageStyle:{
       height:198,
       width:390,
       marginTop:10,
       alignSelf:'center',
       marginHorizontal:10, 
    },
    userInputEmailViewStyle:{
        marginTop:15,
        marginLeft:10,
        
    },
    submitStyle:{
        backgroundColor:'#6C63FF',
        height:40,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:20,
        marginHorizontal:90,
        marginTop:15, 
    },
    errorMessage:{
        fontSize:16,
        color:'red',
        marginLeft:10,
    }
});



export default LoginScreen;