import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import colors from '../../constants/colors';
export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'blue' }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Start a Run',
          tabBarLabelStyle: { color: colors.tabsColor, fontWeight: 'bold' }
        }}
      />
      <Tabs.Screen
        name="activityIndex"
        options={{
          title: 'Activity',
          tabBarLabelStyle: { color: colors.tabsColor, fontWeight: 'bold' }
        }}
      />
      <Tabs.Screen
        name="foodLogIndex"
        options={{
          title: 'Food Log',
          tabBarLabelStyle: { color: colors.tabsColor, fontWeight: 'bold' }
        }}
      />
    </Tabs>
  );
}