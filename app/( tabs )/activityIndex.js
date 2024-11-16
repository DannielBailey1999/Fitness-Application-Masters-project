import { View, Text, StyleSheet } from 'react-native';
import ActivityScreen from '@/src/screens/Home/Activity';


export default function settings() {
  return (
    <View style={styles.container}>
      <ActivityScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
