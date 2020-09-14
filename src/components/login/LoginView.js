import React, { useEffect } from "react";
import { Text, View, TextInput, Button, Alert } from "react-native";
import { useForm } from "react-hook-form";
import LoginViewStyles from './LoginViewStyles';

const LoginView = ({navigation}) => {
    const { register, setValue, handleSubmit, errors } = useForm();
    const onSubmit = data => {
        fetch('http://0.0.0.0:82/es/authenticate', {
            method: 'POST',
            body: JSON.stringify(data)
        }).then(r => console.log(r)).then(console.log("No respuesta: " + JSON.stringify(data))).catch(error => {console.error(error)});
        /*fetch('https://jsonplaceholder.typicode.com/posts/1', {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
            })
            .catch((error) => {
                console.error(error);
            });*/
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