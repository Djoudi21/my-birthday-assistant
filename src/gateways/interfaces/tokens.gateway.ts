import {User} from "@/types/auth";
import {type RegisterPushTokenResponse} from "@/types/tokens";

export interface TokensGateway {
    registerPushToken(token: string, userId: User['id']): Promise<RegisterPushTokenResponse>;
}
