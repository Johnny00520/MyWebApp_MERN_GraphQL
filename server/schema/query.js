const graphql = require('graphql');
const {
    GraphQLObjectType, 
    GraphQLString, 
    // GraphQLList
} = graphql;

const UserType = require('./user/userType');
const UserResolver = require('./user/userResolver');


const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        user: {
            type: UserType,
            args: { id: { type: GraphQLString } },
            resolve: UserResolver
        }
    }
})

module.exports = RootQuery;