import {FetchAuthGateway} from "@/gateways/fetchAuth.gateway";
import {RegisterUserUseCase} from "@/use-cases/auth/registerUserUseCase";
import {useSignIn, useSignUp} from "@clerk/clerk-expo";
import * as React from "react";
import {useForm} from "react-hook-form";
import {LoginUserUseCase} from "@/use-cases/auth/loginUserUseCase";
import {useRouter} from "expo-router";

type RegisterFormData = {
    email: string
    password: string
    firstName: string
    lastName: string
}

type LoginFormData = {
    email: string
    password: string
}

export const useAuth = () => {
    const router = useRouter();
    const { isLoaded: isSignUpLoaded, signUp, setActive: setSignUpActive } = useSignUp();
    const { isLoaded: isSignInLoaded, signIn, setActive: setSignInActive } = useSignIn();
    const [code, setCode] = React.useState("");
    const [hidePassword, setHidePassword] = React.useState(true);
    const [pendingVerification, setPendingVerification] = React.useState(false);

    const {
        control: registerControl,
        handleSubmit: registerHandleSubmit,
        getValues: registerGetValues,
        formState: { errors: registerErrors },
    } = useForm<RegisterFormData>({
        defaultValues: {
            email: 'abdelkrim.djoudi@gmail.com',
            password: 'Gstarraw95100',
            firstName: 'a',
            lastName: 'a',
        },
    })

    const {
        control: loginControl,
        handleSubmit: loginHandleSubmit,
        formState: { errors: loginErrors },
    } = useForm<LoginFormData>({
        defaultValues: {
            email: 'abdelkrim.djoudi@gmail.com',
            password: 'Gstarraw95100',
        },
    })

    const onSetCode = (code) => {
        setCode(code)
    }

    // This verifies the user using email code that is delivered.
    const onPressVerify = async () => {
        if (!isSignUpLoaded) {
            return;
        }

        try {
            const completeSignUp = await signUp.attemptEmailAddressVerification({
                code,
            });
            if(completeSignUp.status === "complete") {
                const authGateway = new FetchAuthGateway()
                const registerUserUseCase = new RegisterUserUseCase(authGateway)
                await registerUserUseCase.execute({
                    email: registerGetValues().email,
                    password: registerGetValues().password,
                    firstName: registerGetValues().firstName,
                    lastName: registerGetValues().lastName,
                    authToolUserId: completeSignUp.createdUserId
                })
            }

            await setSignUpActive({ session: completeSignUp.createdSessionId });
            // router.replace('/(tabs)');
        } catch (err: any) {
            console.error(JSON.stringify(err, null, 2));
        }
    };


    // start the sign up process.
    const onRegisterPress = async (data) => {
        if (!isSignUpLoaded) {
            return;
        }

        try {
            await signUp.create({
                firstName: data.firstName,
                lastName: data.lastName,
                emailAddress: data.email,
                password: data.password,
            });

            // send the email.
            await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
            // change the UI to our pending section.
            setPendingVerification(true);
        } catch (err: any) {
            console.error(JSON.stringify(err, null, 2));
        }
    };


    const onLoginPress = async (data) => {
        if (!isSignInLoaded) return

        try {
            const completeSignIn = await signIn.create({
                identifier: data.email,
                password: data.password,
            });
/*
            if(completeSignIn.status === "complete") {
                const authGateway = new FetchAuthGateway()
                const loginUserUseCase = new LoginUserUseCase(authGateway)
                await loginUserUseCase.execute({
                    email: registerGetValues().email,
                    password: registerGetValues().password,
                })
            }*/

            router.push('/(tabs)')
            // This is an important step,
            // This indicates the user is signed in
            await setSignInActive({ session: completeSignIn.createdSessionId });
        } catch (err: any) {
            console.error(JSON.stringify(err, null, 2));
        }
    }

    return {
        onPressVerify,
        onRegisterPress,
        onLoginPress,
        code,
        onSetCode,
        pendingVerification,
        registerControl,
        registerHandleSubmit,
        registerErrors,
        loginControl,
        loginHandleSubmit,
        loginErrors,
    }
}
