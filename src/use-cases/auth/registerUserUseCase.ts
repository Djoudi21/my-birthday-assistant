import {ContactsGateway} from "@/gateways/interfaces/contacts.gateway";
import {AuthGateway} from "@/gateways/interfaces/auth.gateway";
import {RegisterCredentials} from "@/types/auth";

export class RegisterUserUseCase {
    authGateway: AuthGateway

    constructor(authGateway: AuthGateway) {
        this.authGateway = authGateway;
    }

    async execute(credentials: RegisterCredentials) {
        return await this.authGateway.register(credentials)
    }
}
