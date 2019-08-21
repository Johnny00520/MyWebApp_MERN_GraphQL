const graphql = require('graphql');
const {
    GraphQLObjectType, 
    GraphQLString, 
    // GraphQLList
} = graphql;

const UserType = require('./user/userType');
const UserResolver = require('./user/userResolver');
const CompanyType = require('./company/companyType');
const CompanyResolver = require('./company/companyResolver');

const RootQuery = new GraphQLObjectType({

    name: 'RootQueryType',
    fields: {
        user: {
            type: UserType,
            args: { id: { type: GraphQLString } },
            resolve: UserResolver
        },
        company: {
            type: CompanyType,
            args: { id: { type: GraphQLString } },
            resolve: CompanyResolver
        },
               
    }
})

module.exports = RootQuery;
