const kafka = require('kafka-node');
const kafkaTopic = 'sampleTopic';

const Producer = kafka.Producer;
const client = new kafka.KafkaClient();
const producer = new Producer(client);

module.exports = {
  kafkaTopic,
  producer
}
