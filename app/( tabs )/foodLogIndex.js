import { StyleSheet, View, Text, FlatList, TextInput, Button, ActivityIndicator } from "react-native";
import { useState } from "react";
import { Link, useRouter} from "expo-router";
import SearchScreen from "../screens/Home/foodLog/foodLog";
import FoodListItem from "../../src/components/foodListItem";
import { gql, useQuery } from "@apollo/client";
import dayjs from "dayjs";
import FoodLogListItem from "../../src/components/foodLogListItem";

const query = gql`
query MyQuery($date: Date!, $user_id: String!) {
  foodLogsForDate(date: $date, user_id: $user_id) {
    created_at
    food_id
    kcal
    label
    user_id
    id
  }
}`;






export default function FoodHome () {
    const router = useRouter();
    const user_id = 'Danniel'
    const {data, loading, error} = useQuery(query, {variables: {
        date: dayjs().format('YYYY-MM-DD'),
        user_id,
    },
    });
    if (loading){
        return<ActivityIndicator />;
    }
    if (error) {
        return <Text>Failed to fetch data</Text>
    }

    console.log(data)
    return (
        <View style ={styles.container}>
            <View style={styles.headerRow}>
            <Text style={styles.subTitle}>Calories</Text>
            <Text>2000 - 150 = 1170</Text>
            </View>

            <View style={styles.headerRow}>
            <Text style={styles.subTitle}>Todays Logged Food</Text>
            <Button 
                title='Add Food' 
                onPress={() => router.push('/screens/Home/foodLog/foodLog')} 
            />
            </View>
            
           
            <FlatList
        data={data.foodLogsForDate}
        renderItem={({item}) => <FoodLogListItem item={item}/>}
            />
</View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: '#fff',
        padding: 10,
        gap: 10,
    },

    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    subTitle: {
        fontSize: 18, 
        fontWeight: 500, 
        flex: 1, 
        color: 'dimgray',
    }
});