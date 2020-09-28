import React, {useEffect, useState, useRef} from 'react';
import {View, Text} from 'react-native';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

const TrucksView = () => {
    const [materialOrPortes, setMaterialOrPortes] = useState(-1);
    const [supplyOrRetrieval, setSupplyOrRetrieval] = useState(-1);

    var radio_props_materialOrPortes = [
        {label: 'Transporte de Material', value: 0 },
        {label: 'Portes', value: 1 }
    ];
    var radio_props_supplyOrRetrieval = [
        {label: 'Suministro', value: 2 },
        {label: 'Retirada', value: 3 }
    ];

    const renderSupplyOrRetrieval = function (){
        switch (materialOrPortes) {
            case 0:
                return (
                    <View>
                        <Text>Seleccione el tipo de transporte de material:</Text>
                        <RadioForm
                            radio_props={radio_props_supplyOrRetrieval}
                            initial={-1}
                            onPress={(value) => {setSupplyOrRetrieval(value)}}
                        />
                    </View>
                );
                break;
            case 1:
                return (<Text>Formulario iria aqui</Text>);
                break;
            default:
                return null;
        }
    };

    const renderAfterSupplyOrRetrieval = function(){
        switch (supplyOrRetrieval) {
            case 2:
                return (<Text>Formulario iria aqui</Text>);
                break;
            case 3:
                return (<Text>Formulario iria aqui</Text>);
                break;
            default:
                return null;
        }
    }


    return (
    <View>
        <Text>Seleccione el tipo de tarea realizada:</Text>
        <RadioForm
            radio_props={radio_props_materialOrPortes}
            initial={-1}
            onPress={(value) => {setMaterialOrPortes(value);setSupplyOrRetrieval(-1);}}
        />
        {renderSupplyOrRetrieval()}
        {renderAfterSupplyOrRetrieval()}
    </View>
  );
};

export default TrucksView;
