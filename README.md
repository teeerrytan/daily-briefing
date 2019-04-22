# daily-briefing

get firebaseKet.json

0. :dash: Preparation work

```javascript
//install Homebrew, skip if already installed
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

//intsll Yarn, skip if already installed
brew install yarn

//remember to copy firebaseKey.json in /server to /client/src
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
