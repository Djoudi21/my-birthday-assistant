export interface RegisterUserResponse {
    data: {
        status: number
    }
}

export interface RegisterCredentials {
    email: string
    password: string
    firstname: string
    lastname: string
}
