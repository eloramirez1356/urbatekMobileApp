import React, {useEffect, useState, useRef} from 'react';
import {Text, View, TextInput, Button, Alert, Image, ScrollView} from 'react-native';
import {useForm} from 'react-hook-form';
import LoginViewStyles from '../login/LoginViewStyles';
import DateTimePicker from '@react-native-community/datetimepicker';
import ImagePicker from 'react-native-image-picker';
import FormView from '../forms/FormView';
import {getTickets} from '../../api/ApiRequests';

/*
 * Add the library for selecting files from phone (ADDED) => Set correctly the buttons and set when it should appear or not. Add dropdown with values obtained from database in employee (Should we put
 * employee as it is the one that is going to use the app?). Remove button for selecting date and make it something for taping
 * or different gesture in the app.
 * */

const MachinesView = ({navigation}) => {
  const {register, setValue, handleSubmit, errors} = useForm();
  //const onSubmit = data => {Alert.alert("Form Data", JSON.stringify(data));navigation.navigate('HomePage');};
  const tickets = getTickets();;
  const onSubmit = data => {
    getJsonData();
  };

  return (
    <FormView type="0"></FormView>
  );
};

export default MachinesView;
