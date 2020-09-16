import React, { useEffect } from "react";
import { Text, View, TextInput, Button, Alert } from "react-native";
import { useForm } from "react-hook-form";
import LoginViewStyles from './LoginViewStyles';
import * as Keychain from 'react-native-keychain';

const LoginView = ({navigation}) => {
    const { register, setValue, handleSubmit, errors } = useForm();
    const onSubmit = data => {
        let formDataRequest = new FormData();
        formDataRequest.append("username",data.username);
        formDataRequest.append("password",data.password);
        fetch('http://symfony.localhost:82/es/authenticate', {
            method: 'POST',
            headers:{"Content-Type":"multipart/form-data"},
            body: formDataRequest

        }).then(r => {
            console.log("status: " + r.status);
            switch (r.status) {
                case 401:
                    Alert.alert("Invalid Credentials", "Username or password invalid");
                    break;
                case 200:
                    r.json().then(goodResult => Keychain.setGenericPassword('tokenUrbtck', goodResult.token).then(navigation.navigate("HomePage")));
                    break;
                default:
                    Alert.alert("Error", "Unknown Error");
            }
        }).catch((error) => {
            console.error(error);
        });
    };

    useEffect(() => {
        register({ name: 'username'}, { required: true });
        register({ name: 'password'}, {required: true});
    }, [register]);


    return (
        <View>
            <Text>Email</Text>
            <TextInput style={LoginViewStyles.input}
                onChangeText={text => setValue("username", text, true)}
                autoCapitalize = 'none'
            />
            {errors.email && <Text>"Email is required"</Text>}

            <Text>Password</Text>
            <TextInput style={LoginViewStyles.input}
                onChangeText={text => setValue("password", text, true)}
            />
            {errors.password && <Text>"Password is required"</Text>}

            <Button title="Login" onPress={handleSubmit(onSubmit)}></Button>
        </View>
    );
};

export default LoginView;