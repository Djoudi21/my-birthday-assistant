import {ContactsGateway} from "@/gateways/interfaces/contacts.gateway";
import {Contact, UpdateContactResponse} from "@/types/contacts";

export class UpdateContactUseCase {
    contactsGateway: ContactsGateway

    constructor(contactsGateway: ContactsGateway) {
        this.contactsGateway = contactsGateway;
    }

    async execute(contact: Contact): Promise<UpdateContactResponse> {
        return await this.contactsGateway.updateContact(contact)
    }
}
