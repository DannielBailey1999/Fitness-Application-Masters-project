import { Text, View, StyleSheet } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "expo-router";

const mutation = gql`
mutation MyMutation($food_id: String, $kcal: Int!, $label: String!, $user_id: String!) {
  insertFood_log(food_id: $food_id, kcal: $kcal, label: $label, user_id: $user_id) {
    created_at
    food_id
    id
    kcal
    label
    user_id
  }
}`;


const FoodListItem = ({item}) => {
  const [logFood, {data, loading, error}] = useMutation(mutation, {
    refetchQueries: ['MyQuery'],
  });
  const router = useRouter();

  const onPlusPressed = async () => {
    await logFood({
      variables: {
        food_id: item.food_id,
        kcal: item.nutrients.ENERC_KCAL,
        label: item.label,
        user_id: 'Danniel',
      },
    });
    router.back();
  };

  return (
     
          <View style={{ 
              backgroundColor: 'gainsboro',
              padding: 10, 
              borderRadius: 5, 
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center'
              }}>
              <View style={{flex: 1,  gap: 5,}}>
              <Text style={{ fontWeight: 'bold', fontSize: 16}}>{item.label}</Text>
              <Text style={{color: 'dimgray'}}>{item.nutrients.ENERC_KCAL} cal, {item.brand}</Text>
              </View>
              <AntDesign name="pluscircleo" size={24} color="royalblue" onPress={onPlusPressed} />
          </View>
  )
}

export default FoodListItem;