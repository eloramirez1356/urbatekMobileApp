import React, {useEffect, useState, useRef} from 'react';
import {Text, View, TextInput, Button, Alert, Image, ScrollView} from 'react-native';
import {useForm} from 'react-hook-form';
import LoginViewStyles from '../login/LoginViewStyles';
import DateTimePicker from '@react-native-community/datetimepicker';
import ImagePicker from 'react-native-image-picker';

const FormView = (type) => {
    const [formType, setFormType] = useState(type);
    {console.log(formType.type)}
    const {register, setValue, handleSubmit, errors} = useForm();

    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [avatarSource, setAvatarSource] = useState('Debe seleccionar una imagen');
    const [textButton, setTextButton] = useState('Select date');
    const [showImage, setShowImage] = useState(false);
    const [dataImageBase64, setdataImageBase64] = useState(null);

    useEffect(() => {
        register({name: 'date'}, {required: true});
        register({name: 'works'}, {required: true});
        register({name: 'machine'}, {required: true});
        register({name: 'totalHours'}, {required: true});
        register({name: 'gasLiters'}, {required: true});
        register({name: 'comments'}, {required: false});
        register({name: 'file'}, {required: true});
        register({name: 'employee'}, {required: true});
        //Machines form => 0
        if(formType.type == 0){
            register({name: 'hammerTime'}, {required: true});
        }else if(formType.type == 1){
            register({name: 'portes'}, {required: true});
        }else if(formType.type == 2){
            register({name: 'originPoint'}, {required: true});
            register({name: 'tons'}, {required: true});
        }else if(formType.type == 3){
            register({name: 'destinationPoint'}, {required: true});
        }else if(formType.type == 3 || formType.type ==2){
            register({name: 'material'}, {required: true});
            register({name: 'numberOfTrips'}, {required: true});
        }
    }, [register]);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
        setValue('date', date, true);
    };

    const showMode = currentMode => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        if (!show) {
            showMode('date');
            setTextButton('Date selected');
        } else {
            setShow(false);
            setTextButton('Select date');
        }
    };

    // More info on all the options is below in the API Reference... just some common use cases shown here
    const options = {
        title: 'Select Avatar',
        customButtons: [{name: 'fb', title: 'Choose Photo from Facebook'}],
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
        ImagePicker.showImagePicker(options, response => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const source = {uri: response.uri};
                const imageData = {uri: response.data};

                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };
                setAvatarSource(source);
                setdataImageBase64(imageData);
                //Poner ejemplo tonto para no escribir 8 megas en el string.
                setValue('file', dataImageBase64, true);
                setShowImage(true);
            }
        });
    };

    return (
        <View>
            <ScrollView>
                <Text>Fecha</Text>
                <Text>
                    {date.getUTCDate().toString() +
                    ' ' +
                    (date.getUTCMonth() + 1).toString() +
                    ' ' +
                    date.getUTCFullYear().toString()}
                </Text>
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
                <TextInput
                    style={LoginViewStyles.input}
                    onChangeText={text => setValue('works', text, true)}
                />
                {errors.works && <Text>"Debe indicar la obra"</Text>}

                <Text>Maquina</Text>
                <TextInput
                    style={LoginViewStyles.input}
                    onChangeText={text => setValue('machine', text, true)}
                />
                {errors.machine && <Text>"Debe indicar la maquina"</Text>}

                {(formType.type == 1) &&
                <View>
                    <Text>Portes</Text>
                    <TextInput style={LoginViewStyles.input} onChangeText={text => setValue('portes', text, true)}/>
                    {errors.material && <Text>"Debe indicar los portes"</Text>}
                </View>
                }

                {(formType.type == 2 || formType.type ==3) &&
                    <View>
                        <Text>Material</Text>
                        <TextInput style={LoginViewStyles.input} onChangeText={text => setValue('material', text, true)}/>
                        {errors.material && <Text>"Debe indicar el material"</Text>}

                        <Text>Numero de viajes</Text>
                        <TextInput style={LoginViewStyles.input} onChangeText={text => setValue('numberOfTrips', text, true)}/>
                        {errors.numberOfTrips && <Text>"Debe indicar el número de viajes"</Text>}
                    </View>
                }

                {formType.type == 2 &&
                    <View>
                        <Text>Origen</Text>
                        <TextInput style={LoginViewStyles.input} onChangeText={text => setValue('originPoint', text, true)}/>
                        {errors.originPoint && <Text>"Debe indicar el origen"</Text>}

                        <Text>Toneladas</Text>
                        <TextInput style={LoginViewStyles.input} onChangeText={text => setValue('tons', text, true)}/>
                        {errors.tons && <Text>"Debe indicar las toneladas"</Text>}
                    </View>
                }

                {formType.type == 3 &&
                    <View>
                        <Text>Destino</Text>
                        <TextInput style={LoginViewStyles.input} onChangeText={text => setValue('destinationPoint', text, true)}/>
                        {errors.destinationPoint && <Text>"Debe indicar las toneladas"</Text>}
                    </View>
                }

                <Text>Horas totales</Text>
                <TextInput
                    style={LoginViewStyles.input}
                    onChangeText={text => setValue('totalHours', text, true)}
                />
                {errors.totalHours && <Text>"Debe indicar las horas de cazo"</Text>}
                {formType.type == 0 &&
                    <View>
                        <Text>Horas martillo</Text>
                        <TextInput
                            style={LoginViewStyles.input}
                            onChangeText={text => setValue('hammerTime', text, true)}
                        />
                        {errors.hammerTime && <Text>"Debe indicar las horas de martillo"</Text>}
                    </View>
                }

                <Text>Litros de gasóleo reportado</Text>
                <TextInput
                    style={LoginViewStyles.input}
                    onChangeText={text => setValue('gasLiters', text, true)}
                />
                {errors.gasLiters && <Text>"Debe indicar los litros de gasóleo repostado"</Text>}


                <Text>Comentarios</Text>
                <TextInput
                    style={LoginViewStyles.input}
                    onChangeText={text => setValue('comments', text, false)}
                />
                {errors.comments && <Text>"Ha ocurrido un error"</Text>}


                <Text>Empleado</Text>
                <TextInput
                    style={LoginViewStyles.input}
                    onChangeText={text => setValue('employee', text, true)}
                />
                {errors.employee && <Text>"Debe seleccionar el empleado"</Text>}

                <Text>Imagen</Text>
                <View>
                    {showImage && (
                        <Image style={{width: 100, height: 100}} source={avatarSource} />
                    )}
                </View>
                <View>
                    <Button onPress={pickImage} title={'Seleccionar Imagen'} />
                </View>
                {errors.file && <Text>"Debe subir una imagen"</Text>}
                <Button title="Send" onPress={console.log("handleSubmit(onSubmit)")} />
            </ScrollView>
        </View>
    );

};

export default FormView;
