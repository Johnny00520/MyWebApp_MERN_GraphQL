
const graphql = require('graphql');
const {
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLString,
    GraphQLInt,
    // GraphQLList
    GraphQLID
} = graphql;

// const CompanyType = require('../company/companyType');
const UserCompanyResolver = require('./userCompanyResolver');


const UserType = new GraphQLObjectType({
    name: 'User',
    description: 'a user',
    fields: () => ({
        id: {
            // type: new GraphQLNonNull(GraphQLString),
            type: new GraphQLNonNull(GraphQLID),
            description: 'ID associated with database'
        },
        firstname: {
            type: GraphQLString
        },
        lastname: {
            type: GraphQLString
        },
        age: {
            type: GraphQLInt
        },
        company: {
            // type: CompanyType,
            type: require('../company/companyType'),
            resolve: UserCompanyResolver
        }
    })
})

module.exports = UserType;



