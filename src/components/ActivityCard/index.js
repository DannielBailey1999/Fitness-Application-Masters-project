import React from "react";
import { View, Text } from "react-native";

const ActivityCard = () => {
    return (
        <View style={{paddingHorizontal: 12}}>
            {/*card 1 */}
        <View style={{borderRadius: 12,
                 backgroundColor: '#ffffff',
                 marginVertical: 8,
                 padding: 16,
                 elevation: 1,
                 }}>
                
                {/* Inner container 1 */}
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                }}>  
                {/* Image */}
            <Image 
                source={{uri: 'https://i.stack.imgur.com/ddX9U.png'}}
                style={{width: 40, height: 40, borderRadius: 8}} 
                />
                <View style={{marginLeft: 12}}>
                {/* Heading */}
                <Text style={{color: '#070707'}}>Monday</Text>
                {/* SubHeading */}
                <Text style={{color: '#777777'}}>Monday Morning Run</Text>
                </View>
            </View>
            {/*Inner container 2 */}
            <View 
            style={{
                marginTop: 12,
                flexDirection: 'row',
                justifyContent: 'space-between'
            }}>
                {/* Miles */}
            <View>
                <Text style={{fontWeight: 'bold'}}>0.90</Text>
                <Text style={{color: '#8d8d8d'}}>Miles</Text>
            </View>
                {/*Avg. Pace */}
            <View>
                <Text style={{fontWeight: 'bold'}}>12'41</Text>
                <Text style={{color: '#8d8d8d'}}>Avg. Pace</Text>
            </View>
                {/*Time */}
                <View>
                <Text style={{fontWeight: 'bold'}}>12:00</Text>
                <Text style={{color: '#8d8d8d'}}>Time</Text>
            </View>
            </View>
        </View>
            {/* Card 2 */}
            {/* Card 3*/}
    </View>
    );
};