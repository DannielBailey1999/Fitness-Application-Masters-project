// app/summary.js
import React, { useState, useRef, useEffect }  from 'react';
import { View, Text, StyleSheet, Share, Pressable, TextInput, Keyboard, KeyboardAvoidingView, Platform, Image } from 'react-native';
import { Stack, useLocalSearchParams  } from 'expo-router';
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';
import ProgressBar from '@/src/screens/summary/progressBar';
import Styles from '@/src/screens/summary/styles';
import { Levels } from '@/constants/dummyData';
const SummaryScreen = () => {
    // Share function
    const onShare = async () => {
        try {
            await Share.share({
                message: 'Check out my activity summary!',
                // You can add more details to share
                // title: 'Activity Summary',
                // url: 'https://yourapp.com' // iOS only
            });
        } catch (error) {
            console.log(error.message);
        }
    };

    const params = useLocalSearchParams();
    const [title, setTitle] = useState(`${params.day} ${params.timeOfDay} Run`);
    const [progressColor, setProgressColor] = useState('green');
    const [progress, setProgress] = useState('20%')
    const totalMiles = Number(params.totalMiles);
    const [milesLeft, setMilesLeft] = useState(0);

    //function to calculate the level of the user
    const calculateLevelHandler = (totalMiles) => {
        let index;
        totalMiles = Number(totalMiles);
        
        for (let i = Levels.length - 1; i >= 0; i--) {
            if (totalMiles >= Levels[i].milesRequired) {
                index = i;
                setProgressColor(Levels[i].level);
                if (i < Levels.length - 1) {
                    const progressToNext = ((totalMiles - Levels[i].milesRequired) / 
                        (Levels[i + 1].milesRequired - Levels[i].milesRequired)) * 100;
                    setProgress(`${Math.min(progressToNext, 100)}%`);
                    setMilesLeft(totalMiles - Levels[i].milesRequired);
                } else {
                    setProgress('100%');
                }
                break;
            }
        }
        return index;
    };

    useEffect(() => {
        calculateLevelHandler(totalMiles);
    }, [totalMiles]);
    

    const titleChangeHandler = input => {
        setTitle(input);
        
    };
    // Reference to textInput component 
    const textInputRef = useRef();

    return (
        <>
            <Stack.Screen 
                options={{
                    title: 'Summary',
                    headerRight: () => (
                        <Pressable 
                            onPress={onShare}
                            style={({ pressed }) => ({
                                opacity: pressed ? 0.5 : 1,
                                marginRight: 15
                            })}
                        >
                            <Entypo name="share" size={24} color="black"  />
                        </Pressable>
                    ),
                    headerStyle: {backgroundColor: '#f7f7f7'}
                }}
            />
            <Pressable style={Styles.mainContainer}
            onPress={() => Keyboard.dismiss()}>
                {/*Day-Time */}
                <Text styles={Styles.subHeading}>{params.day} - {params.timeOfDay}</Text>
                {/*Text Input heading with pencil icon */}
                <Pressable style={Styles.textInputContainer}
                    onPress={() => textInputRef.current.focus()}
                    >
                    <TextInput
                    value={title} onChangeText={titleChangeHandler}
                    style={Styles.textInput}
                    ref={textInputRef}
                    />
                    <Ionicons name="pencil-sharp" size={24} color="black" />
                </Pressable>
                <KeyboardAvoidingView behavior={Platform.OS == 'ios'?'padding' : 'height'} style={{marginTop: 12, flex: 1}}>
                 {/*Miles */}
                <View>
                    <Text style={Styles.milesValue}>{params.miles}</Text>
                    <Text style={Styles.milesMetric}>Miles</Text>
                </View>
                {/*Metric Pace, time and calories */}
                <View style={Styles.metricContainer} >
                    <View>
                        <Text style={Styles.metricValue}>{params.avgPace.replace(/\\/g, '')}</Text>
                        <Text style={Styles.metric}>Pace</Text>
                    </View>
                    <View>
                        <Text style={Styles.metricValue}>{params.time}</Text>
                        <Text style={Styles.metric}>Time</Text>
                    </View>
                    <View>
                        <Text style={Styles.metricValue}>{params.calories}</Text>
                        <Text style={Styles.metric}>Calories</Text>
                    </View>
                </View>
                {/*Progress Bar */}
                <View style={Styles.logoContainer}>
                    <Image source={require('@/assets/images/LionHead.png')}
                    style={Styles.logo}
                    />
                <ProgressBar 
                prog={progress}
                innerBorderColor={progressColor}
                containerborderColor="#fff" 
                containerBgr="#ccc" 
                />
                <Text > {milesLeft} miles to orange level</Text>
                </View>
                
                </KeyboardAvoidingView>
                
            </Pressable>
        </>
    );
};


export default SummaryScreen;