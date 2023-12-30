import createDataContext from "./createDataContext";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {navigate} from "../navigationRef";

const useReducer = (state,action) => {
    switch(action.type){
        case 'add_error':
            return {errorMessage:action.payload,successMessage:''};
        case 'add_success':
            return {errorMessage:'',successMessage:action.payload};
        case 'empty_notification':
            return {errorMessage:'',successMessage:''};
        default:
            return state;
    }
}

const fitbitConnect =  (dispatch) => {
        return async ({fitbitCode}) => {
            try{
                const patient_id = await AsyncStorage.getItem('patientId');
                const token = await AsyncStorage.getItem('token')
                const email = await AsyncStorage.getItem('email')
    
                let axiosConfig = {
                    headers: {
                        'Authorization':`Bearer ${token}`,
                        'Content-Type': 'application/json;charset=UTF-8',
                        "Access-Control-Allow-Origin": "*",
                    }
                  };
              
                const postData = {
                    email:email,
                    patient_id:patient_id,
                    code:fitbitCode
               };
    
            const response = await axios.post('https://indoibml.com/physical-activity/api/add',postData,axiosConfig); 

            if(response.data.error){
                dispatch({type:'add_error',payload:response.data.message})
            }
            else{
                dispatch({type:'add_success',payload:response.data.message})
                await AsyncStorage.setItem('fitbit','true')
                navigate('FitbitUserProfile')
                 
            }
    
            }catch(err){
                // console.log(err)
                dispatch({type:'add_error',payload:'something went wrong while adding your fitbit device'})
            }
        }
}

const tryFitbitSignIn = dispatch  => async () => {
    const condition = await AsyncStorage.getItem('fitbit');
    if(condition === 'true'){
        navigate('FitbitUserProfile');
    }
    else{
        navigate('Fitbit');
    }
}

const emptyNotification = dispatch => async () => {
    dispatch({type:'empty_notification',payload:null})
}




export const {Provider,Context} = createDataContext(
    useReducer,
    {fitbitConnect,tryFitbitSignIn,emptyNotification},
    {errorMessage:'',successMessage:''}
)