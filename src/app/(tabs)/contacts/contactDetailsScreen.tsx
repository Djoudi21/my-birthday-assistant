import {SafeAreaView} from "react-native";
import ContactForm from "@/components/ContactForm";
import {Contact, NewContact, UpdateContactResponse} from "@/types/contacts";
import React from "react";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {FetchContactsGateway} from "@/gateways/fetchContacts.gateway";
import {useLocalSearchParams, useRouter} from "expo-router";
import {UpdateContactUseCase} from "@/use-cases/contacts/updateContactUseCase";

export default function ContactDetailsScreen() {
    const router = useRouter();
    const params = useLocalSearchParams() as unknown as Contact;
    const queryClient = useQueryClient()

    const updateContact = async (contact: NewContact): Promise<UpdateContactResponse['data']['contact']> => {
        const contactsGateway = new FetchContactsGateway()
        const updateContactUseCase = new UpdateContactUseCase(contactsGateway);
        const contactToUpdate: Contact = {
            id: params.id,
            name: contact.name,
            description: contact.description,
            birthday: new Date(contact.birthday),
            createdAt: new Date(params.createdAt),
            userId: params.userId,
            updatedAt: new Date(),
        }

        const res = await updateContactUseCase.execute(contactToUpdate)
        const updatedContact: Contact = res.data.contact

        return new Promise(resolve => resolve(updatedContact))
    }

    // Mutations
    const addMutation = useMutation({
        mutationFn: (data: NewContact) => updateContact({...data}),
        onSuccess: () => {
            router.navigate('/contacts')
        },
        onSettled: async () => {
            return await queryClient.invalidateQueries({queryKey: ['contacts']})
        },
    })

    return (
        <SafeAreaView className={'flex-1 bg-white'}>
            <ContactForm
                defaultValues={{
                    name: params.name,
                    birthday: new Date(params.birthday),
                    description: params.description,
                }}
                onSubmit={(data: NewContact) => addMutation.mutate(data)} />
        </SafeAreaView>
    )
}
