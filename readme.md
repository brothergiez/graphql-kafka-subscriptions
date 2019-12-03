## How To Install
**Clone This Repo**
`$ git clone git@github.com:brothergiez/graphql-kafka-subscriptions.git`

#### Pre Installation For Mac OS High Sierra / Mojave or later

OpenSSL has been upgraded in High Sierra and homebrew does not overwrite default system libraries. That means when building node-rdkafka, because you are using openssl, you need to tell the linker where to find it:

```
$ export CPPFLAGS=-I/usr/local/opt/openssl/include
$ export LDFLAGS=-L/usr/local/opt/openssl/lib
```

### Installing & Running Project
Then you can install this project .

```
$ cd graphql-kafka-subscriptions
$ npm install
```

before running this project * make sure zookeeper service and kafka-server running on your local machine and create topic with name 'sampleTopic' *

```
$ npm run dev
$ npm run ms
```


Open your browser:
http://localhost:3030/graphql

On the tab 1 :

```javascript
subscription {
  transactionCreated {
    id
    merchant
    amount
    notes
    status
  }
}
```

On the tab 2 :

```javascript
subscription {
  transactionUpdated {
    id
    merchant
    amount
    notes
    status
  }
}
```

On the tab 3 :
```javascript
mutation{
  createTransaction(
    merchant: "GOPAY2",
    notes: "Gopay saya2",
    amount: 1000
  ){
    id
    merchant
    amount
    status
  }
}
```

For simulating update transaction execute this curl:
```shell
curl --request PUT \
  --url http://localhost:3000/transaction \
  --header 'content-type: application/json' \
  --data '{
  "channel": "TRX_UPDATED",
  "transactionUpdated": {
    "id": "9ab0c9d6-e9ad-45cf-8eb7-3b5e6c585a9c",
    "merchant": "GOPAY2",
    "amount": 1000,
    "notes": "Gopay saya2",
    "status": "SUCCESS"
  },
  "channelId": "T2"
}'
```