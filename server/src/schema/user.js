export const types = `
    type User {
        id: ID!
        firstname: String!
        lastname: String!
        email: String!
        token: String!
        createdAt: String!
        age: String
        companyId: String
    }
`;

export const inputs = `
    input RegisterInput {
        firstname: String!
        lastname: String!
        email: String!
        password: String!
        confirmPassword: String!
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

    register(registerInput: RegisterInput): User!
    userLogin(email: String!, password: String!): User!
`;