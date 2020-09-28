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
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomePageView from './src/components/homePage/HomePageView';
import MachinesView from './src/components/machines/MachinesView';
import TrucksView from './src/components/trucks/TrucksView';
import HoursView from './src/components/hours/HoursView';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginView}
          options={{title: 'Urbatek', headerLeft: null}}
        />
        <Stack.Screen
          name="HomePage"
          component={HomePageView}
          options={{title: 'Inicio', headerLeft: null}}
        />
        <Stack.Screen
          name="Machines"
          component={MachinesView}
          options={{title: 'Excavacion-Maquinas'}}
        />
        <Stack.Screen
          name="Trucks"
          component={TrucksView}
          options={{title: 'Transporte-Camiones'}}
        />
        <Stack.Screen
          name="Hours"
          component={HoursView}
          options={{title: 'Parte Horas Diario'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
