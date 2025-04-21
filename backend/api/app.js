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

app.use('/api/receipt', require('../lib/routes/receiptRoute'))
app.use('/api/user', require('../lib/routes/userRoute'))
app.use('/api/company', require('../lib/routes/companyRoute'))
app.use('/api/product', require('../lib/routes/productRoute'))
app.use('/api/category', require('../lib/routes/categoryRoute'))

//For development:
app.listen(PORT, () => console.log("Server Listening on PORT:", PORT));

module.exports = app;