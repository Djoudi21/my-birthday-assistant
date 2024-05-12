export interface Contact {
    name: string
    birthday: Date
    description: string
    id: number
    createdAt: Date,
    updatedAt: Date,
    userId: number
}

export interface NewContact {
    name: string
    birthday: Date
    description: string
}

export interface ListContactsResponse {
    data: {
        status: number
        contacts: Contact[]
    }
}

export interface CreateContactResponse {
    data: {
        status: number
        contact: Contact
    }
}

export interface UpdateContactResponse {
    data: {
        status: number
        contact: Contact
    }
}
