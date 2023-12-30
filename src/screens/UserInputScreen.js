import React,{useState,useContext,useCallback} from 'react';
import {Text,View,StyleSheet,Image,TouchableOpacity,ScrollView,RefreshControl} from 'react-native';
import {Input} from 'react-native-elements';
import {Context as UserInputContext} from '../context/UserInputContext';

import pieGraph from '../../assets/Images/pie-graph-userInput.png';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';



const UserInputScreen = () => {
    const [mealIntake,setMealIntake] = useState('');
    const [mealTime,setMealTime] = useState('');
    const [insulineTime,setInsulineTime] = useState('');
    const [insuline,setInsuline] = useState(null);
    const {state,userInputOnSubmit,onSubmitRefresh} = useContext(UserInputContext);
    const [refreshing,setRefreshing] = useState(false);

    const handleReset = () => {
        setMealTime('');
        setInsulineTime('');
        setInsuline(null);
        setMealIntake(''); 
    }
    
    const onRefresh = useCallback(() => {
        onSubmitRefresh();
    })
    
    return (
        <ScrollView 
        vertical={true}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}>
            
            <Image style={styles.image}source={pieGraph}/>
            <Input
            label="Meal Intake"
            leftIcon={<Ionicons name="fast-food-outline" size={24} color="black" />}
            value={mealIntake}
            onChangeText={setMealIntake}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="apple,orange,burger" 
            />
            <Input
            label="Meal Time"
            leftIcon={<Ionicons name="time-outline" size={24} color="black" />}
            value={mealTime}
            onChangeText={setMealTime}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="enter time as HH:MM:SS"
            />
            <Input
            label="Insuline Dose Time"
            leftIcon={<MaterialCommunityIcons name="clock-alert-outline" size={24} color="black" />}
            value={insulineTime}
            onChangeText={setInsulineTime}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="HH:MM:SS" 
            />
            <Input
            label="Insuline Dose Size"
            leftIcon={<AntDesign name="barschart" size={24} color="black" />}
            value={insuline}
            onChangeText={setInsuline}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType='numeric'
            placeholder="ex 0.92"
            />
            <TouchableOpacity onPress={() => {userInputOnSubmit({insuline,mealTime,insulineTime});handleReset()}}>
                <View style={styles.viewStyle}>
                <Text style={styles.textStyle}>Submit</Text>
                </View>
            </TouchableOpacity>
            {state.errorMsg ?<Text style={styles.errorStyle}>{state.errorMsg}</Text>:null}
            {state.successMsg ? <Text style={styles.successStyle}>{state.successMsg}</Text>:null}

        </ScrollView>
    );
};


const styles = StyleSheet.create({
    image:{
        width:135,
        height:113,
        alignSelf:'center',
        marginTop:5,
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



export default UserInputScreen;