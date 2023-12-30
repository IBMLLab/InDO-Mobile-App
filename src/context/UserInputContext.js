import createDataContext from './createDataContext';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { navigate } from "../navigationRef";

const userReducer = (state,action) => {
    switch(action.type){
        case 'add_err':
            return {errorMsg:action.payload}
        case 'add_success':
            return {errorMsg:'',successMsg:action.payload};
        case 'refresh':
            return {errorMsg:'',successMsg:''};
        default:
            return state;
    }
};

const userInputOnSubmit = (dispatch) => async ({insuline,mealTime,insulineTime}) => {
    try{
        const email = await AsyncStorage.getItem('email');
        const token = await AsyncStorage.getItem('token');

        let day = new Date();
        let date = day.toISOString().split('T')[0];
        const newInsulineTime = date+" "+insulineTime;
        const newMealTime = date+" "+mealTime;


        let axiosConfig = {
            headers: {
                'Authorization':`Bearer ${token}`,
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
            }
          };

          const postData = {
            patient_email:email,
            glucose_level:Math.random()*100,
            cho_level:Math.random(),
            insuline_level:insuline,
            meal_time:newMealTime,
            insuline_dose_time:newInsulineTime,
            sensor_time:newInsulineTime,
            physical_activity_level:1

        }

        const response = await axios.post('https://indoibml.com/api/report/add',postData,axiosConfig);
        if(response.data.error){
            dispatch({type:'add_err',payload:response.data.message});
        }
        else{
            dispatch({type:'add_success',payload:response.data.message});
            navigate('UserInput');
        }

    }catch(err){
        dispatch({type:'add_err',payload:"something went wrong"})
    }
}

const onSubmitRefresh = (dispatch) =>  () => {
    dispatch({type:'refresh'})
}


export const {Provider,Context} = createDataContext(
    userReducer,
    {userInputOnSubmit,onSubmitRefresh},
    {errorMsg:'',successMsg:''}
)