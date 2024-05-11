import {SafeAreaView} from "react-native";
import ContactForm from "@/components/ContactForm";
import {Contact, NewContact, UpdateContactResponse} from "@/types/contacts";
import React from "react";
import {useMutation} from "@tanstack/react-query";
import {FetchContactsGateway} from "@/gateways/fetchContacts.gateway";
import {useLocalSearchParams, useRouter} from "expo-router";
import {queryClient} from "expo-dev-launcher/bundle/providers/QueryProvider";
import {UpdateContactUseCase} from "@/use-cases/contacts/updateContactUseCase";

export default function ContactDetailsScreen() {
    const router = useRouter();
    const params = useLocalSearchParams() as unknown as Contact;

    const updateContact = async (contact: Contact): Promise<UpdateContactResponse> => {
        const contactsGateway = new FetchContactsGateway()
        const updateContactUseCase = new UpdateContactUseCase(contactsGateway);
        const updatedContact: Contact = {
            id: contact.id,
            name: contact.name,
            description: contact.description,
            birthday: contact.birthday,
        }

        const res = await updateContactUseCase.execute(updatedContact)
        const createdContact = res.data.contact
        console.log(createdContact)
        return new Promise(resolve => resolve({
            data: {
                status: 200,
                contact: createdContact,
            }
        }))
    }

    // Mutations
    const addMutation = useMutation({
        mutationFn: (data: NewContact) => updateContact({...data, id: params.id}),
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
