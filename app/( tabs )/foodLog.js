import { StyleSheet, View, Text, FlatList, TextInput, Button, ActivityIndicator } from "react-native";
import { useState } from "react";
import FoodListItem from "../../src/components/foodListItem";
import { gql, useQuery, useLazyQuery } from "@apollo/client";




const query = gql`
query MyQuery($ingr: String) {
  search(ingr: $ingr) {
    hints {
      food {
        label
        brand
        foodId
        nutrients {
          ENERC_KCAL
        }
      }
    }
  }
}
`;



const foodItems = [
    { label: 'Pizza', cal: 75, brand: 'Dominoes'},
    {label: 'Apple', cal: 50, brand: 'Gnereic'}, 
    {label: 'Coffee', cal: 100, brand: 'Americano'},
]



export default function SearchScreen() {
    const [search, setSearch] = useState('');
    const [runSearch, {data, loading, error}] = useLazyQuery(query, {variables: {ingr: 'Pizza'}});


    const performSearch = () => {
        runSearch({variables: {ingr: search}});
        setSearch(' ');
    };

    if (loading) {
        return <ActivityIndicator />;
    }

    if (error) {
        return <Text>Failed to search</Text>;
    }

    const items = data?.search?.hints.map(hint => hint.food) || [];


    return (
        <View style={styles.container}>
        {/*FoodView Item */}
        <TextInput value={search}  onChangeText={setSearch} placeholder="Search..." style={styles.input}/>
        {search && <Button title="Search" onPress={performSearch} />}
        
        <FlatList 
        data={items}
        renderItem={({ item }) => <FoodListItem item={item} />}
        ListEmptyComponent={() => <Text>Search For foods right here</Text>}
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

