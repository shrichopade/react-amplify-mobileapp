import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Header } from 'react-native-elements';
import { Auth } from 'aws-amplify';
import { SafeAreaView } from 'react-native-safe-area-context';

import AppTextInput from '../components/AppTextInput';
import AppButton from '../components/AppButton';

export default function SignUp({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  async function signUp() {
    try {
      await Auth.signUp({ username, password, attributes: { email } });
      console.log(' Sign-up Confirmed');
      navigation.navigate('ConfirmSignUp');
    } catch (error) {
      console.log(' Error signing up...', error);
    }
  }

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <Header
        backgroundColor="green"
        leftComponent={{ icon: 'menu', color: '#fff' }}
        centerComponent={{ text: 'Create your account', style: { color: '#ffffff',fontSize: 18,fontWeight: '600' } }}
        rightComponent={{ icon: 'home', color: '#fff' }}
      />
      <View style={styles.container}>
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
        <AppTextInput
          value={email}
          onChangeText={text => setEmail(text)}
          leftIcon="email"
          placeholder="Enter email"
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
        />
		    <AppTextInput
          value={name}
          onChangeText={text => setName(name)}
          leftIcon="text"
          placeholder="Enter first names"
          autoCapitalize="yes"
          keyboardType="name"
          textContentType="name"
        />
        <AppButton title="Sign Up" onPress={signUp} />
        <View style={styles.footerButtonContainer}>
          <Text style={styles.forgotPasswordButtonText}>
			  <Text style={styles.textLabel}>Already have an account? &nbsp;</Text> 
			  <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
				  Sign In
			  </TouchableOpacity>
		  </Text>
        </View>
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
  }
});