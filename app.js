const express = require('express');
const PORT = process.env.PORT || 3000;
const app = express()
const mongoose = require('mongoose')
require('dotenv/config');
const postsRoute = require('./routes/posts')
const bodyParser = require('body-parser')
const cors = require('cors')
const authRoute = require('./routes/auth')
mongoose.set('useCreateIndex', true);
app.use(cors())  
app.use(bodyParser.json())
app.use('/', postsRoute);
app.use('/user',authRoute)


mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  () => console.log('db connect'))



app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`);
});