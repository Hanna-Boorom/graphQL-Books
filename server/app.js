const express = require('express');

// naming this const graphqlHTTP is just a convention, not naming it the same as the package
const graphqlHTTP = require('express-graphql')

const app = express();

app.use('/graphql',graphqlHTTP({

}));

app.listen(3000, () => {
    console.log('now listening for requests on port 3000')
});

