export const types = `
    type User {
        id: ID!
        firstname: String!
        lastname: String!
        age: String
        companyId: String
    }
`;

export const queries = `
    allUsers: [User!]!
`;

export const mutations = `
    createUser(
        firstname: String!
        lastname: String!
        age: String!
        companyId: String!
    ): User!
`;