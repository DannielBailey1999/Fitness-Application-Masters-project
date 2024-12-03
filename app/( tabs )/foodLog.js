import { StyleSheet, View, Text, FlatList } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import FoodListItem from "../../src/components/foodListItem";

const foodItems = [
    { label: 'Pizza', cal: 75, brand: 'Dominoes'},
    {label: 'Apple', cal: 50, brand: 'Gnereic'}, 
    {label: 'Coffee', cal: 100, brand: 'Americano'},
]



export default function FoodLog() {
    return (
        <View style={styles.container}>
        {/*FoodView Item */}
        <FlatList 
        data={foodItems}
        renderItem={({ item }) => <FoodListItem item={item} />}
        contentContainerStyle={{ gap: 5}}
        />
        </View>
       
    )
};


const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: '#fff',
        justifyContent: 'center',
        padding: 10,
        gap: 5,
    },
});

