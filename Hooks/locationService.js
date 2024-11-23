import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useRef, useState } from 'react';
import * as Location from 'expo-location';
import { useNavigation } from "expo-router";
import { calDistance, formatTime, calculatePace, calculateCalories } from '@/constants/Calculations';

const useLocation = () => {
    // Helper function to ensure number type
    const ensureNumber = (value) => {
        const num = Number(value);
        return isNaN(num) ? 0 : num;
    };

    const [errorMsg, setErrorMsg] = useState("");
    const [longitude, setLongitude] = useState("");
    const [latitude, setLatitude] = useState("");
    const [isTracking, setIsTracking] = useState(false);
    const [locationDetails, setLocationDetails] = useState(null);
    const [totalDistance, setTotalDistance] = useState(0);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [currentPace, setCurrentPace] = useState("-'--\"");
    const [caloriesBurned, setCaloriesBurned] = useState(0);
    
    const locationSubscription = useRef(null);
    const previousLocation = useRef(null);
    const timerInterval = useRef(null);
    const navigation = useNavigation();

    // Safe setter for totalDistance
    const updateTotalDistance = (value) => {
        if (typeof value === 'function') {
            setTotalDistance(prevDistance => ensureNumber(value(ensureNumber(prevDistance))));
        } else {
            setTotalDistance(ensureNumber(value));
        }
    };

    // Update pace and calories whenever distance or time changes
    useEffect(() => {
        if (isTracking) {
            const safeDistance = ensureNumber(totalDistance);
            const safeTime = ensureNumber(timeElapsed);
            
            setCurrentPace(calculatePace(safeDistance, safeTime));
            setCaloriesBurned(calculateCalories(safeDistance));

            // Debug log
            console.log('Stats Update:', {
                distance: safeDistance,
                time: safeTime,
                pace: currentPace,
                calories: caloriesBurned
            });
        }
    }, [totalDistance, timeElapsed, isTracking]);

    const startLocationTracking = async () => {
        try {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg("Permission to location is not granted");
                return;
            }

            await Location.enableNetworkProviderAsync();

            const options = {
                accuracy: Location.Accuracy.BestForNavigation,
                timeInterval: 1000,
                distanceInterval: 5,
                mayShowUserSettingsDialog: true
            };

            // Reset all tracking values with safe setters
            updateTotalDistance(0);
            setTimeElapsed(0);
            setCurrentPace("-'--\"");
            setCaloriesBurned(0);
            previousLocation.current = null;

            timerInterval.current = setInterval(() => {
                setTimeElapsed(prev => ensureNumber(prev) + 1);
            }, 1000);

            locationSubscription.current = await Location.watchPositionAsync(
                options,
                (location) => {
                    const { coords, timestamp, mocked } = location;
                    const { 
                        latitude: newLat, 
                        longitude: newLong,
                        accuracy,
                        altitude,
                        altitudeAccuracy,
                        heading,
                        speed
                    } = coords;

                    if (previousLocation.current) {
                        const newDistance = ensureNumber(calDistance(
                            previousLocation.current.latitude,
                            previousLocation.current.longitude,
                            newLat,
                            newLong
                        ));
                        
                        updateTotalDistance(prevDistance => {
                            const updatedDistance = ensureNumber(prevDistance) + newDistance;
                            console.log('Distance Update:', {
                                previous: prevDistance,
                                new: newDistance,
                                total: updatedDistance,
                                isNumber: typeof updatedDistance === 'number'
                            });
                            return updatedDistance;
                        });
                    }
                    
                    setLatitude(newLat);
                    setLongitude(newLong);
                    setIsTracking(true);
                    setLocationDetails({
                        timestamp,
                        mocked,
                        accuracy,
                        altitude,
                        altitudeAccuracy,
                        heading,
                        speed
                    });

                    previousLocation.current = { latitude: newLat, longitude: newLong };
                }
            );

        } catch (err) {
            setErrorMsg(`Error tracking location: ${err.message}`);
            setIsTracking(false);
        }
    };

    const stopLocationTracking = () => {
        if (locationSubscription.current) {
            locationSubscription.current.remove();
            locationSubscription.current = null;
            setIsTracking(false);
            previousLocation.current = null;
        }
        
        if (timerInterval.current) {
            clearInterval(timerInterval.current);
            timerInterval.current = null;
        }
    };

    useEffect(() => {
        const unsubscribeFocus = navigation.addListener('focus', () => {
            startLocationTracking();
        });

        const unsubscribeBlur = navigation.addListener('blur', () => {
            stopLocationTracking();
        });

        startLocationTracking();

        return () => {
            stopLocationTracking();
            unsubscribeFocus();
            unsubscribeBlur();
        };
    }, [navigation]);

    // Debug effect to monitor totalDistance
    useEffect(() => {
        console.log('Total Distance State:', {
            value: totalDistance,
            type: typeof totalDistance,
            isNumber: !isNaN(totalDistance)
        });
    }, [totalDistance]);

    return { 
        latitude, 
        longitude, 
        errorMsg,
        isTracking,
        locationDetails,
        totalDistance: ensureNumber(totalDistance), // Ensure number on return
        timeElapsed: ensureNumber(timeElapsed), // Ensure number on return
        formattedTime: formatTime(timeElapsed),
        currentPace,
        caloriesBurned: ensureNumber(caloriesBurned),
        startLocationTracking,
        stopLocationTracking
    };
};

export default useLocation;