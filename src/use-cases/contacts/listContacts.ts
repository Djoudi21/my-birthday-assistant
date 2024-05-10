import {ContactsGateway} from "@/gateways/interfaces/contacts.gateway";

export class ListContactsUseCase {
    contactsGateway: ContactsGateway

    constructor(contactsGateway: ContactsGateway) {
        this.contactsGateway = contactsGateway;
    }

    async execute() {
        return await this.contactsGateway.listContacts()
    }
}
