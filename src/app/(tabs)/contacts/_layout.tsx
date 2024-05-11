import {Stack, useRouter} from "expo-router";
import {Text, TouchableOpacity} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {COLORS} from "@/utils/colors";

export default function HomeLayout() {
    const router = useRouter();
    return <Stack screenOptions={{ headerShown: false }} >
        <Stack.Screen
            name={'index'}
            options={{
                headerStyle: { backgroundColor: 'white' },
                headerTitle: props => <Text></Text>,
                headerShown: true,
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
