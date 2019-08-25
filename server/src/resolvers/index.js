import { User } from '../models/user';
import { Company } from '../models/company';

import { userResolver } from './userResolver';

export const resolvers = {
    Query: {
        allCompanies: () => Company.find(),
        allUsers: () => User.find({}),
    },
    Mutation: {
        createUser: userResolver
    }
}