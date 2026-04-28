
import express from 'express';
import app from './app.js';
import cors from 'cors';
import { connectDB } from './config/db.js';

dotenv.config();    
app.use(cors());
connectDB();

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
}   
);



