import React, {useEffect} from 'react';
import {Text, View, TextInput, Button, Alert} from 'react-native';
import {useForm} from 'react-hook-form';
import LoginViewStyles from './LoginViewStyles';
import * as Keychain from 'react-native-keychain';
import {getResponseLogin} from '../../api/ApiRequests';

const LoginView = ({navigation}) => {
    const {register, setValue, handleSubmit, errors} = useForm();
    const manageResponseLogin = async (bodyCreds, navigation) => {
        let responseLogin = await getResponseLogin(bodyCreds);
        console.log('status: ' + responseLogin.status);
        switch (responseLogin.status) {
            case 401:
                Alert.alert('Invalid Credentials', 'Username or password invalid');
                break;
            case 200:
                let responseLoginJson = await responseLogin.json();
                Keychain.setGenericPassword('tokenUrbtck', responseLoginJson.token).then(navigation.navigate('HomePage'));
                break;
            default:
                Alert.alert('Error', 'Unknown Error');
        }
    };
    const onSubmit = data => {
        let formDataRequest = new FormData();
        formDataRequest.append('username', data.username);
        formDataRequest.append('password', data.password);
        manageResponseLogin(formDataRequest, navigation);
    };


    useEffect(() => {
        register({name: 'username'}, {required: true});
        register({name: 'password'}, {required: true});
    }, [register]);

    return (
        <View>
            <Text>Email</Text>
            <TextInput
                style={LoginViewStyles.input}
                onChangeText={text => setValue('username', text, true)}
                autoCapitalize="none"
            />
            {errors.email && <Text>"Email is required"</Text>}

            <Text>Password</Text>
            <TextInput
                style={LoginViewStyles.input}
                onChangeText={text => setValue('password', text, true)}
            />
            {errors.password && <Text>"Password is required"</Text>}

            <Button title="Login" onPress={handleSubmit(onSubmit)} />
        </View>
    );
};

export default LoginView;
