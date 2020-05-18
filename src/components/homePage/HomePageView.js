import React from 'react';
import {View, Button} from 'react-native';

const HomePageView = ({navigation}) => {
    return (
        <View>
            <Button title="Excavacion - Maquinas"
                    onPress={() =>
                        navigation.navigate('Machines')
                    }
            />
            <Button title="Transporte - Camiones"
                    onPress={() =>
                        navigation.navigate('Trucks')
                    }
            />
            <Button title="Parte horas diario"
                    onPress={() =>
                        navigation.navigate('Hours')
                    }
            />
        </View>
    );
};

export default HomePageView;