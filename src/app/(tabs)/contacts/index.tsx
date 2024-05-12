import {SafeAreaView, TouchableOpacity, View} from "react-native";
import {FlashList} from "@shopify/flash-list";
import ContactListItem from "@/components/ContactListItem";
import {useRouter} from "expo-router";
import {ActivityIndicator} from "react-native-paper";
import {COLORS} from "@/utils/colors";
import {useContactsQuery} from "@/hooks/useContactsQuery";
import {Contact} from "@/types/contacts";

export default function ContactsTab() {
    const {data, isPending} = useContactsQuery()
    const router = useRouter();

    if (isPending) {
        return   <ActivityIndicator animating={true} color={COLORS.primary} />
    }

    const handleRedirectToDetails = (item: Contact) => {
        router.push({
            pathname: "/contacts/contactDetailsScreen",
            params: {
                id: item.id,
                description: item.description,
                name: item.name,
                birthday: item.birthday.toString(),
                createdAt: item.createdAt.toString(),
                updatedAt: item.updatedAt.toString(),
                userId: item.userId,
            },
        })
    }

    return (
        <SafeAreaView className={'flex-1'} style={{flex: 1}}>
            <View className="flex-1 bg-white pt-4">
                <FlashList
                    contentContainerStyle={{padding: 4}}
                    data={data ?? []}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => handleRedirectToDetails(item)}
                            className={'mb-4'}
                        >
                            <ContactListItem birthday={item.birthday?.toString()} name={item.name} />
                        </TouchableOpacity>
                    )}
                    estimatedItemSize={1}
                />
            </View>
        </SafeAreaView>
    )
}
