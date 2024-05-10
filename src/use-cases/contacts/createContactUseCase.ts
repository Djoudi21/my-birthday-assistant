import {ContactsGateway} from "@/gateways/interfaces/contacts.gateway";

export class CreateContactUseCase {
    contactsGateway: ContactsGateway

    constructor(contactsGateway: ContactsGateway) {
        this.contactsGateway = contactsGateway;
    }

    async execute(newContact) {
        return await this.contactsGateway.createContact(newContact)
    }
}
