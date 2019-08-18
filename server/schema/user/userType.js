
const graphql = require('graphql');
const {
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLString,
    GraphQLInt,
    // GraphQLList
} = graphql;

const UserType = new GraphQLObjectType({
    name: 'User',
    description: 'a user',
    fields: () => ({
        id: {
            type: new GraphQLNonNull(GraphQLString),
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
        }
    })
    // fields: {
    //     id: {
    //         type: new GraphQLNonNull(GraphQLString),
    //         description: 'ID associated with database'
    //     },
    //     firstname: {
    //         type: GraphQLString
    //     },
    //     lastname: {
    //         type: GraphQLString
    //     },
    //     age: {
    //         type: GraphQLInt
    //     }
    // }
})

module.exports = UserType;
