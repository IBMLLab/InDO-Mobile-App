import createDataContext from "./createDataContext";
import indoAPI from "../api/indoAPI";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { navigate } from "../navigationRef";


const authReducer = (state,action) => {
    switch(action.type){
        case 'add_error':
          return {...state,errorMessage:action.payload}
        case 'signin':
            return {errorMessage:'',token:action.payload};
        case 'signOut':
            return {token:null,errorMessage:''}  
        default:
            return state;
    }
};


const tryLocalSignin = dispatch => async () => {
    const token = await AsyncStorage.getItem('token');
    if(token){
        dispatch({type:'signin',payload:token});
        navigate('Status');
    }else{
        navigate('loginFlow')
    }
}


const signIn = (dispatch) => {
    return async ({email,password}) => {
        //make api request to sign in with that email and password
        //if we signed in, modify our state, and say that we are authenticated
        // if signing in fails, we probably need to reflect an error message some where
        try{
             
            const response = await indoAPI.post('/auth/account',{email,password});
            
            if(response.data.error){
                dispatch({type:'add_error',payload:response.data.message})
            }
            else{
                await AsyncStorage.setItem('token',response.data.token);
                await AsyncStorage.setItem('email',email);
                dispatch({type:'signin',payload:response.data.token});
                navigate('Status'); 
            }
            
        }catch(err){
            dispatch({type:'add_error',payload:'something went wrong'})
        }
    };
};


const signOut = (dispatch) => {
    return async () => {
        // signout
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('email');
        await AsyncStorage.removeItem('patientId');
        dispatch({type:'signOut'});
        navigate('loginFlow')
    }
}


export const {Provider,Context} = createDataContext(
    authReducer,
    {signIn,signOut,tryLocalSignin},
    {token:null,errorMessage:''}
);