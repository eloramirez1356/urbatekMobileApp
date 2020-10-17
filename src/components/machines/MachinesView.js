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

const MachinesView = ({navigation}) => {
  const [sitesBackend, setSitesBackend] = useState([]);

  const getSites = async () => {
    const jsonTickets =  await getTickets();

    const getSiteFromTicketTest = (item, index) => {
      console.log("Site: " + JSON.stringify(item.site));
      console.log("Site index: " + index);
      const sitesOfWork = sitesBackend;
      sitesOfWork.push(item.site);
      setSitesBackend(sitesOfWork);
    };
    jsonTickets.forEach(await getSiteFromTicketTest);
  }

  useEffect(() => {getSites()}, []);

  return (
    <FormView type="0" sitesArray={sitesBackend}></FormView>
  );
};

export default MachinesView;
