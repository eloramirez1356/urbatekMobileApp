import React from 'react';
import {Text, View, TextInput, Button} from 'react-native';
import LoginViewStyles from './LoginViewStyles';

const LoginView = () => {
  return (
    <View>
      <Text style={{textAlign: 'center'}}>Urbateck</Text>
      <TextInput style={LoginViewStyles.input} placeholder="Enter your login" />
      <TextInput
        style={LoginViewStyles.input}
        placeholder="Enter your password"
        secureTextEntry={true}
      />
      <Button title="Login" />
    </View>
  );
};

export default LoginView;
