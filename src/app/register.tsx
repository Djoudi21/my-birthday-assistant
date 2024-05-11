import * as React from "react";
import {SafeAreaView, TouchableOpacity, View} from "react-native";
import {TextInput, Text, Button} from 'react-native-paper';
import {Controller} from "react-hook-form";
import {useAuth} from "@/hooks/useAuth";

export default function RegisterScreen() {
    const {onPressVerify, onRegisterPress, code, onSetCode, pendingVerification, registerControl,registerErrors,  registerHandleSubmit} = useAuth()

    return (
        <SafeAreaView className={'flex-1'}>
            {!pendingVerification && (
                <View className={'flex flex-col gap-5 p-4'}>
                    <Controller
                        control={registerControl}
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
                    {registerErrors.email && <Text className={'text-red-700'}>This is required.</Text>}

                    <Controller
                        control={registerControl}
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
                    {registerErrors.password && <Text className={'text-red-700'}>This is required.</Text>}

                    <Controller
                        control={registerControl}
                        rules={{
                            required: true,
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                mode="outlined"
                                placeholder="firstName"
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                            />
                        )}
                        name="firstName"
                    />
                    {registerErrors.firstName && <Text style={{textDecorationColor: 'red'}} className={'text-red-700'}>This is required.</Text>}

                    <Controller
                        control={registerControl}
                        rules={{
                            required: true,
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                mode="outlined"
                                placeholder="lastName"
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                            />
                        )}
                        name="lastName"
                    />
                    {registerErrors.lastName && <Text className={'text-red-700'}>This is required.</Text>}

                    <Button mode={'contained'} onPress={registerHandleSubmit(onRegisterPress)}>Valider</Button>

                </View>
            )}
            {pendingVerification && (
                <View>
                    <View>
                        <TextInput
                            value={code}
                            keyboardType='numeric'
                            placeholder="Code..."
                            onChangeText={(code) => onSetCode(code)}
                        />
                    </View>
                    <TouchableOpacity onPress={onPressVerify}>
                        <Text>Verify Email</Text>
                    </TouchableOpacity>
                </View>
            )}
        </SafeAreaView>
    );
}
