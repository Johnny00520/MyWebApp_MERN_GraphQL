const graphql = require('graphql');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLList,
    // GraphQLInt
} = graphql;

// const UserType = require('../user/userType');
const companyUsersResolver = require('./companyUsersResolver');

const CompanyType = new GraphQLObjectType({
    name: 'CompanyType',
    description: 'a company',
    fields: () => ({
        id: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'This Id is associated with user companyId'
        },
        name: { type: GraphQLString },
        description: { type: GraphQLString },

        // A company will have many users working in it
        users: {
            // type: new GraphQLList(UserType),
            type: new GraphQLList(require('../user/userType')),
            resolve: companyUsersResolver
        }

    })
})



module.exports = CompanyType;



// const UserCompanyResolver = require('../user/userCompanyResolver')
// const UserType = new GraphQLObjectType({
//     name: 'User',
//     description: 'a user',
//     fields: () => ({
//         id: {
//             type: new GraphQLNonNull(GraphQLString),
//             description: 'ID associated with database'
//         },
//         firstname: {
//             type: GraphQLString
//         },
//         lastname: {
//             type: GraphQLString
//         },
//         age: {
//             type: GraphQLInt
//         },
//         company: {
//             type: CompanyType,
//             resolve: UserCompanyResolver
//         }
//     })
// })

// module.exports = UserType;


// This fixes Node.js circular issue? I have user type and company type reference each other,
// which one should be declared first?
// module.exports.CompanyType = CompanyType;