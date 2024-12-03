import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Share,
  Pressable,
  TextInput,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Image,
  Alert
} from 'react-native';
import { Stack, useLocalSearchParams, router } from 'expo-router';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';
import ProgressBar from './progressBar';
import Styles from './styles';
import { Levels } from '@/constants/dummyData';

const SummaryScreen = () => {
  const params = useLocalSearchParams();
  const [title, setTitle] = useState(`${params.day} ${params.timeOfDay} Run`);
  const [progressColor, setProgressColor] = useState('green');
  const [progress, setProgress] = useState('20%');
  const totalMiles = Number(params.totalMiles);
  const [milesLeft, setMilesLeft] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const textInputRef = useRef();

  // Calculate level and progress
  const calculateLevelHandler = (totalMiles) => {
    let index;
    totalMiles = Number(totalMiles);

    for (let i = Levels.length - 1; i >= 0; i--) {
      if (totalMiles >= Levels[i].milesRequired) {
        index = i;
        setProgressColor(Levels[i].level);
        if (i < Levels.length - 1) {
          const progressToNext =
            ((totalMiles - Levels[i].milesRequired) /
              (Levels[i + 1].milesRequired - Levels[i].milesRequired)) *
            100;
          setProgress(`${Math.min(progressToNext, 100)}%`);
          setMilesLeft(Levels[i + 1].milesRequired - totalMiles);
        } else {
          setProgress('100%');
          setMilesLeft(0);
        }
        break;
      }
    }
    return index;
  };

  useEffect(() => {
    calculateLevelHandler(totalMiles);
  }, [totalMiles]);

  const titleChangeHandler = (input) => {
    setTitle(input);
  };

  const onShare = async () => {
    try {
      const message = `
🏃‍♂️ ${title}
📍 ${params.day} ${params.timeOfDay}
🏃‍♂️ Distance: ${params.miles} miles
⏱️ Time: ${params.time}
🔥 Calories: ${params.calories}
⚡ Pace: ${params.avgPace}
🎯 Progress: ${progress} to next level
      `;
      
      await Share.share({
        message,
      });
    } catch (error) {
      console.error('Share error:', error.message);
      Alert.alert('Error', 'Failed to share activity');
    }
  };

  const handleAddActivity = async () => {
    if (isLoading) return;
    
    setIsLoading(true);
    try {
      const activityData = {
        id: Date.now().toString(),
        title,
        day: params.day,
        timeOfDay: params.timeOfDay,
        miles: params.miles,
        avgPace: params.avgPace && params.avgPace.replace(/\\/g, ''),
        time: params.time,
        calories: params.calories,
        totalMiles: params.totalMiles,
        savedAt: new Date().toISOString(),
        progressColor,
        progress,
        milesLeft
      };

      // Get existing activities
      const existingActivitiesJSON = await AsyncStorage.getItem('activities');
      const existingActivities = existingActivitiesJSON 
        ? JSON.parse(existingActivitiesJSON) 
        : [];

 
      const updatedActivities = [activityData, ...existingActivities];

    
      const trimmedActivities = updatedActivities.slice(0, 100);

      await AsyncStorage.setItem('activities', JSON.stringify(trimmedActivities));

      // Navigate to activity screen
      router.push({
        pathname: '/screens/Home/Activity/',
        params: {
          newActivity: JSON.stringify(activityData),
        },
      });
    } catch (error) {
      console.error('Error saving activity:', error);
      Alert.alert(
        'Error',
        'Failed to save activity. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Summary',
          headerLeft: () => (
            <Pressable
              onPress={() => router.replace('/')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
                marginLeft: 15,
              })}
            >
              <Ionicons name="arrow-back" size={24} color="black" />
            </Pressable>
          ),
          headerRight: () => (
            <Pressable
              onPress={onShare}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
                marginRight: 15,
              })}
            >
              <Entypo name="share" size={24} color="black" />
            </Pressable>
          ),
          headerStyle: { backgroundColor: '#f7f7f7' },
          headerTitleAlign: 'center',
        }}
      />
      
      <Pressable
        style={Styles.mainContainer}
        onPress={() => Keyboard.dismiss()}
      >
        {/* Day-Time */}
        <Text style={Styles.subHeading}>
          {params.day} - {params.timeOfDay}
        </Text>

        {/* Text Input heading with pencil icon */}
        <Pressable
          style={Styles.textInputContainer}
          onPress={() => textInputRef.current.focus()}
        >
          <TextInput
            value={title}
            onChangeText={titleChangeHandler}
            style={Styles.textInput}
            ref={textInputRef}
            placeholder="Enter run title"
            maxLength={50}
          />
          <Ionicons name="pencil-sharp" size={24} color="black" />
        </Pressable>

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ marginTop: 12, flex: 1 }}
        >
          {/* Miles */}
          <View>
            <Text style={Styles.milesValue}>{params.miles}</Text>
            <Text style={Styles.milesMetric}>Miles</Text>
          </View>

          {/* Metric Pace, time and calories */}
          <View style={Styles.metricContainer}>
            <View>
              <Text style={Styles.metricValue}>
                {params.avgPace ? params.avgPace.replace(/\\/g, '') : '0:00'}
              </Text>
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

          {/* Progress Bar */}
          <View style={Styles.logoContainer}>
            <Image
              source={require('@/assets/images/LionHead.png')}
              style={Styles.logo}
            />
            <ProgressBar
              prog={progress}
              innerBorderColor={progressColor}
              containerborderColor="#fff"
              containerBgr="#ccc"
            />
            <Text style={Styles.progressText}>
              {milesLeft > 0 
                ? `${milesLeft.toFixed(1)} miles to ${progressColor} level`
                : 'Maximum level reached!'
              }
            </Text>
          </View>
        </KeyboardAvoidingView>

        {/* Add to Activity List Button */}
        <Pressable 
          onPress={handleAddActivity} 
          style={[
            Styles.button,
            isLoading && Styles.buttonDisabled
          ]}
          disabled={isLoading}
        >
          <Text style={Styles.buttonText}>
            {isLoading ? 'Saving...' : 'Add to Activity List'}
          </Text>
        </Pressable>
      </Pressable>
    </>
  );
};



export default SummaryScreen;