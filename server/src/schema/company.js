export const types = `
    type Company {
        id: ID!
        name: String!
        description: String!
        users: [User!]!
    }
`;

export const queries = `
    allCompanies: [Company!]!
`;

export const mutations = `

`;