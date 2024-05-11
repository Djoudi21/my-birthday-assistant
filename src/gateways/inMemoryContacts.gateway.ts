import {ContactsGateway} from "@/gateways/interfaces/contacts.gateway";
import {Contact, CreateContactResponse, ListContactsResponse, UpdateContactResponse} from "@/types/contacts";

export class InMemoryContactsGateway implements ContactsGateway {
    public contacts: Contact[] = [
        {name: 'ABDEqsdqsdLqe', birthday: new Date(), id: 1, description: 'zaer'},
        {name: 'sdf', birthday: new Date(), id: 2, description: 'zaer'},
    ];

    listContacts(): Promise<ListContactsResponse> {
        return Promise.resolve({
            data: {
                status: 200,
                contacts: this.contacts
            }
        });
    }

    createContact(newContact: Contact): Promise<CreateContactResponse> {
        this.contacts.push(newContact)
        return Promise.resolve({
            data: {
                status: 200,
                contact: this.contacts[0]
            }
        });;
    }

    updateContact(contact: Contact): Promise<UpdateContactResponse> {
        return Promise.resolve(undefined);
    }
}
