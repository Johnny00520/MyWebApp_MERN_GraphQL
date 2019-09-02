import { userResolvers } from './userResolvers';
import { contactEmailResolvers } from './contactEmailResolvers';

export const resolvers = {
    Query: {
        ...userResolvers.Query
    },
    Mutation: {
        // createUser: userResolvers
        ...userResolvers.Mutation,
        ...contactEmailResolvers.Mutation
    }
}