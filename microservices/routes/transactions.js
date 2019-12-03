const express = require('express');
const router = express.Router();
const uuid = require('uuid/v4');

const kafka = require('kafka-node');
const kafkaTopic = 'sampleTopic';
const Producer = kafka.Producer;
const client = new kafka.KafkaClient();
const producer = new Producer(client);

router.post('/transaction', async (req, res) => {
  req.body.transactionCreated.status = 'PENDING';
  req.body.transactionCreated.id = uuid();
  const messages = JSON.stringify(req.body);
  const payloads = [{ topic: kafkaTopic, messages, partition: 0 }];
  producer.send(payloads, function(err, data) {
    console.log(data);
  });
  console.log(req.body.transactionCreated);
  res.send(req.body.transactionCreated);
});

router.put('/transaction', async (req, res) => {
  const messages = JSON.stringify(req.body);
  const payloads = [{ topic: kafkaTopic, messages, partition: 0 }];
  producer.send(payloads, function(err, data) {
    console.log(data);
  });
  console.log(req.body.transactionCreated);
  res.send(req.body);
});

module.exports = router;