import React from 'react';
import {Text,StyleSheet,ScrollView, Dimensions} from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const chartConfig = 
    {
        backgroundColor: "#6C63FF",
        backgroundGradientFrom: "#6C63FF",
        backgroundGradientTo: "#6C63FF",
        decimalPlaces: 4, // optional, defaults to 2dp
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: {
        borderRadius: 16
        },
        propsForDots: {
        r: "3",
        strokeWidth: "2",
        stroke: "#ffa726"
        }
    }

const getData = function (data,key) {
    let arr = []
    for(let i=0;i<data.length;i++){
        arr.push(data[i][key]);  
    }
    return arr;
}

const getDataTime = function(data,key){
    let arr = []
    let count = 12;
    for(let i=0;i<data.length;i++){
        const dt = data[i][key].slice(11,16);
        
        if(count%12===0){
            arr.push(dt);
        }
        count++;
       
    }
    return arr;
}


const HealthChart = ({data,name,graph}) => {
    const graph_data = getData(data,graph);
    const graph_time = getDataTime(data,'sensor_time')
    return (
        <>
        <Text style={{fontWeight:'bold'}}>{name} :</Text>
        <ScrollView 
        showsHorizontalScrollIndicator={false} 
        horizontal={true} 
        maximumZoomScale={5} 
        minimumZoomScale={1}>
        <LineChart
        data={{
            labels:  graph_time,
            datasets: [
            {
                data: graph_data, 
            }
            ]
        }}
        // width={Dimensions.get('window').width} // from react-native
        width={900}
        height={200}
        // yAxisLabel="$"
        // yAxisSuffix="k"
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={chartConfig}
        bezier
        style={styles.chartStyle}
        />
        </ScrollView>
        </>

    )
};



const styles = StyleSheet.create({
    chartStyle:{
        marginVertical: 8,
        borderRadius: 5
    }
});


export default HealthChart;