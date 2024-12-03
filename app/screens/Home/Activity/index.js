// ActivityScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ActivityCard from '@/src/components/ActivityCard';
import { useLocalSearchParams } from 'expo-router';

const ActivityScreen = () => {
  const params = useLocalSearchParams();
  const [activities, setActivities] = useState([]);

  // Load activities from storage when component mounts
  useEffect(() => {
    loadActivities();
  }, []);

  // Handle new activity from params
  useEffect(() => {
    if (params.newActivity) {
      const newActivity = JSON.parse(params.newActivity);
      handleNewActivity(newActivity);
    }
  }, [params.newActivity]);

  const loadActivities = async () => {
    try {
      const storedActivities = await AsyncStorage.getItem('activities');
      if (storedActivities) {
        setActivities(JSON.parse(storedActivities));
      }
    } catch (error) {
      console.error('Error loading activities:', error);
    }
  };

  const handleNewActivity = async (newActivity) => {
    try {
      const updatedActivities = [newActivity, ...activities];
      await AsyncStorage.setItem('activities', JSON.stringify(updatedActivities));
      setActivities(updatedActivities);
    } catch (error) {
      console.error('Error saving new activity:', error);
    }
  };

  const renderItem = ({ item }) => (
    <ActivityCard
      day={item.day}
      timeOfDay={item.timeOfDay}
      miles={item.miles}
      avgPace={item.avgPace}
      time={item.time}
      calories={item.calories}
      totalMiles={item.totalMiles}
      title={item.title} 
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={activities}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: "#fff",
    flex: 1,
  },
});

export default ActivityScreen;