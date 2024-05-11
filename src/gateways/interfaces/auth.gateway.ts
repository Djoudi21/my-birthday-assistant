import {LoginCredentials, LoginUserResponse, RegisterCredentials, RegisterUserResponse} from "@/types/auth";

export interface AuthGateway {
    register(credentials: RegisterCredentials): Promise<RegisterUserResponse>;
    login(credentials: LoginCredentials): Promise<LoginUserResponse>;
}
