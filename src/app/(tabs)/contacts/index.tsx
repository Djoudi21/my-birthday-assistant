import {SafeAreaView, Text, TouchableOpacity, View} from "react-native";
import {FlashList} from "@shopify/flash-list";
import ContactListItem from "@/components/ContactListItem";
import {useRouter} from "expo-router";
import {ActivityIndicator} from "react-native-paper";
import {COLORS} from "@/utils/colors";
import {useContactsQuery} from "@/hooks/useContactsQuery";

export default function ContactsTab() {
    const router= useRouter();
    const {data, isPending, isError, error} = useContactsQuery()

    if (isPending) {
        return   <ActivityIndicator animating={true} color={COLORS.primary} />
    }

    if (isError) {
        return <span>Error: {error.message}</span>
    }

    return (
        <SafeAreaView className={'flex-1'} style={{flex: 1}}>
            <View className="flex-1 bg-white pt-4">
                <FlashList
                    contentContainerStyle={{padding: 4}}
                    data={data ?? []}
                    renderItem={({ item }) => <TouchableOpacity className={'mb-4'} onPress={() => {
                        router.push('/contacts/contactDetailsScreen')
                    }}>
                        <ContactListItem birthday={item.birthday?.toString()} name={item.name} />
                    </TouchableOpacity>}
                    estimatedItemSize={1}
                />
            </View>
        </SafeAreaView>
    )
}
