import {Stack, useRouter} from "expo-router";
import {Text, TouchableOpacity} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {COLORS} from "@/utils/colors";
import {useI18n} from "@/hooks/useI18n";

export default function HomeLayout() {
    const router = useRouter();
    const {i18n} = useI18n()

    return <Stack screenOptions={{ headerShown: false }} >
        <Stack.Screen
            name={'index'}
            options={{
                headerStyle: { backgroundColor: 'white' },
                headerShown: true,
                headerLargeTitle: true,
                headerTitle: `${i18n.t('contactsPageTitle')}`,
                headerRight: () => (
                    <TouchableOpacity onPress={()=> router.push('/contacts/contactFormScreen')} className={'mr-4'}>
                        <FontAwesome name="user-plus" size={24} color={COLORS.primary} />
                    </TouchableOpacity>
                ),
            }}
        />
        <Stack.Screen
            name={'contactDetailsScreen'}
            options={{
                headerBackTitleVisible: false,
                headerStyle: { backgroundColor: 'white' },
                headerShown: true,
            }}
        />
        <Stack.Screen
            name={'contactFormScreen'}
            options={{
                headerBackTitleVisible: false,
                headerStyle: { backgroundColor: 'white' },
                headerTitle: props => <Text className={`font-semibold font-lg text-[${COLORS.primary}]`}>Ajouter un contact</Text>,
                headerShown: true,
            }}
        />
    </Stack>
}
