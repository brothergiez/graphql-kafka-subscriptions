## How To Install
**Clone This Repo**
`$ git clone git@github.com:brothergiez/graphql-kafka-subscriptions.git`

#### Pre Installation For Mac OS High Sierra / Mojave or later

OpenSSL has been upgraded in High Sierra and homebrew does not overwrite default system libraries. That means when building node-rdkafka, because you are using openssl, you need to tell the linker where to find it:
```$ export CPPFLAGS=-I/usr/local/opt/openssl/include```
```$ export LDFLAGS=-L/usr/local/opt/openssl/lib```

### Installing & Running Project
Then you can install this project .

```$ cd graphql-kafka-subscriptions```
```$ npm install```

before running this project **make sure zookeeper service and kafka-server running on your local machine and create topic with name 'sampleTopic' **
```$ npm run dev```

Then move to microservices directory
```$ cd microservices```
```$ npm install```
```$ npm run dev```


Open your browser:
On the tab 1 :
url: http://localhost:3030/graphql
```subscription{
  userCreated{
    id,
    firstname,
    lastname
  }
}```

On the tab 2 :
url: http://localhost:3030/graphql
```mutation{ createUser(id: "56789", firstname: "Mohammed", lastname: "Salah"){
    id 
    firstname 
    lastname
    }
}```
