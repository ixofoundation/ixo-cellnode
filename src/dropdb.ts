require('dotenv').config();
const mongoose = require('mongoose');

require('mongoose').Promise = global.Promise;
mongoose.set('useNewUrlParser', true);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(process.env.MONGODB_URI || '');

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'Mongo connection error: Cannot start'));
db.once('open', async function () {
  console.log('MongoDB connected.');
  const dropped = await db.db.dropDatabase();
  if (dropped) {
    console.log('MongoDB database dropped.');
  } else {
    console.log('MongoDB database NOT dropped.');
  }
  db.close()
});
