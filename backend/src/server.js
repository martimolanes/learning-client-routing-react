import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';

import contactRoutes from './routes/contactRoutes.js';

const app = express();
app.use(express.json());
app.use(cors());

dotenv.config();
const PORT = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL;

console.log("database url: ", DATABASE_URL);
mongoose.connect(DATABASE_URL).then(() => console.log('Conected to MongoDB'))
.catch(err => console.error('Error', err));

app.use('/contacts', contactRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
