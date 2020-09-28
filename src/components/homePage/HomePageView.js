import React from 'react';
import {View, Button} from 'react-native';

const HomePageView = ({navigation}) => {
  return (
    <View>
      <Button
        title="Excavacion - Maquinas"
        onPress={() => navigation.navigate('Machines')}
      />
      <Button
        title="Transporte - Camiones"
        onPress={() => navigation.navigate('Trucks')}
      />
    </View>
  );
};

export default HomePageView;
