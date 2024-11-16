// app/summary.js
import React, { useState, useRef  }  from 'react';
import { View, Text, StyleSheet, Share, Pressable, TextInput, Keyboard, KeyboardAvoidingView, Platform, Image } from 'react-native';
import { Stack } from 'expo-router';
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';
import ProgressBar from '@/src/screens/summary/progressBar';
import Styles from '@/src/screens/summary/styles';
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

    const [title, setTitle] = useState('Tuesday Morning Run');
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
                <Text styles={Styles.subHeading}> Tuesday - 07: 28</Text>
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
                    <Text style={{fontSize: 80, fontWeight: 'bold'}}>2.00</Text>
                    <Text style={{fontSize: 20, color: '#aaaaaa'}}>Miles</Text>
                </View>
                {/*Metric Pace, time and calories */}
                <View style={{
                    marginTop: 12,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }} >
                    <View>
                        <Text style={{fontSize: 24, fontWeight: 'bold'}}>10'59"</Text>
                        <Text style={{color: '#999999', fontSize: 16}}>Pace</Text>
                    </View>
                    <View>
                        <Text style={{fontSize: 24, fontWeight: 'bold'}}>24:30</Text>
                        <Text style={{color: '#999999', fontSize: 16}}>Time</Text>
                    </View>
                    <View>
                        <Text style={{fontSize: 24, fontWeight: 'bold'}}>116</Text>
                        <Text style={{color: '#999999', fontSize: 16}}>Calories</Text>
                    </View>
                </View>
                {/*Progress Bar */}
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Image source={require('@/assets/images/LionHead.png')}
                    style={{height: 400, width: 360}}
                    />
                <Text>Progress Bar</Text>
                <ProgressBar 
                prog="60%" 
                innerBorderColor="#4A90E2" 
                containerborderColor="#fff" 
                containerBgr="#ccc" 
                />
                </View>
                </KeyboardAvoidingView>
                
            </Pressable>
        </>
    );
};


export default SummaryScreen;