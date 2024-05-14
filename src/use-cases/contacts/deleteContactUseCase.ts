import {ContactsGateway} from "@/gateways/interfaces/contacts.gateway";
import {Contact} from "@/types/contacts";

export class DeleteContactUseCase {
    contactsGateway: ContactsGateway

    constructor(contactsGateway: ContactsGateway) {
        this.contactsGateway = contactsGateway;
    }

    async execute(contactId: Contact['id']) {
        return await this.contactsGateway.deleteContact(contactId)
    }
}
