import { View, Text, StyleSheet } from 'react-native';
import RunScreen from '@/app/screens/Home/Runnning/index';


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
