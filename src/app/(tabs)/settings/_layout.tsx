import {Stack} from "expo-router";
import {COLORS} from "@/utils/colors";
import {useI18n} from "@/hooks/useI18n";

export default function SettingsLayout() {
    const {i18n} = useI18n()
    return (
        <Stack
            screenOptions={{
                headerShown: false,
            }}>
            <Stack.Screen
                name="index"
                options={{
                    headerShown: true,
                    headerLargeTitle: true,
                    headerTitle: `${i18n.t('settingsPageTitle')}`,
                    headerShadowVisible: false
                }}
            />
        </Stack>
    )
}
