import {SafeAreaView, Text, View, Button} from "react-native";
import { SignedIn, SignedOut,useAuth } from "@clerk/clerk-expo";
import {router} from "expo-router";

export default function Settings() {
    const SignOut = () => {
        const { isLoaded,signOut } = useAuth();
        if (!isLoaded) {
            return null;
        }
        return (
            <View>
                <Button
                    title="Sign Out"
                    onPress={async () => {
                        await signOut();
                        router.replace('/');
                    }}
                />
            </View>
        );
    };

    return (
        <SafeAreaView className={'flex-1 bg-white'}>
            <View className={'flex-1'}>
                <SignedIn>
                    <Text>You are Signed in</Text>
                    <SignOut/>
                </SignedIn>
                <SignedOut>
                </SignedOut>
            </View>
        </SafeAreaView>
    )
}
