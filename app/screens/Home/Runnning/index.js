import React, { useState} from "react";
import { View, Text, Pressable, StyleSheet, TextInput } from 'react-native';
import { Avatar } from 'react-native-elements';
import Styles from './styles';
import colors from "@/constants/colors";
import MapView,{ Circle } from 'react-native-maps';
import { router } from "expo-router";
import useLocation from '@/constants/locationService';

const RunScreen = () => {
    //States
    const [metricValue, setMetricValue] = useState('1.0');
    const [toggle, setToggle] = useState('Distance');
    const [metricUnit, setMetricUnit] = useState('Miles');
    //Function to validate metric values
    const validateInput = (input, typeOfMetric) => {
        var rgx;
        // The distance should have any number of digits from 0 to 9. one or zero decimal point. one or zero number (digit) after the decimal ppoint    
        if (typeOfMetric == 'Distance')
        rgx = /^[0-9]{1,2}\.?[0-9]{1,2}$/;
        else rgx = /^[0-9]{0,2}\:{1}[0-9]{0,2}$/;
        return input.match(rgx)
    }
    //Helper function to make changes to the text inpput
    const changeMetricValueHander = (input) => {
        //For distance
        //Round off the number to 1 decimal place eg: 2.5
        if (!validateInput(input, toggle)) {
            if (input[0] == '.' || input[0] == ':') {
                input = '0' + input;
            }
            if (input[input.length - 1] == '.' || input[input.length - 1] == ':'){
                input += '0';
            }
            setMetricValue(input)
        }
        
    };
    const toggleHandler = () => {
        if(toggle == 'Distance') {
            setToggle('Time')
            setMetricUnit('Hours : Minutes')
            setMetricValue('01:00')
        } else {
            setToggle('Distance')
            setMetricUnit('Miles')
            setMetricValue('1.0')
        }
    };

    const { latitude, longitude, errorMsg } = useLocation();
    console.log(latitude, longitude);

    return (
        <View style={Styles.container}>
            {/*Google Maps API/Image*/}
            <View style={Styles.container} pointerEvents="none">
            <MapView 
            region={{
                latitude: latitude || 37.78825,
                longitude: longitude|| -122.4324,
                latitudeDelta: 0.0922,
                longitudeDela: 0.0421,
            }}
            style={Styles.mapView}
                minZoomLevel={18}
                ><Circle
                center={{latitude: latitude || 37.78825, longitude:longitude || -122.4324}}
                radius={4}
                fillColor="red"
                /></MapView>
            </View>
            
        <View style={{position: 'absolute', bottom: 0, right: 0, ...Styles.mainContainer}}>
            
            {/*Metric - Button to change the metric value */}
          
            <Pressable onPress={() => console.warn('Open modal and change value')}>
                {/*Pressable Button */}
                <TextInput 
                style={Styles.metricValue}
                keyboardType="decimal-pad" 
                value={metricValue} 
                onChangeText={changeMetricValueHander}
                />
                
                <Text style={Styles.metric}>{metricUnit}</Text>
            </Pressable>

            <View style={Styles.bottomContainer}>
                {/*Start Button */}
               
                    <Avatar                     
                    size={120}                     
                    rounded                     
                    title="START"                     
                    activeOpacity={0.7}
                    onPress={() => router.push({
                        pathname: '/screens/run/runScreen',
                        params: {value: metricValue, metric: toggle},
                    })}                      
                    titleStyle={Styles.avatarTitle}                     
                    containerStyle={Styles.avatarContainer}                 
                    />
                

                {/*Toggle button to change the metric value*/}
                <Pressable 
                    onPress={toggleHandler}
                    style={Styles.toggleContainer}
                >
                    <Text style={Styles.distance}>{toggle}</Text>
                </Pressable>
            </View>
        </View>
      </View>
    );
};

export default RunScreen;