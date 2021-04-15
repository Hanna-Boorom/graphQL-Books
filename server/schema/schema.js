const graphql = require("graphql");
const _ = require("lodash");

const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

// dummy data

const books = [
  { name: "Brave New World", genre: "Sci-Fi", id: "1" },
  { name: "The Hunting Party", genre: "Mystery", id: "2" },
  { name: "The Alchemist", genre: "Fantasy", id: "3" },
];

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  // not wrapping the fields object in a function bc we don't need to worry about the order for the rootQuery
  fields: {
    // the name of the field will be what we use to make the query from the frontend
    book: {
      type: BookType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        // code to get data from db / other source
        return _.find(books, { id: args.id });
      },
    },
  },
});

module.exports = new graphql.GraphQLSchema({
  query: RootQuery,
});
