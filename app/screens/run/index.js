import React, { useCallback, useEffect, useState } from "react";
import { View, Text, Alert } from "react-native";
import { Link, router, useLocalSearchParams, useNavigation } from "expo-router";
import { Avatar } from 'react-native-elements';
import Styles from "./styles";
import useLocation from '@/Hooks/locationService';
import ProgressBar from '../summary/progressBar';
import {  
    formatTime, 
    calculatePace, 
    calculateCalories , 
    calculateRunProgress
} from "../../../constants/Calculations";


const RunningScreen = () => {
    const navigation = useNavigation();
    const params = useLocalSearchParams();
    const { metric, targetValue } = params;

    const { 
        latitude, 
        longitude, 
        isTracking,
        locationDetails,
        totalDistance,
        timeElapsed, 
        formattedTime,
        currentPace,
        caloriesBurned,
    } = useLocation();

    // states to maintain dynamic values
    const [Metric, setMetric] = useState('Miles');
    const [metricValue, setMetricValue] = useState('0.0');
    const [progress, setProgress] = useState('0%');
    const [Pace, setPace] = useState("-'--\"");
    const [calories, setCalories] = useState("--");
    const [timeValue, setTimeValue] = useState('00:00');
    const [mileValue, setmileValue] = useState('0');
    const [inFocus, setInFocus] = useState(true);

 

useEffect(() => {
    try {
        
        const target = parseFloat(targetValue || '0');
        
        if (params.metric === 'Time') {
            // Update time display
            setMetricValue(formattedTime?.formatted || '00:00');
            setTimeValue(formattedTime?.formatted || '00:00');
            
        
            const timeProgress = calculateRunProgress('Time', timeElapsed, target);
            setProgress(timeProgress);
            
            console.log('Time Run Update:', {
                elapsed: timeElapsed,
                targetMinutes: target,
                progress: timeProgress,
                display: formattedTime?.formatted
            });
        } else {
            
            const currentDistance = totalDistance || 0;
            const formattedDistance = currentDistance.toFixed(2);
            setMetricValue(formattedDistance);
            setmileValue(formattedDistance);
            
        
            const distanceProgress = calculateRunProgress('Distance', currentDistance, target);
            setProgress(distanceProgress);
            
            console.log('Distance Run Update:', {
                current: currentDistance,
                target: target,
                progress: distanceProgress,
                display: formattedDistance
            });
        }

      
        if (isTracking) {
            setPace(currentPace || "-'--\"");
            setCalories(caloriesBurned?.toString() || '--');
        }

    } catch (error) {
        console.error('Run Stats Update Error:', error);
        setProgress('0.0%');
    }
}, [
    timeElapsed, 
    totalDistance, 
    formattedTime, 
    currentPace,
    caloriesBurned,
    params.metric, 
    targetValue,
    isTracking
]);
   
    useEffect(() => {
        if (locationDetails) {
            console.log('Location Update:', {
                lat: latitude,
                lng: longitude,
                speed: locationDetails.speed,
                timestamp: new Date(locationDetails.timestamp).toLocaleString(),
                isTracking
            });
        }
    }, [locationDetails]);

    const backButtonCallBack = useCallback(event => {
        event.preventDefault();
        Alert.alert(
            'Discarding Run', 
            'Are you sure you want to discard this run?', 
            [
                { text: 'No', style: 'cancel', onPress: () => {} },
                {
                    text: 'Yes', 
                    style: 'destructive', 
                    onPress: () => navigation.dispatch(event.data.action),
                },
            ],
        );
    }, [navigation]);

    
    useEffect(() => {
        if (inFocus) {
            navigation.addListener('beforeRemove', backButtonCallBack);
        }
        return () => navigation.removeListener('beforeRemove', backButtonCallBack);
    }, [navigation, inFocus]);

    useEffect(() => {
        const focusUnsubscribe = navigation.addListener('focus', () => {
            setInFocus(true);
        });

        const blurUnsubscribe = navigation.addListener('blur', () => {
            setInFocus(false);
        });

        return () => {
            focusUnsubscribe();
            blurUnsubscribe();
        };
    }, [navigation]);


    useEffect(() => {
        if (params.metric === 'Time') {
            setMetric('Minutes:Seconds');
            setMetricValue('00:00');
        } else {
            setMetric('Miles');
            setMetricValue('0.0');
        }
    }, [params.metric]);

    return (
        <View style={Styles.mainContainer}>
            <View style={Styles.metricContainer}>
                {/* Pace */}
                <View style={Styles.caloriesandPace}>
                    <Text style={Styles.metricValue}>{Pace}</Text>
                    <Text style={Styles.metric}>Pace</Text>
                </View>
                
                {/* Calories */}
                <View style={Styles.caloriesandPace}>
                    <Text style={Styles.metricValue}>{calories}</Text>
                    <Text style={Styles.metric}>Calories</Text>
                </View>
            </View>

            {/* Distance/Time metric display */}
            <View style={{ marginTop: 60, alignItems: 'center' }}>
                <Text style={{ 
                    fontSize: 120, 
                    fontWeight: 'bold',
                    fontStyle: 'italic'
                }}>
                    {metricValue}
                </Text>
                <Text style={{ 
                    fontSize: 45, 
                    fontWeight: 'bold', 
                    color: '#a96528'
                }}>
                    {Metric}
                </Text>
            </View>

            {/* Progress Bar */}
            <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 60
            }}>
                <ProgressBar 
                    prog={progress}
                    innerBorderColor={'#000'}
                    containerborderColor="#fff" 
                    containerBgr="#ccc" 
                />
            </View>

            {/* Pause Button */}
            <View style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 60,
            }}>
                <Avatar                     
                    size={120}                     
                    rounded                     
                    title="| |"                     
                    activeOpacity={0.7}
                    onPress={() => router.push({
                        pathname: "/screens/pause",
                        params: {
                            timeValue: timeValue,
                            mileValue: (totalDistance || 0).toFixed(2),
                            calories: calories, 
                            pace: Pace,
                            progress: progress,
                            targetValue: targetValue,
                            metric: Metric
                        },
                    })}                 
                    titleStyle={Styles.avatarTitle}                     
                    containerStyle={{ backgroundColor: '#000' }}                
                />
            </View>
        </View>
    );
};

export default RunningScreen;