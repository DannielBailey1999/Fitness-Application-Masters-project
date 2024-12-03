import { Stack } from 'expo-router/stack'; 
import { RootSiblingParent } from 'react-native-root-siblings'; 
import store from './store/store'; 
import { Provider } from 'react-redux'; 
import React from 'react'; 
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://zibyungon.us-east-a.ibm.stepzen.net/api/ranting-camel/__graphql',
  cache: new InMemoryCache(),
  headers: {
    Authorization: 
    "apikey zibyungon::local.net+1000::8dd3656d4e00658e915eb0ce301cf155fbedae1c360910fa60ca86d0a361f18c"
  },
});


export default function Layout() {
  
  return (
    <ApolloProvider client={client}>
    <Provider store={store}>
      <RootSiblingParent> 
        <Stack>
          <Stack.Screen name="( tabs )" options={{ headerShown: false }} />
        </Stack>
      </RootSiblingParent>
    </Provider>
    </ApolloProvider>
  );
}

