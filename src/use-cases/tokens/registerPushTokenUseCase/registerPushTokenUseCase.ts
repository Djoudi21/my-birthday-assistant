import {FetchTokensGateway} from "@/gateways/fetchTokens.gateway";
import {TokensGateway} from "@/gateways/interfaces/tokens.gateway";
import {type User} from "@/types/auth";
import {RegisterPushTokenResponse} from "@/types/tokens";

export class RegisterPushTokenUseCase {
    tokensGateway: TokensGateway
    constructor(tokensGateway: TokensGateway) {
        this.tokensGateway = tokensGateway;
    }

    async execute(token: string, userId: User['id']): Promise<RegisterPushTokenResponse> {
        return await this.tokensGateway.registerPushToken(token, userId)
    }

}
