const mongoose = require('mongoose');
require('dotenv').config()
const uri = process.env.DB_URI

mongoose.connect(uri, {
    useNewUrlParser: true,
    //useCreateIndex: true, 
    useUnifiedTopology: true,
    //useFindAndModify: false,
  });
