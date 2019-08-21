const graphql = require('graphql');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLList
} = graphql;

const UserType = require('../user/userType');
const companyUsersResolver = require('./companyUsersResolver');

const CompanyType = new GraphQLObjectType({
    name: 'CompanyType',
    description: 'a company',
    fields: () => ({
        id: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'This Id is associated with user companyId'
        },
        name: {
            type: GraphQLString
        },
        description: {
            type: GraphQLString
        },
        // A company will have many users working in it
        // users: {
        //     type: new GraphQLList(UserType),
        //     resolve: companyUsersResolver
        // }
    })
})

module.exports = CompanyType;
// This fixes Node.js circular issue? I have user type and company type reference each other,
// which one should be declared first?
// module.exports.CompanyType = CompanyType;