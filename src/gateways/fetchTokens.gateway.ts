import {TokensGateway} from "@/gateways/interfaces/tokens.gateway";
import {type User} from "@/types/auth";
import type {RegisterPushTokenResponse} from "@/types/tokens";

export class FetchTokensGateway implements TokensGateway {
    baseUrl = process.env.EXPO_PUBLIC_BASE_URL

    async registerPushToken(token: string, userId: User["id"]): Promise<RegisterPushTokenResponse> {
        return await fetch(`${this.baseUrl}/api/v1/register-push-token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                data: {
                    token,
                    userId
                }
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
