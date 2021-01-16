import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Header } from 'react-native-elements';
import { Auth } from 'aws-amplify';
import { SafeAreaView } from 'react-native-safe-area-context';

import AppTextInput from '../components/AppTextInput';
import AppButton from '../components/AppButton';

export default function SignIn({ navigation, updateAuthState }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function signIn() {
    try {
      await Auth.signIn(username, password);
      console.log(' Success');
      updateAuthState('loggedIn');
    } catch (error) {
      console.log(' Error signing in...', error);
    }
  }
  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <Header
        backgroundColor="green"
        centerComponent={{ text: 'Sign-in to Parchee', style: { color: '#ffffff',fontSize: 18,fontWeight: '600' } }}
      />
      <View style={styles.container}>
        <Text style={styles.pageTitle}>Welcome to Parchee</Text>
        <Text style={styles.pageTitle2}>Your Medical Assistant</Text>
        <AppTextInput
          value={username}
          onChangeText={text => setUsername(text)}
          leftIcon="account"
          placeholder="Enter username"
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
        />
        <AppTextInput
          value={password}
          onChangeText={text => setPassword(text)}
          leftIcon="lock"
          placeholder="Enter password"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry
          textContentType="password"
        />
        <View style={styles.footerButtonContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('ResetPassword')}>
            <Text style={styles.forgotPasswordButtonText}>
              Forgot Password? Reset Password
            </Text>
          </TouchableOpacity>
        </View>
        <AppButton title="Login" onPress={signIn} />
		    <View style={styles.footerButtonContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.forgotPasswordButtonText}>
              Don't have an account? Sign Up
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.footerText}>Copyright Parchee, all rights reserved</Text>
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
    alignItems: 'center'
  },
  title: {
    fontSize: 20,
    color: '#202020',
    fontWeight: '500',
    marginVertical: 15
  },
  footerButtonContainer: {
    marginVertical: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  forgotPasswordButtonText: {
    color: 'tomato',
    fontSize: 18,
    fontWeight: '600'
  },
  textLabel: {
    color: '#202020',
    fontSize: 18,
    fontWeight: '600'
  },
  pageTitle: {
    color: 'green',
    fontSize: 28,
    fontWeight: '900'
  },
  pageTitle2: {
    color: 'green',
    fontSize: 22,
    fontWeight: '700'
  },
  footerText: {
    color: '#202020',
    fontSize: 12,
    fontWeight: '600'
  }

});