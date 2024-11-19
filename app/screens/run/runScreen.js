import React, {useCallback, useEffect, useState}from "react";
import { View, Text, Alert} from "react-native";
import ProgressBar from '../summary/progressBar';
import { Link, router, useLocalSearchParams, useNavigation} from "expo-router";
import { Avatar } from 'react-native-elements';
import Styles from "./styles";

const RunningScreen = () => {
    const navigation = useNavigation();
    const params = useLocalSearchParams();
    const { value, metric} = params;
    console.log(params);

    // states to maintain dynamic values
    const [Metric, setMetric] = useState('Miles');
    const [metricValue, setMetricValue] = useState('0.0');
    const [progress, setProgress] = useState('0%');
    const [Pace, setPace] = useState("-'--\"");
    const [calories, setCalories] = useState("--");
    const [targetValue, setTargetValue] = useState('0');
    const [timeValue, setTimeValue] = useState('00:00');
    const [mileValue, setmileValue] = useState('0');
    //This state keeps check whether the screen is in focus or not
    const [inFocus, setInFocus] = useState(true)


    //This use effect will run only once
    useEffect(() => {
        if(params.metric == 'Time'){
            setMetric('Hours:Minutes')
            setMetricValue('00:00')
        }
        setTargetValue(params.value)
    }, []);

    const backButtonCallBack = useCallback(event=>{
        event.preventDefault();
        Alert.alert('Discarding Run', 
            'Are you sure you want to discard this run?', 
            [
            {text: 'No', style:'cancel', onPress:()=>{}},
            {
                text: 'Yes', 
                style:'destructive', 
                onPress:()=>navigation.dispatch(event.data.action),
            },
        ],
    );
    }, 
    [navigation],
    );
    useEffect(()=>{
        if (inFocus) navigation.addListener('beforeRemove', backButtonCallBack);
        return () => navigation.removeListener('beforeRemove', backButtonCallBack);
    }, 
    [navigation, inFocus]);

    useEffect(() => navigation.addListener('focus', event => {
        setInFocus(true);
    }),
    [navigation],
    );

    useEffect(() => navigation.addListener('blur', event => {
        setInFocus(false);
    }),
    [navigation],
    );






    return (
        <View style={Styles.mainContainer}>
            
            
            <View style={Styles.metricContainer}>
            {/*Pace */}
            <View style={Styles.caloriesandPace}>
            <Text style={Styles.metricValue}>{Pace}</Text>
            <Text style={Styles.metric}>Pace</Text>
            </View>
            
            {/*Calories */}
            <View style={Styles.caloriesandPace}>
            <Text style={Styles.metricValue}>{calories}</Text>
            <Text style={Styles.metric}>Calories</Text>
            </View>
            </View>
            {/*Distance/Time metric set up */}
            <View style={{marginTop: 60, alignItems: 'center'}}>
                <Text style={{fontSize: 120, fontWeight: 'bold',fontStyle:'italic'}}>{metricValue}</Text>
                <Text style={{fontSize: 45, fontWeight: 'bold', color: '#a96528'}}>{Metric}</Text>
            </View>
            {/*Progress Bar */}
            <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 60
            }}>
            <ProgressBar 
                prog={'20%'}
                innerBorderColor={'#000'}
                containerborderColor="#fff" 
                containerBgr="#ccc" 
                />
            </View>
            <View
            style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 60,
            }}
            >
                
            {/*Pause Button*/}
                    <Avatar                     
                    size={120}                     
                    rounded                     
                    title="| |"                     
                    activeOpacity={0.7}
                    onPress={() => router.push({
                        pathname: "/screens/pause",
                        params: {
                            timeValue: timeValue,
                            mileValue: mileValue,
                            calories: calories, 
                            pace: Pace,
                            progress: progress,
                            targetValue: targetValue,
                            metric: Metric
                        },
                     })}                 
                    titleStyle={Styles.avatarTitle}                     
                    containerStyle={{backgroundColor: '#000'}}                
                    />
              
                </View>
        </View>
    );
};

export default RunningScreen;