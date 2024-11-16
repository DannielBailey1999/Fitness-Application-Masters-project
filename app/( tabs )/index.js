import { View, Text, StyleSheet } from 'react-native';
import RunScreen from '@/src/screens/Home/Running';


export default function Tab() {
  return (
    <View style={styles.container}>
      
      <RunScreen />
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
