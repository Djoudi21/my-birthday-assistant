import {useQuery} from "@tanstack/react-query";
import {Contact, ListContactsResponse} from "@/types/contacts";
import {FetchContactsGateway} from "@/gateways/fetchContacts.gateway";
import {ListContactsUseCase} from "@/use-cases/contacts/listContacts";
import {useUser} from "@clerk/clerk-expo";

export const useContactsQuery = () => {
    const {user} = useUser()

    const fetchContactsList = async (): Promise<ListContactsResponse['data']['contacts']> => {
        const contactsGateway = new FetchContactsGateway()
        const listContactsUseCase = new ListContactsUseCase(contactsGateway);
        const res = await listContactsUseCase.execute()
        const contacts = res.data.contacts
        return new Promise(resolve => resolve(contacts))
    }
    // Queries
    const { data, isPending, isError, error } = useQuery<Contact[]>({
        queryKey: ['contacts'],
        queryFn: async () => {
            return await fetchContactsList()
        },
    })

    return {
        data,
        isPending,
        isError,
        error
    }
}
