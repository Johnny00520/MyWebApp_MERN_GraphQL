const express = require('express');
const expressGraphQL = require('express-graphql');
const cors = require('cors');
const schema = require('./schema/schema');
const app = express();
app.use(cors());


app.use('/graphql', expressGraphQL({
    schema,
    graphiql: true
}))

const PORT = process.env.PORT || 5000;

app.listen(5000, () => {
    console.log(`Listening to port: ${PORT}`)
})

// "dev": "concurrently \"npm run server\" \"npm run json:server\""
