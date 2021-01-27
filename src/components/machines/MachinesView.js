import React, {useEffect, useState, useRef} from 'react';
import {Text, View, TextInput, Button, Alert, Image, ScrollView} from 'react-native';
import {useForm} from 'react-hook-form';
import LoginViewStyles from '../login/LoginViewStyles';
import DateTimePicker from '@react-native-community/datetimepicker';
import ImagePicker from 'react-native-image-picker';
import {Picker} from '@react-native-community/picker';
import FormView from '../forms/FormView';
import {getTickets} from '../../api/ApiRequests';
import {get} from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import {getInfo} from '../../utils/Utils';

const MachinesView = ({navigation}) => {
  const [sitesBackend, setSitesBackend] = useState([]);
  const [info, setInfo] = useState(new Map());

  useEffect(() => {getInfo().then(result => setInfo(result))}, []);

  return (
    <FormView type="0" sitesArray={info} navigation={navigation}></FormView>
  );
};

export default MachinesView;
