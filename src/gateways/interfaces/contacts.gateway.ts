import {ListContactsResponse, CreateContactResponse, Contact, NewContact} from "@/types";

export interface ContactsGateway {
    listContacts(): Promise<ListContactsResponse>;
    createContact(newContact: NewContact): Promise<CreateContactResponse>;
}
