import { User } from '../models/user';
import { Company } from '../models/company';

// import { userResolver } from './userResolver';

import { userResolvers } from './userResolvers';

export const resolvers = {
    Query: {
        ...userResolvers.Query
    },
    Mutation: {
        // createUser: userResolvers
        ...userResolvers.Mutation
    }
}