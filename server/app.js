// from Net Ninja's GraphQL course on Youtube

const express = require("express");

// naming this const graphqlHTTP is just a convention, not naming it the same as the package
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");

const app = express();

mongoose.connect(
  "mongodb+srv://hanna:test123@cluster0.ftq0e.mongodb.net/graphQL-books?retryWrites=true&w=majority"
);
mongoose.connection.once("open", () => {
  console.log("connected to database");
});

app.use(
  "/graphql",
  graphqlHTTP({
    // same as writing schema: schema, just using ES6
    schema,

    // allows us to use the graphiql tool in localhost:3000 - or whatever port you're running on.
    // graphiql is kinda like Postman for testing endpoints
    graphiql: true,
  })
);

app.listen(3000, () => {
  console.log("now listening for requests on port 3000");
});
