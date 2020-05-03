/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {SafeAreaView} from 'react-native';
import LoginView from './src/components/login/LoginView';

const App = () => {
  return (
    <SafeAreaView>
      <LoginView />
    </SafeAreaView>
  );
}

export default App;
