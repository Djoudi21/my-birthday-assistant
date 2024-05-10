import {RegisterCredentials, RegisterUserResponse} from "@/types/auth";

export interface AuthGateway {
    register(credentials: RegisterCredentials): Promise<RegisterUserResponse>;
}
