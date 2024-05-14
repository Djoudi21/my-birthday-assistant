import {SafeAreaView, TouchableOpacity, View} from "react-native";
import {FlashList} from "@shopify/flash-list";
import ContactListItem from "@/components/ContactListItem";
import {useRouter} from "expo-router";
import {ActivityIndicator} from "react-native-paper";
import {COLORS} from "@/utils/colors";
import {useContactsQuery} from "@/hooks/useContactsQuery";
import {Contact} from "@/types/contacts";
import MainContainer from "@/components/MainContainer";
import SwipeableRow from "@/components/SwipableRow";
import {useMutation} from "@tanstack/react-query";
import {User} from "@/types/auth";
import {FetchTokensGateway} from "@/gateways/fetchTokens.gateway";
import {RegisterPushTokenUseCase} from "@/use-cases/tokens/registerPushTokenUseCase/registerPushTokenUseCase";
import {FetchContactsGateway} from "@/gateways/fetchContacts.gateway";
import {DeleteContactUseCase} from "@/use-cases/contacts/deleteContactUseCase";

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

    const deleteContact = async ({contactId }) => {
        const contactGateway = new FetchContactsGateway()
        const deleteContactUseCase = new DeleteContactUseCase(contactGateway);
        await deleteContactUseCase.execute(contactId);
    };

    const addMutation = useMutation({
        mutationFn: ({ contactId }: {contactId: Contact['id']}) => {
            return deleteContact({ contactId })
        },
    })

    const onDelete = () => {
        addMutation.mutate({
            contactId: 1
        })
    }

    return (
        <MainContainer>
            <FlashList
                contentContainerStyle={{padding: 4}}
                data={data ?? []}
                renderItem={({ item }) => (
                    <SwipeableRow onDelete={onDelete}>
                        <TouchableOpacity
                            className={'mb-4'}
                        >
                            <ContactListItem birthday={item.birthday?.toString()} name={item.name} />
                        </TouchableOpacity>
                    </SwipeableRow>
                )}
                estimatedItemSize={1}
            />
        </MainContainer>
    )
}
