import axios from 'axios';


export default axios.create({
    baseURL:'https://indoibml.com/api',
    headers:{
       'Content-Type':'application/json', 
    }
});