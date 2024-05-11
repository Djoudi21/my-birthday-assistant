export interface PushToken {
    id: number
    userId: number
    token: string
    createdAt: Date
    updatedAt: Date
}

export interface RegisterPushTokenResponse {
    data: {
        status: number
    }
}

export interface GetPushTokenResponse {
    data: {
        status: number
        token: {
            id: number
            userId: number
            token: string
            createdAt: Date
            updatedAt: Date
        }
    }
}
