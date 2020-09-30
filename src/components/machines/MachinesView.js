import React, {useEffect, useState, useRef} from 'react';
import {Text, View, TextInput, Button, Alert, Image, ScrollView} from 'react-native';
import {useForm} from 'react-hook-form';
import LoginViewStyles from '../login/LoginViewStyles';
import DateTimePicker from '@react-native-community/datetimepicker';
import ImagePicker from 'react-native-image-picker';
import FormView from '../forms/FormView';

/*
 * Add the library for selecting files from phone (ADDED) => Set correctly the buttons and set when it should appear or not. Add dropdown with values obtained from database in employee (Should we put
 * employee as it is the one that is going to use the app?). Remove button for selecting date and make it something for taping
 * or different gesture in the app.
 * */

const MachinesView = ({navigation}) => {
  const {register, setValue, handleSubmit, errors} = useForm();
  //const onSubmit = data => {Alert.alert("Form Data", JSON.stringify(data));navigation.navigate('HomePage');};
  async function getJsonData() {
    try {
      let res = await fetch('http://127.0.0.1:82/es/api/add_ticket', {
        method: 'POST',
        headers: {
          Accept: 'X-AUTH-TOKEN',
          'X-AUTH-TOKEN': 'token',
        },
        body: JSON.stringify({
          prueba1: 'value1',
          prueba2: 'value2',
        }),
      });
      let json = await res.json();
      Alert.alert(json.data);
    } catch (error) {
      console.error(error);
    }
  }
  const onSubmit = data => {
    getJsonData();
  };

  return (
    <FormView type="0"></FormView>
  );
};

export default MachinesView;
