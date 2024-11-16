import React, { useState} from "react";
import { View, Text, Pressable, StyleSheet, TextInput } from 'react-native';
import { Avatar } from 'react-native-elements';
import Styles from './styles';
import colors from "@/constants/colors";


const RunScreen = () => {
    const [metricValue, setMetricValue] = useState('0.1');

    const validateInput = (input) => {
        var rgx = /^[0-9]{1,}\.?[0-9]?$/;
        return input.match(rgx)
    }
    const changeMetricValueHander = (input) => {
        //For distance
        //Round off the number to 1 decimal place eg: 2.5
        if (!validateInput(input)) {
            setMetricValue(input)
        }
        //For Time
        
    };


    
    return (
        <View style={Styles.mainContainer}>
            {/*Google Maps API/Image*/}
            {/*Metric - Button to change the metric value */}
          
            <Pressable onPress={() => console.warn('Open modal and change value')}>
                {/*Pressable Button */}
                <TextInput 
                style={Styles.metricValue}
                keyboardType="decimal-pad" 
                value={metricValue} 
                onChangeText={changeMetricValueHander}
                />
                <View style={Styles.metricUnderline}></View>
                <Text style={Styles.metric}>Miles</Text>
            </Pressable>

            <View style={Styles.bottomContainer}>
                {/*Start Button */}
                <Avatar
                    size={120}
                    rounded
                    title="START"
                    onPress={() => console.warn("Works!")}
                    activeOpacity={0.7}
                    titleStyle={Styles.avatarTitle}
                    containerStyle={Styles.avatarContainer}
                />

                {/*Toggle button to change the metric value*/}
                <Pressable 
                    onPress={() => console.warn('Toggling')} 
                    style={Styles.toggleContainer}
                >
                    <Text style={Styles.distance}>Distance</Text>
                </Pressable>
            </View>
        </View>
    );
};

export default RunScreen;