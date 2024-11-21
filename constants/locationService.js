import { StyleSheet, Text, View } from "react-native";
import React, {useEffect, useRef, useState} from 'react';
import * as Location from 'expo-location';
import { useNavigation } from "expo-router";


const useLocation = () => {
    const [errorMsg, setErrorMsg] = useState("");
    const [longitude, setLongitude] = useState("");
    const [latitude, setLatitude] = useState("");

    const navigation = useNavigation();
  
    const getUserLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg("Permission to location is not granted");
          return;
        }
  
        let { coords } = await Location.getCurrentPositionAsync();
        if (coords) {
          const { latitude, longitude } = coords;
          console.log('LOng and lat: ', latitude, longitude);
          setLatitude(latitude);
          setLongitude(longitude);
          let response = await Location.reverseGeocodeAsync({
            latitude,
            longitude
          });
          console.log('USER LOCATION IS', response);
        }
    };
    const interval = useRef(null);
    
    useEffect(() => {
      navigation.addListener('focus', event => {
        getUserLocation();
        interval.current = setInterval(getUserLocation, 30000);
      })
      
      return () =>
              clearInterval(interval.current);
    }, [navigation]);

    useEffect(() => {
      navigation.addListener('focus', event => {
        getUserLocation();
        interval.current = setInterval(getUserLocation, 30000);
      })
      
    }, [navigation]);

    return { latitude, longitude, errorMsg };
  };
  
  export default useLocation;