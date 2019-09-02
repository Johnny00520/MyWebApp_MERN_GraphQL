import express from 'express';
// import expressGraphQL from 'express-graphql'
import { ApolloServer } from "apollo-server-express";
// import { ApolloServer } from "apollo-server";
import cors from 'cors';
import mongoose from 'mongoose';
import keys from '../config/keys';
import { resolvers } from './resolvers/index';
import { typeDefs } from './schema/index';


const startServer = (req) => {
    const app = express();
    app.use(cors());

    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: ({ req, res }) =>  ({ req, res }), // Authentication
        // context: ({ req }) => req
    });

    server.applyMiddleware({ app })

    mongoose.connect(keys.MONGO_URI, { useNewUrlParser: true });
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    db.once('open', () => { console.log( '+++Connected to mongoose')})


    
    app.listen({ port: process.env.PORT || 5000 }, () => {
        console.log(`Server is ready at http://localhost:5000${server.graphqlPath}`)
    })
}

startServer();

// // "dev": "concurrently \"npm run server\" \"npm run json:server\""
