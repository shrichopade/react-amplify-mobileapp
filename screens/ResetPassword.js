import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Auth } from 'aws-amplify';
import { SafeAreaView } from 'react-native-safe-area-context';

import AppTextInput from '../components/AppTextInput';
import AppButton from '../components/AppButton';

export default function ResetPassword({ navigation }) {
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	
	async function resetPassword() {
		try {
		  await Auth.forgotPassword(email);
		  console.log(' Sign-up Confirmed');
		  navigation.navigate('ConfirmSignUp');
		} catch (error) {
		  console.log(' Error signing up...', error);
		}
	}	
	
	return (
		<SafeAreaView style={styles.safeAreaContainer}>
		  <View style={styles.container}>
        <Text style={styles.title}>Reset Password</Text>
        <AppTextInput
          value={username}
          onChangeText={text => setUsername(text)}
          leftIcon="account"
          placeholder="Enter username"
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
        />
        <AppButton title="Send Code" onPress={resetPassword} />
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