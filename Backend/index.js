import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import {connectDB} from './utils/db.js';
import userRoute from './routes/user.route.js';

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

app.use("/api/v1/user", userRoute);


// Start server
app.listen(PORT, () => {
    connectDB();
    console.log(`Server connected at port ${PORT}`);
});