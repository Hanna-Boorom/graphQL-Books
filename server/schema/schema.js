const graphql = require("graphql");
const _ = require("lodash");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
} = graphql;

// dummy data

const books = [
  { name: "Brave New World", genre: "Sci-Fi", id: "1", authorID: "1" },
  { name: "The Hunting Party", genre: "Mystery", id: "2", authorID: "2" },
  { name: "The Alchemist", genre: "Fantasy", id: "3", authorID: "3" },
  { name: "Dancing Dragons", genre: "Fantasy", id: "4", authorID: "3" },
  { name: "The Invisible Guest", genre: "Mystery", id: "5", authorID: "2" },
  { name: "Futuuureeee", genre: "Sci-Fi", id: "6", authorID: "1" },
  { name: "Beep Boop Goes the Robot", genre: "Sci-Fi", id: "7", authorID: "1" },
];

const authors = [
  { name: "Aldous Huxley", age: 44, id: "1" },
  { name: "Jane Foley", age: 60, id: "2" },
  { name: "Paolo Coelho", age: 100, id: "3" },
];

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    //   can use id type as string, but you have to make sure to always declare the id as a string in graphiql =>
    //  {
    //   book(id: "3") {
    //     name
    //     genre
    //   }
    // }
    //  ORRR we can declare type GraphQLID, which will work with or without a string
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        return _.find(authors, { id: parent.authorID });
      },
    },
  }),
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return _.filter(books, { authorID: parent.id });
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  // not wrapping the fields object in a function bc we don't need to worry about the order for the rootQuery
  fields: {
    // the name of the field will be what we use to make the query from the frontend
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // code to get data from db / other source
        return _.find(books, { id: args.id });
      },
    },

    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(authors, { id: args.id });
      },
    },
  },
});

module.exports = new graphql.GraphQLSchema({
  query: RootQuery,
});
