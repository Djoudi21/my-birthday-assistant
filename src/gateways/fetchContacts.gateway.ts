import {ContactsGateway} from "@/gateways/interfaces/contacts.gateway";
import {CreateContactResponse, ListContactsResponse, NewContact} from "@/types";

export class FetchContactsGateway implements ContactsGateway{
    private authToolUserId: string;

    constructor(authToolUserId: string) {
        this.authToolUserId = authToolUserId;
    }
    async listContacts(): Promise<ListContactsResponse> {
        return await fetch(`http://localhost:8080/api/v1/contacts?authToolUserId=${this.authToolUserId}`).then(res=> {
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
        return await fetch(`http://localhost:8080/api/v1/contacts?authToolUserId=${this.authToolUserId}`, {
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

}
