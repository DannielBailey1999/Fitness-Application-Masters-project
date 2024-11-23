// app/screens/run/_layout.js
import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack screenOptions={{ 
      headerBackButtonMenuEnabled: false,
      headerShown: true 
    }}>
      <Stack.Screen 
        name="index"
        options={{
          title: 'Running',
          headerStyle: {
            backgroundColor: '#f7f7f7'
          },
        }} 
      />
    </Stack>
  );
};