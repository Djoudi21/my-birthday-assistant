export interface User {
    id: number
    createdAt: Date
    updatedAt: Date
    email: string
    password: string
    firstName: string
    lastName: string
    authToolUserId: string
}

export interface RegisterUserResponse {
    data: {
        status: number
    }
}

export interface RegisterCredentials {
    email: string
    password: string
    firstName: string
    lastName: string
    authToolUserId: string
}
