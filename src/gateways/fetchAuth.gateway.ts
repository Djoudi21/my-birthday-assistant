import {AuthGateway} from "@/gateways/interfaces/auth.gateway";
import {RegisterCredentials, RegisterUserResponse} from "@/types/auth";

export class FetchAuthGateway implements AuthGateway {
    private authToolUserId: string;

    constructor(authToolUserId: string) {
        this.authToolUserId = authToolUserId;
    }
    async register(credentials: RegisterCredentials): Promise<RegisterUserResponse> {
        return await fetch(`http://localhost:8080/api/v1/register?authToolUserId=${this.authToolUserId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                data: {...credentials}
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
