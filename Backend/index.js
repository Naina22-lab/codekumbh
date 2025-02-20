const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./utils/db.js');
dotenv.config({});


const PORT = process.env.PORT || 8000;
const app = express() ;
 
app.use(express.json()) ;
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: 'http://localhost:5173',
credentials: true,
}));

// Start server
app.listen(PORT, () => {
    connectDB();
    console.log(`Server connected at port ${PORT}`);
});