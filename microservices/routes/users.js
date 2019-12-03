const express = require('express');
const uuid = require('uuid/v4');
const { kafkaTopic, producer } = require('../kafka');

const router = express.Router();

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

router.get('/users', (req, res) => {
  res.send(users);
});

router.get('/users/:id', (req, res) => {
  const uid = req.params.id;
  const user = users.find(el => el.id === uid);
  res.send(user);
});

router.post('/user', async (req, res) => {
  const id = uuid();
  req.body.userCreated.status = 'PENDING';
  req.body.userCreated.id = id;
  const messages = JSON.stringify(req.body);
  const payloads = [{ topic: kafkaTopic, messages, partition: 0 }];
  producer.send(payloads, function(err, data) {
    console.log(data);
  });
  console.log(req.body.userCreated);
  res.send(req.body.userCreated);
});

router.put('/user', async (req, res) => {
  const messages = JSON.stringify(req.body);
  const payloads = [{ topic: kafkaTopic, messages, partition: 0 }];
  producer.send(payloads, function(err, data) {
    console.log(data);
  });
  console.log(req.body.userUpdated);
  res.send(req.body);
});

module.exports = router;