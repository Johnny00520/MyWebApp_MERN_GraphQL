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
    input AdminCreateUserInput {
        firstname: String!
        lastname: String!
        email: String!
        password: String!
    }
`;

export const queries = `
    allUsers: [User!]!
    getUser(userId: ID!): User!
`;

export const mutations = `
    adminCreateUser(adminCreateInput: AdminCreateUserInput): User!
    adminDeleteUser(userId: ID!): String!


    register(registerInput: RegisterInput): User!
    userLogin(email: String!, password: String!): User!
`;