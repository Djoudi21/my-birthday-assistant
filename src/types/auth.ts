export interface User {
    id: number
    createdAt: Date
    updatedAt: Date
    email: string
    password: string
    firstName: string
    lastName: string
    authToolUserId: string | undefined
}

export interface UserWithoutPassword {
    id: number
    createdAt: Date
    updatedAt: Date
    email: string
    firstName: string
    lastName: string
    authToolUserId: string | undefined
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
    authToolUserId: string | undefined
}

export interface LoginUserResponse {
    data: {
        status: number
        user: UserWithoutPassword
    }
}

export interface LoginCredentials {
    email: string
    password: string
}
