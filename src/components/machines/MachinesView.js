import React, { useEffect, useState } from "react";
import { Text, View, TextInput, Button, Alert } from "react-native";
import { useForm } from "react-hook-form";
import LoginViewStyles from "../login/LoginViewStyles";
import DateTimePicker from '@react-native-community/datetimepicker';

const MachinesView = ({navigation}) => {
    const { register, setValue, handleSubmit, errors } = useForm();
    const onSubmit = data => {Alert.alert("Form Data", JSON.stringify(data));navigation.navigate('HomePage');};

    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [textButton, setTextButton] = useState('Select date');

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };

    const showMode = currentMode => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        if(!show){
            showMode('date');
            setTextButton('Date selected');
        }else{
            setShow(false);
            setTextButton('Select date');
        }
    };

    useEffect(() => {
        register({ name: 'date'}, { required: true });
        register({ name: 'works'}, {required: true});
        register({ name: 'machine'}, {required: true});
        register({ name: 'saucepanTime'}, {required: true});
        register({ name: 'hammerTime'}, {required: true});
        register({ name: 'file'}, {required: true});
        register({ name: 'employee'}, {required: true});
    }, [register]);


    return (
        <View>
            <Text>Fecha</Text>
            <Text>{date.getUTCDate().toString() + " " + (date.getUTCMonth() + 1 ).toString() + " " + date.getUTCFullYear().toString()}</Text>
            <View>
                <Button onPress={showDatepicker} title={textButton} />
            </View>
            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    timeZoneOffsetInMinutes={0}
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                />
            )}

            <Text>Obra</Text>
            <TextInput style={LoginViewStyles.input}
                       onChangeText={text => setValue("works", text, true)}
            />
            {errors.works && <Text>"Debe indicar la obra"</Text>}

            <Text>Maquina</Text>
            <TextInput style={LoginViewStyles.input}
                       onChangeText={text => setValue("machine", text, true)}
            />
            {errors.machine && <Text>"Debe indicar la maquina"</Text>}

            <Text>Horas cazo</Text>
            <TextInput style={LoginViewStyles.input}
                       onChangeText={text => setValue("saucepanTime", text, true)}
            />
            {errors.saucepanTime && <Text>"Debe indicar las horas de cazo"</Text>}

            <Text>Horas martillo</Text>
            <TextInput style={LoginViewStyles.input}
                       onChangeText={text => setValue("hammerTime", text, true)}
            />
            {errors.hammerTime && <Text>"Debe indicar las horas de martillo"</Text>}

            <Text>Imagen</Text>
            <TextInput style={LoginViewStyles.input}
                       onChangeText={text => setValue("file", text, true)}
            />
            {errors.file && <Text>"Debe subir una imagen"</Text>}

            <Text>Empleado</Text>
            <TextInput style={LoginViewStyles.input}
                       onChangeText={text => setValue("employee", text, true)}
            />
            {errors.employee && <Text>"Debe seleccionar el empleado"</Text>}

            <View>
                <Button onPress={handleSubmit(onSubmit)} title={'Submit'} />
            </View>


        </View>
    );
};

export default MachinesView;