import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { Header } from 'react-native-elements';
import { Auth } from 'aws-amplify';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Home({ updateAuthState }) {
  async function signOut() {
    try {
      await Auth.signOut();
      updateAuthState('loggedOut');
    } catch (error) {
      console.log('Error signing out: ', error);
    }
  }

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <Header
        backgroundColor="green"
        leftComponent={{ icon: 'menu', color: '#fff' }}
        centerComponent={{ text: 'Parchee', style: { color: '#ffffff',fontSize: 18,fontWeight: '600' } }}
        rightComponent={{ icon: 'home', color: '#fff' }}
      />
      <View style={styles.container}>
        <Text> Welcome to React Native Mobile App </Text>
        <Button title="Sign Out" color="tomato" onPress={signOut} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: 'white'
  },
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 20
  }
});