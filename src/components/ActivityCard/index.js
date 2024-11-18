import React from "react";
import { View, Text, Image, Pressable} from "react-native";
import { Link, } from "expo-router";
import Styles from "./styles";
import colors from "@/constants/colors";
//Activiy card for activity screen

const ActivityCard = (props) => {
    return (
        <Link href={{
            pathname: "/screens/summary/summary",
            params: {
              day: props.day,
              timeOfDay: props.timeOfDay,
              miles: props.miles,
              avgPace: props.avgPace,
              time: props.time,
              calories: props.calories,
              totalMiles: props.totalMiles,
            }
          }} 
          asChild>
        <Pressable style={Styles.mainContainer} onPress={() => console.log('Details of this page')}>
           
           {/* Inner container 1 */}
           <View style={Styles.innerContainer}>  
           {/* Image */}
       <Image 
           source={{uri: 'https://i.stack.imgur.com/ddX9U.png'}}
           style={Styles.image} 
           />
           <View style={{marginLeft: 12}}>
           {/* Heading */}
           <Text style={{color: '#070707'}}>{props.day}</Text>
           {/* SubHeading */}
           <Text style={{color: '#777777'}}>{props.timeOfDay}</Text>
           </View>
       </View>
       {/*Inner container 2 */}
       <View 
       style={Styles.metricContainer}>
           {/* Miles */}
       <View>
           <Text style={Styles.metricValue}>{props.miles}</Text>
           <Text style={Styles.metric}>Miles</Text>
       </View>
           {/*Avg. Pace */}
       <View>
           <Text style={Styles.metricValue}>{props.avgPace}</Text>
           <Text style={Styles.metric}>Avg. Pace</Text>
       </View>
           {/*Time */}
           <View>
           <Text style={Styles.metricValue}>{props.time}</Text>
           <Text style={Styles.metric}>Time</Text>
       </View>
       </View>
   </Pressable>
   </Link>
    );
};

export default ActivityCard;