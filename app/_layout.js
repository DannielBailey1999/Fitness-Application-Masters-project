import { Stack } from 'expo-router/stack'; // Importing Stack from expo-router
import { RootSiblingParent } from 'react-native-root-siblings'; // Optional, if you need to use a root sibling provider
import store from './store/store'; // Importing the Redux store
import { Provider } from 'react-redux'; // Importing Redux Provider
import React from 'react'; // React import

export default function Layout() {
  return (
    <Provider store={store}>
      <RootSiblingParent> 
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </RootSiblingParent>
    </Provider>
  );
}

