import React from 'react';
import { View, Text } from 'react-native';
import MapView,{ Circle } from 'react-native-maps';
import ProgressBar from '../summary/progressBar';
import { Avatar } from 'react-native-elements';
import Styles from './styles';
import Toast from 'react-native-root-toast';
import { router } from 'expo-router';
import { getDayName, getTimeOfDay } from '../../../constants/dateCalculator';
import { useLocalSearchParams, useRouter } from 'expo-router';
const PauseScreen = () => {
    const params = useLocalSearchParams();
    const { timeValue, mileValue, calories, pace, progress, targetValue, metric } = params;
    console.log(params)
    return(
        
        <View style={Styles.mainContainer}>
            {/*MapView*/}
            <View style={Styles.mapViewContainer} pointerEvents="none">
            <MapView 
            initialRegion={{
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421 
            }}
            style={{
                width: '100%',
                height: '100%',
                opacity: 0.7
                }}
                loadingEnabled={true}
                ><Circle
                center={{latitude: 37.78825, longitude: -122.4324}}
                radius={4}
                fillColor="red"
                /></MapView>
            </View>
             {/*Metrics*/}
            <View 
            style={Styles.metricContainer}>
                {/*Miles and Calories*/}
            <View 
            style={Styles.milesandCaloriesContainer}>
                
                <View style={Styles.milesContainer}>
                    <Text style={Styles.metricValue}>{mileValue}</Text>
                    <Text style={Styles.metric}>Miles</Text>
                </View>
                <View style={Styles.caloriesContainer}>
                    <Text style={Styles.metricValue}>{calories}</Text>
                    <Text style={Styles.metric}>Calories</Text>
                </View>
            </View>
            {/*Time and Pace*/}
            <View 
            style={Styles.timeandPaceContainer}>
                
                <View style={Styles.milesContainer}>
                    <Text style={Styles.metricValue}>{timeValue}</Text>
                    <Text style={Styles.metric}>Time</Text>
                </View>
                <View style={Styles.caloriesContainer}>
                    <Text style={Styles.metricValue}>{pace}</Text>
                    <Text style={Styles.metric}>Pace</Text>
                </View>
            </View>
            {/*Progress Bar*/}
            </View>
            <View style={Styles.progressBarContainer}>
            <ProgressBar 
                prog={progress}
                innerBorderColor='black'
                containerborderColor="black" 
                containerBgr="#ccc" 
                />
            </View>
            {/*Stop and resume button*/}
            <View style={Styles.startandStopButtonContainer}>
            <Avatar                     
                    size={120}                     
                    rounded                     
                    icon={{name: 'stop'}}                  
                    activeOpacity={0.7}
                    onPress={() =>
                        Toast.show('Hold button for 5 seconds to save and exit run', {
                            duration: Toast.durations.LONG,
                          })
                    }
                    onLongPress={() => router.replace({
                        pathname: "/screens/summary/summary",
                        params: {
                            day: getDayName(),
                            timeOfDay: getTimeOfDay(),
                            miles: mileValue,
                            avgPace: pace,
                            time: timeValue,
                            calories: calories,
                            totalMiles: "ueueuueue",
                        }
                    })}                           
                    containerStyle={{backgroundColor: '#000'}}                 
                    />
                    <Avatar                     
                    size={120}                     
                    rounded                     
                    title="START"                     
                    activeOpacity={0.7}
                    onPress={() => router.back()}     
                    titleStyle={{fontSize: 28, 
                        color: '#000', 
                        fontWeight: 'bold'
                    }}                     
                    containerStyle={{backgroundColor: '#fe9836', marginLeft: 60}}                 
                    />
            </View>
        </View>
    );
};


export default PauseScreen;