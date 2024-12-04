import { Text, View, StyleSheet } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';

const FoodLogListItem = ({item}) => {
  return (
     
          <View style={{ 
              backgroundColor: 'gainsboro',
              padding: 10, 
              borderRadius: 5, 
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              }}>
              <View style={{flex: 1,  gap: 5,}}>
              <Text style={{ fontWeight: 'bold', fontSize: 16}}>{item.label}</Text>
              <Text style={{color: 'dimgray'}}>{item.kcal} cal, {item.brand}</Text>
              </View>
              
          </View>
  )
}

export default FoodLogListItem;