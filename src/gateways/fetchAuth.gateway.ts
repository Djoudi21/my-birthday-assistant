import {AuthGateway} from "@/gateways/interfaces/auth.gateway";
import {RegisterCredentials, RegisterUserResponse} from "@/types/auth";

export class FetchAuthGateway implements AuthGateway {
    baseUrl = process.env.EXPO_PUBLIC_BASE_URL
    async register(credentials: RegisterCredentials): Promise<RegisterUserResponse> {
        return await fetch(`${this.baseUrl}/api/v1/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({data: {...credentials}})
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
