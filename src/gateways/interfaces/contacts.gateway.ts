import type {
    ListContactsResponse,
    CreateContactResponse,
    NewContact,
    UpdateContactResponse,
    Contact
} from "@/types/contacts";

export interface ContactsGateway {
    listContacts(): Promise<ListContactsResponse>;
    createContact(newContact: NewContact): Promise<CreateContactResponse>;
    updateContact(contact: Contact): Promise<UpdateContactResponse>;
}
