import {ContactsGateway} from "@/gateways/interfaces/contacts.gateway";
import {AuthGateway} from "@/gateways/interfaces/auth.gateway";
import {LoginCredentials, RegisterCredentials} from "@/types/auth";

export class LoginUserUseCase {
    authGateway: AuthGateway

    constructor(authGateway: AuthGateway) {
        this.authGateway = authGateway;
    }

    async execute(credentials: LoginCredentials) {
        return await this.authGateway.login(credentials)
    }
}
