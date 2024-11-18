import React from "react";
import {View, Text, Image, FlatList} from 'react-native';
import ActivityCard from '@/src/components/ActivityCard';
import { DATA } from '@/constants/dummyData';


const ActivityScreen = () => {
    const renderItem = ({item}) => <ActivityCard
        day ={item.day}
        timeOfDay = {item.timeOfDay}
        miles = {item.miles}
        avgPace = {item.avgPace}
        time = {item.time}
        calories = {item.calories}
        totalMiles = {item.totalMiles}
    />;

    
    return (
        <View style={{paddingHorizontal: 12}}>
        <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        />
    </View>
);
};

export default ActivityScreen;
