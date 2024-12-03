import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import MapView, { Circle } from 'react-native-maps';
import ProgressBar from '../summary/progressBar';
import { Avatar } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Styles from './styles';
import Toast from 'react-native-root-toast';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { getDayName, getTimeOfDay } from '../../../constants/Calculations';

const PauseScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const params = useLocalSearchParams();
  
  const {
    timeValue = '0:00',
    mileValue = '0',
    calories = '0',
    pace = '0:00',
    progress = 0,
    targetValue = '0',
    metric = 'miles'
  } = params;

  const saveRun = async (runData) => {
    try {
      // Get existing runs
      const existingRunsJSON = await AsyncStorage.getItem('runs');
      const existingRuns = existingRunsJSON ? JSON.parse(existingRunsJSON) : [];
      
      // Create new run object with timestamp and ID
      const newRun = {
        ...runData,
        id: Date.now().toString(),
        savedAt: new Date().toISOString()
      };
      
      // Add to beginning of array (most recent first)
      const updatedRuns = [newRun, ...existingRuns];
      
      // Keep only last 100 runs to manage storage space
      const trimmedRuns = updatedRuns.slice(0, 100);
      
      // Save to AsyncStorage
      await AsyncStorage.setItem('runs', JSON.stringify(trimmedRuns));
      
      return newRun.id;
    } catch (error) {
      console.error('Error saving run:', error);
      throw new Error('Failed to save run');
    }
  };

  const confirmStop = () => {
    Alert.alert(
      'End Run',
      'Do you want to save and end your run?',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Save & End',
          onPress: handleSaveAndEnd
        }
      ],
      { cancelable: true }
    );
  };

  const handleSaveAndEnd = async () => {
    if (isLoading) return;
    setIsLoading(true);
    
    try {
      const runData = {
        day: getDayName(),
        timeOfDay: getTimeOfDay(),
        miles: Number(mileValue),
        avgPace: pace,
        time: timeValue,
        calories: Number(calories),
        totalMiles: Number(targetValue),
      };

      const runId = await saveRun(runData);
      
      Toast.show('Run saved successfully!', {
        duration: Toast.durations.LONG
      });

      router.replace({
        pathname: '/screens/summary/summary',
        params: {
          ...runData,
          runId
        }
      });

    } catch (error) {
      console.error('Error saving run:', error);
      Toast.show('Failed to save run. Please try again.', {
        duration: Toast.durations.LONG,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const MetricDisplay = ({ value, label }) => (
    <View style={Styles.milesContainer}>
      <Text style={Styles.metricValue}>{value}</Text>
      <Text style={Styles.metric}>{label}</Text>
    </View>
  );

  return (
    <View style={Styles.mainContainer}>
      <View style={Styles.mapViewContainer} pointerEvents="none">
        <MapView
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          style={{
            width: '100%',
            height: '100%',
            opacity: 0.7,
          }}
          loadingEnabled={true}
        >
          <Circle
            center={{ latitude: 37.78825, longitude: -122.4324 }}
            radius={4}
            fillColor="red"
          />
        </MapView>
      </View>

      <View style={Styles.metricContainer}>
        <View style={Styles.milesandCaloriesContainer}>
          <MetricDisplay value={mileValue} label="Miles" />
          <MetricDisplay value={calories} label="Calories" />
        </View>

        <View style={Styles.timeandPaceContainer}>
          <MetricDisplay value={timeValue} label="Time" />
          <MetricDisplay value={pace} label="Pace" />
        </View>
      </View>

      <View style={Styles.progressBarContainer}>
        <ProgressBar
          prog={progress}
          innerBorderColor="black"
          containerborderColor="black"
          containerBgr="#ccc"
        />
      </View>

      <View style={Styles.startandStopButtonContainer}>
        <Avatar
          size={120}
          rounded
          icon={{ name: 'stop' }}
          activeOpacity={0.7}
          onPress={confirmStop}
          disabled={isLoading}
          containerStyle={{ 
            backgroundColor: isLoading ? '#666' : '#000'
          }}
        />

        <Avatar
          size={120}
          rounded
          title="START"
          activeOpacity={0.7}
          onPress={() => router.back()}
          disabled={isLoading}
          titleStyle={{
            fontSize: 28,
            color: '#000',
            fontWeight: 'bold',
          }}
          containerStyle={{ 
            backgroundColor: isLoading ? '#ffc29e' : '#fe9836',
            marginLeft: 60 
          }}
        />
      </View>
    </View>
  );
};

export default PauseScreen;