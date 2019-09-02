export const types = `
    type Email {
        firstname: String!
        lastname: String!
        email: String!
        content: String!
    }
`;

export const inputs = `
    input ContactPageInput {
        firstname: String!
        lastname: String!
        email: String!
        content: String!
    }
`;

export const mutations = `
    contactPageSendEmail(contactPageInput: ContactPageInput): Email
`;