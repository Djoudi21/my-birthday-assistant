import {ContactsGateway} from "@/gateways/interfaces/contacts.gateway";
import {
    Contact,
    CreateContactResponse,
    ListContactsResponse,
    NewContact,
    UpdateContactResponse
} from "@/types/contacts";

export class FetchContactsGateway implements ContactsGateway{
    baseUrl = process.env.EXPO_PUBLIC_BASE_URL

    async listContacts(): Promise<ListContactsResponse> {
        return await fetch(`${this.baseUrl}/api/v1/contacts`).then(res=> {
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.json();
        }).catch(error => {
            // Handle any errors that occurred during the fetch
            console.error('There was a problem with the fetch operation:', error);
        });
    }

    async createContact(newContact:NewContact): Promise<CreateContactResponse> {
        return await fetch(`${this.baseUrl}/api/v1/contacts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                data: {...newContact }
            })
        }).then(res => {
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.json();
        }).catch(error => {
            // Handle any errors that occurred during the fetch
            console.error('There was a problem with the fetch operation:', error);
        });
    }

    async updateContact(contact: Contact): Promise<UpdateContactResponse> {
        return await fetch(`${this.baseUrl}/api/v1/contacts/${contact.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                data: {...contact }
            })
        }).then(res => {
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.json();
        }).catch(error => {
            // Handle any errors that occurred during the fetch
            console.error('There was a problem with the fetch operation:', error);
        });
    }
}
