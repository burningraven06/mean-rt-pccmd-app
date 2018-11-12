### Real Time App

- Backend - **Express** in JS
- Frontend - _VanillaJS_ with **Pug Templates**
- Database - MongoDB + Mongoose(ORM) at _MLAB_
- RealTimeClient - **Pusher**
- FrontendDesign - **MaterializeCss**
- Graphs - Canvas.Js

To Test This, 

- Create keys.ks
```sh
$ cd rt-pccmd-app
$ touch config/keys.js
```

- Update keys.js
```sh
var KEYS = {
  MLAB_DBURI : <YOUR_MONGO_DB_URL>,
  PUSHER_APPID : <YOUR_PUSHER_APP_ID>,
  PUSHER_KEY : <YOUR_PUSHER_KEY>,
  PUSHER_SECRET : <YOUR_PUSHER_SECRET>,
  PUSHER_CLUSTER : <YOUR_PUSHER_CLUSTER>
}

module.exports = KEYS
```

- Install Package Dependencies
```sh
$ cd rt-pccmd-app
$ yarn install

#Or, with npm
$ npm install
```

- Run App
```sh
$ cd rt-pccmd-app
$ yarn start-app
```