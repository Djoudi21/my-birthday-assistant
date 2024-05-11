import * as React from "react";
import {SafeAreaView, TouchableOpacity, View} from "react-native";
import {TextInput, Text, Button} from 'react-native-paper';
import {Controller} from "react-hook-form";
import {useAuth} from "@/hooks/useAuth";

export default function LoginScreen() {
    const {
        onLoginPress,
        loginControl,
        loginHandleSubmit,
        loginErrors
    } = useAuth()

    return (
        <SafeAreaView className={'flex-1 flex-col gap-5 bg-emerald-50'}>
            <Controller
                control={loginControl}
                rules={{
                    required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        mode="outlined"
                        placeholder="email"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                    />
                )}
                name="email"
            />
            {loginErrors.email && <Text className={'text-red-700'}>This is required.</Text>}

            <Controller
                control={loginControl}
                rules={{
                    maxLength: 100,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        mode="outlined"
                        placeholder="password"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                    />
                )}
                name="password"
            />
            {loginErrors.password && <Text className={'text-red-700'}>This is required.</Text>}

            <Button mode={'contained'} onPress={loginHandleSubmit(onLoginPress)}>Valider</Button>
        </SafeAreaView>
    );
}
