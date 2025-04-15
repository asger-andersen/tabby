require('dotenv').config({
  path: `${__dirname}/../.env`
})
const express = require('express');
const cors = require('cors')
//const session = require('express-session');
//const authMiddleware = require('./middleware/authMiddleware');

const PORT = 8000;

const app = express();
app.use(express.json());

const allowedOrigins = ['http://localhost:3000', 'http://192.168.1.7:3000'];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow all necessary HTTP methods
}));

/*
app.use(session({
  secret: process.env.EXPRESS_SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { 
    httpOnly: true, // Prevent JavaScript access
    sameSite: 'None', // Required for cross-origin cookies
    secure: process.env.NODE_ENV === 'production', // Use true for HTTPS in production
    maxAge: 24 * 60 * 60 * 1000, // Cookie expiration time (1 day)
  }
}));
*/

app.use('/api/receipt', require('./routes/receiptRoute'))
app.use('/api/user', require('./routes/userRoute'))
app.use('/api/product', require('./routes/productRoute'))

//For development:
app.listen(PORT, () => console.log("Server Listening on PORT:", PORT));

//ngrok http 8000 --url renewed-lemming-evident.ngrok-free.app
//node api/app.js

module.exports = app;