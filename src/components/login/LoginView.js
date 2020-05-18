import React from 'react';
import {Text, View, TextInput, Button} from 'react-native';
import LoginViewStyles from './LoginViewStyles';

const LoginView = ({navigation}) => {
  return (
    <View>
      <TextInput style={LoginViewStyles.input} placeholder="Enter your login" />
      <TextInput
        style={LoginViewStyles.input}
        placeholder="Enter your password"
        secureTextEntry={true}
      />
      <Button
          title="Login"
          onPress={() =>
          navigation.navigate('HomePage')
          }
      />
    </View>
  );
};

export default LoginView;
