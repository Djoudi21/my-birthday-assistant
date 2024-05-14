import {Button, Text, View} from "react-native";
import {useI18n} from "@/hooks/useI18n";
import {useAuth} from "@clerk/clerk-expo";
import {router} from "expo-router";

export default function LogOutButton() {
    const {i18n} = useI18n()
    const { isLoaded,signOut } = useAuth();
    if (!isLoaded) {
        return null;
    }
    return (
        <View>
            <Button
                title={i18n.t('logOut')}
                onPress={async () => {
                    await signOut();
                    router.replace('/');
                }}
            />
        </View>
    )
}
