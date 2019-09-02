import { gql } from 'apollo-server-express';
import * as Company from './company';
import * as User from './user';
import * as Email from './contactEmail';;

const types = [];
const inputs = [];
const queries = [];
const mutations = [];

const schemas = [Company, User, Email];

schemas.forEach((schema) => {
    types.push(schema.types);
    inputs.push(schema.inputs);
    queries.push(schema.queries);
    mutations.push(schema.mutations);
})

export const typeDefs = gql`

    ${types.join('\n')}

    ${inputs.join('\n')}

    type Query {
        ${queries.join('\n')}
    }
    type Mutation {
        ${mutations.join('\n')}
    }
`