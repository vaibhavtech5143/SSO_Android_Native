import {  View, StyleSheet, SafeAreaView, Text,Button } from 'react-native';
import { useFonts } from 'expo-font';
import LoginScreen from './App/Screen/LoginScreen/LoginScreen';
import { ClerkProvider, SignedIn, SignedOut, useAuth } from "@clerk/clerk-expo";
import * as SecureStore from "expo-secure-store";
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './App/Screen/NavigationScreen/TabNavigator';

const tokenCache = {
  async getToken(key) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key, value) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};


const SignOut = () => {
  const { isLoaded,signOut } = useAuth();
  if (!isLoaded) {
    return null;
  }
  return (
    <View>
      <Button
        title="Sign Out"
        onPress={() => {
          signOut();
        }}
      />
    </View>
  );
};


export default function App() {


  const [fontsLoaded] = useFonts({
    'outfit': require('./assets/fonts/Outfit-Regular.ttf'),
    'outfit-medium': require('./assets/fonts/Outfit-SemiBold.ttf'),
    'outfit-bold': require('./assets/fonts/Outfit-Bold.ttf'),
  });



  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={"pk_test_ZXZpZGVudC16ZWJyYS02LmNsZXJrLmFjY291bnRzLmRldiQ"}>
    <SafeAreaView style={styles.container}>
        <SignedIn>
          <NavigationContainer>
            <TabNavigator/>
            <SignOut/>
          </NavigationContainer>
        
        </SignedIn>
        <SignedOut>
        <Text>You are Signed out</Text>
        <LoginScreen/>
        </SignedOut>
      </SafeAreaView>
    </ClerkProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    flex: 1,
    backgroundColor: '#F7F7EE',
  },
});
