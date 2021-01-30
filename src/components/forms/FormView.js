import React, {useEffect, useState, useRef} from 'react';
import {Text, View, TextInput, Button, Alert, Image, ScrollView} from 'react-native';
import {useForm} from 'react-hook-form';
import LoginViewStyles from '../login/LoginViewStyles';
import DateTimePicker from '@react-native-community/datetimepicker';
import ImagePicker from 'react-native-image-picker';
import {Picker} from '@react-native-community/picker';
import {addTicket} from '../../api/ApiRequests';
import * as Keychain from "react-native-keychain";
import {formatDate, typeFromNumberToWord} from '../../utils/Utils';

const FormView = ({type, sitesArray, navigation}) => {
    const [formType, setFormType] = useState(type);
    const {register, setValue, handleSubmit, errors} = useForm();

    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [avatarSource, setAvatarSource] = useState('Debe seleccionar una imagen');
    const [textButton, setTextButton] = useState('Select date');
    const [showImage, setShowImage] = useState(false);
    const [dataImageBase64, setdataImageBase64] = useState(null);

    const manageResponseAddTicket = async (ticketData, navigation) => {
        let responseAddTicket = await addTicket(ticketData);
        console.log('status: ' + responseAddTicket.status);
        if(responseAddTicket.status == 200){
            Alert.alert('Ticket added', 'Ticket successfully added');
            navigation.navigate('HomePage');
        }else{
            Alert.alert('Error', 'There was an error. Try it later');
        }
    };
    {console.log("lo que le paso" + JSON.stringify(sitesArray))}
    {console.log("FormType: " + formType)}

    const onSubmit = async data => {
        let formDataRequest = new FormData();
        formDataRequest.append('date', formatDate(data.date));
        formDataRequest.append('type', typeFromNumberToWord(formType));
        formDataRequest.append('site', data.works.toString());
        formDataRequest.append('machine', data.machine.toString());
        formDataRequest.append('hours', data.totalHours);
        formDataRequest.append('liters', data.gasLitters);
        formDataRequest.append('comments', data.comments);
        formDataRequest.append('file', data.file);

        //Need to check the "provider" field in the backend
        if(formType == 0){
            formDataRequest.append('hammer_hours', data.hammerTime);
        }else if(formType == 1){
            formDataRequest.append('portages', data.portes);
        }else if(formType == 2){
            formDataRequest.append('provider', data.originPoint);
            formDataRequest.append('tons', data.tons);
            formDataRequest.append('material', data.material);
            formDataRequest.append('num_travels', data.numberOfTrips);
        }else if(formType == 3){
            formDataRequest.append('provider', data.destinationPoint);
            formDataRequest.append('material', data.material);
            formDataRequest.append('num_travels', data.numberOfTrips);
        }
        manageResponseAddTicket(formDataRequest, navigation);
    };

    useEffect(() => {

        register({name: 'date'}, {required: true});
        register({name: 'works'}, {required: true});
        register({name: 'machine'}, {required: true});
        register({name: 'totalHours'}, {required: false});
        register({name: 'gasLitters'}, {required: true});
        register({name: 'comments'}, {required: false});
        register({name: 'file'}, {required: false});
        //Machines form => 0
        if(formType == 0){
            register({name: 'hammerTime'}, {required: true});
        }else if(formType == 1){
            register({name: 'portes'}, {required: true});
        }else if(formType == 2){
            register({name: 'originPoint'}, {required: true});
            register({name: 'tons'}, {required: true});
            register({name: 'material'}, {required: true});
            register({name: 'numberOfTrips'}, {required: true});
        }else if(formType == 3){
            register({name: 'destinationPoint'}, {required: true});
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
                setdataImageBase64("data:image/png;base64," + imageData.uri);
                //Poner ejemplo tonto para no escribir 8 megas en el string.
                setValue('file', "data:image/png;base64," + imageData.uri, true);
                setShowImage(true);
            }
        });
    };

    let listPlaces =  [<Picker.Item label={""} value={""}/>];
    let listMachines = [<Picker.Item label={""} value={""}/>];
    let listMaterials = [<Picker.Item label={""} value={""}/>];
    let listPlacesFrom = [<Picker.Item label={""} value={""}/>];
    let listPlacesTo = [<Picker.Item label={""} value={""}/>];
    let listPortes = [<Picker.Item label={""} value={""}/>];
    if(sitesArray.has("sites")){
        listPlaces = [];
        listMachines = [];
        listMaterials = [];
        listPlacesFrom = [];
        listPlacesTo = [];
        listPortes = [];
        setValue("works", sitesArray.get("sites").keys().next().value, true);
        sitesArray.get("sites").forEach((value, key) => listPlaces.push(<Picker.Item label={value} value={key}/>));
        setValue("machine", sitesArray.get("machines").keys().next().value, true);
        sitesArray.get("machines").forEach((value, key) => listMachines.push(<Picker.Item label={value} value={key}/>));
        setValue("material", sitesArray.get("materials").keys().next().value, true);
        sitesArray.get("materials").forEach((value, key) => listMaterials.push(<Picker.Item label={value} value={key}/>));
        setValue("originPoint", sitesArray.get("placesFrom").keys().next().value, true);
        sitesArray.get("placesFrom").forEach((value, key) => listPlacesFrom.push(<Picker.Item label={value} value={key}/>));
        setValue("destinationPoint", sitesArray.get("placesTo").keys().next().value, true);
        sitesArray.get("placesTo").forEach((value, key) => listPlacesTo.push(<Picker.Item label={value} value={key}/>));
        setValue("portes", sitesArray.get("portages").keys().next().value, true);
        sitesArray.get("portages").forEach(portage => listPortes.push(<Picker.Item label={portage} value={portage}/>));
    }


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
                <Picker
                    style={{height:50, width: 300}}
                    onValueChange = {(itemValue, itemIndex) => setValue('works', itemValue, true)}>
                    {listPlaces}
                </Picker>
                {errors.works && <Text>"Debe indicar la obra"</Text>}

                <Text>Máquina</Text>
                <Picker
                    style={{height:50, width: 300}}
                    onValueChange = {(itemValue, itemIndex) => setValue('machine', itemValue, true)}>
                    {listMachines}
                </Picker>
                {errors.machine && <Text>"Debe indicar la maquina"</Text>}

                {(formType == 1) &&
                <View>
                    <Text>Portes</Text>
                    <Picker
                        style={{height:50, width: 300}}
                        onValueChange = {(itemValue, itemIndex) => setValue('portes', itemValue, true)}>
                        {listPortes}
                    </Picker>
                    {errors.material && <Text>"Debe indicar los portes"</Text>}
                </View>
                }

                {(formType == 2 || formType ==3) &&
                    <View>
                        <Text>Material</Text>
                        <Picker
                            style={{height:50, width: 300}}
                            onValueChange = {(itemValue, itemIndex) => setValue('material', itemValue, true)}>
                            {listMaterials}
                        </Picker>
                        {errors.material && <Text>"Debe indicar el material"</Text>}

                        <Text>Numero de viajes</Text>
                        <TextInput style={LoginViewStyles.input} onChangeText={text => setValue('numberOfTrips', text, true)}/>
                        {errors.numberOfTrips && <Text>"Debe indicar el número de viajes"</Text>}
                    </View>
                }

                {formType == 2 &&
                    <View>
                        <Text>Origen</Text>
                        <Picker
                            style={{height:50, width: 300}}
                            onValueChange = {(itemValue, itemIndex) => setValue('originPoint', itemValue, true)}>
                            {listPlacesFrom}
                        </Picker>
                        {errors.originPoint && <Text>"Debe indicar el origen"</Text>}

                        <Text>Toneladas</Text>
                        <TextInput style={LoginViewStyles.input} onChangeText={text => setValue('tons', text, true)}/>
                        {errors.tons && <Text>"Debe indicar las toneladas"</Text>}
                    </View>
                }

                {formType == 3 &&
                    <View>
                        <Text>Destino</Text>
                        <Picker
                            style={{height:50, width: 300}}
                            onValueChange = {(itemValue, itemIndex) => setValue('destinationPoint', itemValue, true)}>
                            {listPlacesTo}
                        </Picker>
                        {errors.destinationPoint && <Text>"Debe indicar las toneladas"</Text>}
                    </View>
                }

                <Text>Horas totales</Text>
                <TextInput
                    style={LoginViewStyles.input}
                    onChangeText={text => setValue('totalHours', text, true)}
                />
                {errors.totalHours && <Text>"Debe indicar las horas de cazo"</Text>}
                {formType == 0 &&
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
                    onChangeText={text => setValue('gasLitters', text, true)}
                />
                {errors.gasLitters && <Text>"Debe indicar los litros de gasóleo repostado"</Text>}


                <Text>Comentarios</Text>
                <TextInput
                    style={LoginViewStyles.input}
                    onChangeText={text => setValue('comments', text, false)}
                />
                {errors.comments && <Text>"Ha ocurrido un error"</Text>}

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
                <Button title="Send" onPress={handleSubmit(onSubmit)} />
            </ScrollView>
        </View>
    );

};

export default FormView;
