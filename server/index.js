const express = require('express');
const expressGraphQL = require('express-graphql');
const cors = require('cors');

const app = express();

app.use(cors());

app.use('/graphql', expressGraphQL({
    graphiql: true
}))

const PORT = process.env.PORT || PORT;

app.listen(5000, () => {
    console.log('Listening to')
})