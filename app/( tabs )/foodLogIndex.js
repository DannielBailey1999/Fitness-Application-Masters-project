import { StyleSheet, View, Text, FlatList, TextInput, Button, ActivityIndicator } from "react-native";
import { useState } from "react";
import { Link, useRouter} from "expo-router";
import SearchScreen from "../screens/Home/foodLog/foodLog";
import FoodListItem from "../../src/components/foodListItem";


const foodItems = [
    {
      food: {
        label: 'Pizza',
        nutrients: { ENERC_KCAL: 265 }, // This is calories
        brand: 'Dominoes'
      }
    }
  ];



export default function FoodHome () {
    const router = useRouter();
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
            
           
            {/* <FlatList
        data={foodItems}
        renderItem={({item}) => <FoodListItem item={item}/>}
        keyExtractor={(item, index) => index.toString()}
    /> */}
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
})