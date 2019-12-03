const { KafkaPubSub } = require('graphql-kafka-subscriptions');
const axios = require('axios');
const baseURL = 'http://localhost:3000';

const pubsub = new KafkaPubSub({
  topic: 'sampleTopic',
  host: '127.0.0.1',
  port: '9092',
  globalConfig: {}
});

const USER_CREATED = 'USER_CREATED';
const USER_UPDATED = 'USER_UPDATED';
const USER_CREATED_ID = 'U1';
const TRX_CREATED = 'TRX_CREATED';
const TRX_UPDATED = 'TRX_UPDATED';
const TRX_CREATED_ID = 'T1';

const resolvers = {
  Query: {
    hello: () => 'world',
    users: async () => {
      const result = await axios.get(`${baseURL}/users`);
      return result.data;
    },
    user: async (_, { id }) => {
      const result = await axios.get(`${baseURL}/users/${id}`);
      return result.data;
    }
  },

  Mutation: {
    createUser: async (_, data) => {
      const payload = {
        channel: USER_CREATED,
        userCreated: data,
        channelId: USER_CREATED_ID
      };
      // PRODUCE TO KAFKA TOPIC FROM MICROSERVICE
      const result = await axios.post(`${baseURL}/user`, payload);
      // FOR DIRECT PUBLISHING / PRODUCE TO KAFKA TOPIC
      // await pubsub.publish(payload);
      return result.data;
    },
    createTransaction: async (_, data) => {
      const payload = {
        channel: TRX_CREATED,
        transactionCreated: data,
        channelId: TRX_CREATED_ID
      };
      // PRODUCE TO KAFKA TOPIC FROM MICROSERVICE
      const result = await axios.post(`${baseURL}/transaction`, payload);
      // FOR DIRECT PUBLISHING / PRODUCE TO KAFKA TOPIC
      // await pubsub.publish(payload);
      return result.data;
    }
  },

  Subscription: {
    userCreated: {
      subscribe: () => pubsub.asyncIterator([USER_CREATED])
    },
    userUpdated: {
      subscribe: () => pubsub.asyncIterator([USER_UPDATED])
    },
    transactionCreated: {
      subscribe: () => pubsub.asyncIterator([TRX_CREATED])
    },
    transactionUpdated: {
      subscribe: () => pubsub.asyncIterator([TRX_UPDATED])
    }
  }
};

module.exports = resolvers;