# daily-briefing

get firebaseKet.json

0. :dash: Preparation work

```javascript
//install Homebrew, skip if already installed
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

//intsll Yarn, skip if already installed
brew install yarn

//install Redis store for saving sessions.
brew install redis

//launch redis
redis-server

//shut down redis
redis 127.0.0.1:6379> SHUTDOWN

//connect to redis
redis-cli -h 127.0.0.1 /*ip*/ -p 6379 /*port*/

//quit current redis conversation
127.0.0.1:6379> quit

```

1. :rocket: Launch backend

```javascript
cd server
yarn
nodemon server.js
```

2. :metal: Launch frontend

```javascript
cd
cd client
cd daily-briefing
yarn
yarn start
```
