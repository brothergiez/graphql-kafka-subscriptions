const express = require('express');
const { createServer } = require('http');
const { ApolloServer } = require('apollo-server-express');
const port = 3030;
const app = express();
const resolvers = require('./resolvers');
const typeDefs = require('./typeDefs');

const server = new ApolloServer({
  typeDefs,
  resolvers
});
server.applyMiddleware({app});

const httpServer = createServer(app);
server.installSubscriptionHandlers(httpServer);

httpServer.listen(port, () => {
  console.log(`server runt at port ${port}${server.graphqlPath}`);
  console.log(`Subscriptions ready at ws://localhost:${port}${server.subscriptionsPath}`);
});