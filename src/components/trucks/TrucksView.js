import React, {useEffect, useState, useRef} from 'react';
import {View, Text, ScrollView} from 'react-native';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import FormView from '../forms/FormView';
import {getInfo} from '../../utils/Utils';

const TrucksView = ({navigation}) => {
    const [materialOrPortes, setMaterialOrPortes] = useState(-1);
    const [supplyOrRetrieval, setSupplyOrRetrieval] = useState(-1);
    const [materialClicked, setMaterialClicked] = useState(false);
    const [portesClicked, setPortesClicked] = useState(false);
    const [supplyClicked, setSupplyClicked] = useState(false);
    const [retrievalClicked, setRetrievalClicked] = useState(false);
    const [info, setInfo] = useState(new Map());
    const [infoLoaded, setInfoLoaded] = useState(false );

    useEffect(() => {getInfo().then(result => {setInfo(result)}).then(setInfoLoaded(true))}, [infoLoaded]);


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
            <View>
                <Text>Seleccione el tipo de tarea realizada:</Text>
                <RadioForm
                    radio_props={radio_props_materialOrPortes}
                    initial={-1}
                    onPress={(e,value) => {handleClickMaterialOrPortes(e, value); setMaterialOrPortes(value);}}

                />
            </View>
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
            {materialOrPortesRadioButton()}

            {materialClicked &&
                supplyOrRetrievalRadioButton()
            }

            {portesClicked &&
                <FormView type={materialOrPortes} sitesArray={info} navigation={navigation}></FormView>
            }
            {supplyClicked &&
                <FormView type={supplyOrRetrieval} sitesArray={info} navigation={navigation}></FormView>
            }
            {retrievalClicked &&
                <FormView type={supplyOrRetrieval} sitesArray={info} navigation={navigation}></FormView>
            }


        </ScrollView>
    </View>
  );
};

export default TrucksView;
