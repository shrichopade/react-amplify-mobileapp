import React, { useState, useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import Amplify, { Auth } from 'aws-amplify';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';
import ConfirmSignUp from './screens/ConfirmSignUp';
import ResetPassword from './screens/ResetPassword';
import Home from './screens/Home';

import { StatusBar } from 'expo-status-bar';
//import React from 'react';
//import { StyleSheet, Text, View } from 'react-native';
import Button from 'react-uikit-button';

//import Amplify from 'aws-amplify';
import config from './aws-exports';
import { withAuthenticator } from 'aws-amplify-react-native';

Amplify.configure(config);


const AuthenticationStack = createStackNavigator();
const AppStack = createStackNavigator();

const AuthenticationNavigator = props => {
  return (
    <AuthenticationStack.Navigator headerMode="none">
      <AuthenticationStack.Screen name="SignIn">
        {screenProps => (
          <SignIn {...screenProps} updateAuthState={props.updateAuthState} />
        )}
      </AuthenticationStack.Screen>
      <AuthenticationStack.Screen name="SignUp" component={SignUp} />
      <AuthenticationStack.Screen name="ResetPassword" component={ResetPassword} />
      <AuthenticationStack.Screen
        name="ConfirmSignUp"
        component={ConfirmSignUp}
      />
    </AuthenticationStack.Navigator>
  );
};

const AppNavigator = props => {
  return (
    <AppStack.Navigator>
      <AppStack.Screen name="Home">
        {screenProps => (
          <Home {...screenProps} updateAuthState={props.updateAuthState} />
        )}
      </AppStack.Screen>
    </AppStack.Navigator>
  );
};

const Initializing = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="tomato" />
    </View>
  );
};

function App() {
	  const [isUserLoggedIn, setUserLoggedIn] = useState('initializing');
	  useEffect(() => {
		checkAuthState();
	  }, []);

	  async function checkAuthState() {
		try {
		  await Auth.currentAuthenticatedUser();
		  console.log(' User is signed in');
		  setUserLoggedIn('loggedIn');
		} catch (err) {
		  console.log(' User is not signed in');
		  setUserLoggedIn('loggedOut');
		}
	  }

	  function updateAuthState(isUserLoggedIn) {
		setUserLoggedIn(isUserLoggedIn);
	  }

		return (
		  <NavigationContainer>
			{isUserLoggedIn === 'initializing' && <Initializing />}
			{isUserLoggedIn === 'loggedIn' && (
			  <AppNavigator updateAuthState={updateAuthState} />
			)}
			{isUserLoggedIn === 'loggedOut' && (
			  <AuthenticationNavigator updateAuthState={updateAuthState} />
			)}
		  </NavigationContainer>
		);
	  
	}

export default App;
//export default withAuthenticator(App);

	/*
  async function signOut() {
    try {
      await Auth.signOut();
    } catch (error) {
      console.log('Error signing out: ', error);
    }
  }

  return (
    <View style={styles.container}>
      <Text> +  = React Native + Amplify </Text>
      <Button title="Sign Out" color="tomato" onPress={signOut} />
      <StatusBar style="auto" />
    </View>
  );
  
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default withAuthenticator(App, true);
*/