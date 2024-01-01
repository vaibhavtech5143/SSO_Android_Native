import React from 'react';
import { Image, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Color from '../../Utils/Color';
import * as WebBrowser from "expo-web-browser";
import { useOAuth } from "@clerk/clerk-expo";
import { useWarmUpBrowser } from "../../../hooks/warmUpBrowser.jsx";
WebBrowser.maybeCompleteAuthSession();


const LoginScreen = () => {
  useWarmUpBrowser();
 
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
  const handleLogin = async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();
 
      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  };
 

  return (
    <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 45 }}>
      <Image
        source={require("../../../assets/images/logo.png")}
        style={styles.logoImage}
      />
      <Image
        source={require("../../../assets/images/car.png")}
        style={styles.bgImages}
      />
      <View style={{ padding: 20 }}>
        <Text style={styles.heaading}>Your Ultimate Ev Charging Station Finder</Text>
        <Text style={styles.desc}>Find EV charging Station near you, plan trip and so much more in one click!</Text>
        <TouchableOpacity style={styles.button}onPress={handleLogin} >
          <Text style={{ color: Color.WHITE, textAlign: 'center', fontFamily: "outfit", fontSize: 17 }}>
            Login With Google
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  logoImage: {
    width: "100%",
    height: 90,
  },
  bgImages: {
    marginBottom: 10,
    width: "100%",
    height: 250,
    marginTop: 20,
    resizeMode: 'cover'
  },
  heaading: {
    fontSize: 25,
    fontFamily: 'outfit-bold',
    textAlign: 'center',
    marginTop: 20
  },
  desc: {
    fontSize: 17,
    fontFamily: "outfit",
    marginTop: 15,
    textAlign: "center",
    color: Color.GRAY
  },
  button: {
    backgroundColor: Color.PRIMARY,
    padding: 16,
    borderRadius: 99,
    marginTop: 20
  }
});

export default LoginScreen;
