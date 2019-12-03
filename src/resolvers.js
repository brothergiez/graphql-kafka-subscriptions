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
const USER_CREATED_ID = '1';
const USER_UPDATED = 'USER_UPDATED';

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
      const result = await axios.post(`${baseURL}/user`, payload);
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
    }
  }
};

module.exports = resolvers;