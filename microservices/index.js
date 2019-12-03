const express = require('express');
const uuid = require('uuid/v4');
const kafka = require('kafka-node');
const app = express();
const port = 3000;
const kafkaTopic = 'sampleTopic';


const Producer = kafka.Producer;
const client = new kafka.KafkaClient();
const producer = new Producer(client);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const users = [
  {
    id: '12345',
    firstname: 'Flavio',
    lastname: 'Wagner'
  },
  {
    id: '23456',
    firstname: 'Roger',
    lastname: 'Alua'
  }
];

app.get('/users', (req, res) => {
  res.send(users);
});

app.get('/users/:id', (req, res) => {
  const uid = req.params.id;
  const user = users.find(el => el.id === uid);
  res.send(user);
});

app.post('/user', async (req, res) => {
  const id = uuid();
  req.body.userCreated.status = "PENDING";
  req.body.userCreated.id = id;
  const messages = JSON.stringify(req.body);
  const payloads = [{ topic: kafkaTopic, messages, partition: 0 }];
  producer.send(payloads, function(err, data) {
    console.log(data);
  });
  console.log(req.body.userCreated);
  res.send(req.body.userCreated);
});

app.put('/user', async (req, res) => {
  const messages = JSON.stringify(req.body);
  const payloads = [{ topic: kafkaTopic, messages, partition: 0 }];
  producer.send(payloads, function(err, data) {
    console.log(data);
  });
  console.log(req.body.userUpdated);
  res.send(req.body);
});

app.listen(port, () => console.log(`app run on port ${port}`));
