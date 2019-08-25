import { gql } from 'apollo-server-express';
import * as Company from './company';
import * as User from './user';

const types = [];
const queries = [];
const mutations = [];

const schemas = [Company, User];

schemas.forEach((schema) => {
    types.push(schema.types);
    queries.push(schema.queries);
    mutations.push(schema.mutations);
})

export const typeDefs = gql`

    ${types.join('\n')}

    type Query {
        ${queries.join('\n')}
    }
    type Mutation {
        ${mutations.join('\n')}
    }
`