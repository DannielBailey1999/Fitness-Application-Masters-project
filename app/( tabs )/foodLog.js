import { StyleSheet, View, Text, FlatList, TextInput, Button } from "react-native";
import { useState } from "react";
import FoodListItem from "../../src/components/foodListItem";


const foodItems = [
    { label: 'Pizza', cal: 75, brand: 'Dominoes'},
    {label: 'Apple', cal: 50, brand: 'Gnereic'}, 
    {label: 'Coffee', cal: 100, brand: 'Americano'},
]



export default function FoodLog() {
    const [search, setSearch] = useState('');
    const performSearch = () => {
        console.warn('Searching for: ', search);

        setSearch(' ');
    };

    return (
        <View style={styles.container}>
        {/*FoodView Item */}
        <TextInput value={search}  onChangeText={setSearch} placeholder="Search..." style={styles.input}/>
        {search && <Button title="Search" onPress={performSearch} />}
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
    input: {
        backgroundColor: '#f2f2f2',
        padding: 10, 
        borderRadius: 20,
    },
});

