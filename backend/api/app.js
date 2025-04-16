require('dotenv').config({
  path: `${__dirname}/../.env`
})
const express = require('express');
const cors = require('cors')

const PORT = 8000;

const app = express();
app.use(express.json());

const allowedOrigins = ['https://tabbyapp.vercel.app', 'http://localhost:3000'];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
}));

app.options('*', cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
}));

app.use('/api/receipt', require('./routes/receiptRoute'))
app.use('/api/user', require('./routes/userRoute'))
app.use('/api/product', require('./routes/productRoute'))

//For development:
//app.listen(PORT, () => console.log("Server Listening on PORT:", PORT));

module.exports = app;