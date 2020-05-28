import React, { useEffect } from "react";
import { Text, View, TextInput, Button, Alert } from "react-native";
import { useForm } from "react-hook-form";
import LoginViewStyles from './LoginViewStyles';

const LoginView = ({navigation}) => {
    const { register, setValue, handleSubmit, errors } = useForm();
    const onSubmit = data => {Alert.alert("Form Data", JSON.stringify(data));navigation.navigate('HomePage');};

    useEffect(() => {
        register({ name: 'email'}, { required: true });
        register({ name: 'password'}, {required: true});
    }, [register]);


    return (
        <View>
            <Text>Email</Text>
            <TextInput style={LoginViewStyles.input}
                onChangeText={text => setValue("email", text, true)}
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