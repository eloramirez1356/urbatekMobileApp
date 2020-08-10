import React, { useEffect, useState, useRef} from "react";
import { Text, View, TextInput, Button, Alert, Image} from "react-native";
import { useForm } from "react-hook-form";
import LoginViewStyles from "../login/LoginViewStyles";
import DateTimePicker from '@react-native-community/datetimepicker';
import ImagePicker from 'react-native-image-picker';

/*
* Add the library for selecting files from phone (ADDED) => Set correctly the buttons and set when it should appear or not. Add dropdown with values obtained from database in employee (Should we put
* employee as it is the one that is going to use the app?). Remove button for selecting date and make it something for taping
* or different gesture in the app.
* */

const MachinesView = ({navigation}) => {
    const { register, setValue, handleSubmit, errors } = useForm();
    const onSubmit = data => {Alert.alert("Form Data", JSON.stringify(data));navigation.navigate('HomePage');};

    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [avatarSource, setAvatarSource] = useState('Debe seleccionar una imagen');
    const [textButton, setTextButton] = useState('Select date');
    const [showImage, setShowImage] = useState(false);

    const handleChange = (e) => {
        setImage({
            preview: URL.createObjectURL(e.target.files[0]),
            raw: e.target.files[0]
        })
    }

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

// More info on all the options is below in the API Reference... just some common use cases shown here
    const options = {
        title: 'Select Avatar',
        customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
        storageOptions: {
            skipBackup: true,
            path: 'images',
        },
    };

    /**
     * The first arg is the options object for customization (it can also be null or omitted for default options),
     * The second arg is the callback which sends object: response (more info in the API Reference)
     * This is the part that I have to modify.
     */
    const pickImage = () => {
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const source = { uri: response.uri };

                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };
                setAvatarSource(source);
                setShowImage(true);
            }
        });
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

            <Text>Empleado</Text>
            <TextInput style={LoginViewStyles.input}
                       onChangeText={text => setValue("employee", text, true)}
            />
            {errors.employee && <Text>"Debe seleccionar el empleado"</Text>}

            <Text>Imagen</Text>
            <View>
            {showImage && <Image style={{width: 100, height: 100}} source = {avatarSource}/>}
            </View>
            <View>
                <Button onPress={pickImage} title={'Seleccionar Imagen'} />
            </View>
            {errors.file && <Text>"Debe subir una imagen"</Text>}
        </View>
    );
};

export default MachinesView;