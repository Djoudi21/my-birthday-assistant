import {FetchAuthGateway} from "@/gateways/fetchAuth.gateway";
import {RegisterUserUseCase} from "@/use-cases/auth/registerUserUseCase";
import {useSignUp} from "@clerk/clerk-expo";
import * as React from "react";
import {useForm} from "react-hook-form";

type FormData = {
    email: string
    password: string
    firstName: string
    lastName: string
}

export const useAuth = () => {
    const { isLoaded, signUp, setActive } = useSignUp();
    const [code, setCode] = React.useState("");
    const [hidePassword, setHidePassword] = React.useState(true);
    const [pendingVerification, setPendingVerification] = React.useState(false);

    const {
        control,
        handleSubmit,
        getValues,
        formState: { errors },
    } = useForm<FormData>({
        defaultValues: {
            email: 'abdelkrim.djoudi@gmail.com',
            password: 'Gstarraw95100',
            firstName: 'a',
            lastName: 'a',
        },
    })

    const onSetCode = (code) => {
        setCode(code)
    }

    // This verifies the user using email code that is delivered.
    const onPressVerify = async () => {
        if (!isLoaded) {
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
                    email: getValues().email,
                    password: getValues().password,
                    firstName: getValues().firstName,
                    lastName: getValues().lastName,
                    authToolUserId: completeSignUp.createdUserId
                })
            }

            await setActive({ session: completeSignUp.createdSessionId });
            // router.replace('/(tabs)');
        } catch (err: any) {
            console.error(JSON.stringify(err, null, 2));
        }
    };


    // start the sign up process.
    const onSignUpPress = async (data) => {
        if (!isLoaded) {
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

    return {
        onPressVerify,
        onSignUpPress,
        code,
        onSetCode,
        pendingVerification,
        control,
        handleSubmit,
        errors
    }
}
