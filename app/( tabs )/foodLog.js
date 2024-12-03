import { StyleSheet, View, Text } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import FoodListItem from "../../src/components/foodListItem";




export default function FoodLog() {
    return (
        <View style={styles.container}>
        {/*FoodView Item */}
        <FoodListItem item={{label: 'Pizza', cal: 75, brand: 'Dominoes'}}/>
        
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

