// import { merge } from 'lodash';

const graphql = require('graphql');
const RootQuery = require('./query');
// const mutation = require('')

const {
    GraphQLSchema
} = graphql


module.exports = new GraphQLSchema({
    query: RootQuery
})