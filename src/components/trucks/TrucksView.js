import React, {useEffect, useState, useRef} from 'react';
import {View, Text, ScrollView} from 'react-native';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import FormView from '../forms/FormView';

const TrucksView = () => {
    const [materialOrPortes, setMaterialOrPortes] = useState(-1);
    const [supplyOrRetrieval, setSupplyOrRetrieval] = useState(-1);
    const [materialClicked, setMaterialClicked] = useState(false);
    const [portesClicked, setPortesClicked] = useState(false);
    const [supplyClicked, setSupplyClicked] = useState(false);
    const [retrievalClicked, setRetrievalClicked] = useState(false);



    const handleClickMaterialOrPortes = (value) => {
        if(value == 0){
            setMaterialClicked(true);
            setPortesClicked(false);
        }else{
            setMaterialClicked(false);
            setPortesClicked(true);
        }
        setSupplyClicked(false);
        setRetrievalClicked(false);
    };

    const handleClickSupplyOrRetrieval = (value) => {
        value = value + 2;
        if(value == 2){
            setSupplyClicked(true);
            setRetrievalClicked(false);
        }else{
            setSupplyClicked(false);
            setRetrievalClicked(true);
        }
    };

    const materialOrPortesRadioButton = () => {
        const radio_props_materialOrPortes = [
            {label: 'Transporte de Material', value: 0 },
            {label: 'Portes', value: 1 }
        ];
        return(
            <RadioForm
                radio_props={radio_props_materialOrPortes}
                initial={-1}
                onPress={(e,value) => {handleClickMaterialOrPortes(e, value);setMaterialOrPortes(value);}}

            />
        );
    }

    const supplyOrRetrievalRadioButton = () => {
        const radio_props_supplyOrRetrieval = [
            {label: 'Suministro', value: 0 },
            {label: 'Retirada', value: 1 }
        ];
        return(
            <View>
                <Text>Seleccione el tipo de transporte de material:</Text>
                <RadioForm
                    radio_props={radio_props_supplyOrRetrieval}
                    initial={-1}
                    onPress={(e, value) => {handleClickSupplyOrRetrieval(e, value);setSupplyOrRetrieval(value+2);}}
                />
            </View>
        );
    };


    return (
    <View>
        <ScrollView>
            <Text>Seleccione el tipo de tarea realizada:</Text>
            {materialOrPortesRadioButton()}

            {materialClicked &&
                supplyOrRetrievalRadioButton()
            }

            {portesClicked &&
                <FormView type={materialOrPortes}></FormView>
            }
            {supplyClicked &&
                <FormView type={supplyOrRetrieval}></FormView>
            }
            {retrievalClicked &&
                <FormView type={supplyOrRetrieval}></FormView>
            }


        </ScrollView>
    </View>
  );
};

export default TrucksView;
