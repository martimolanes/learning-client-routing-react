import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT;

console.log("database url: ", process.env.DATABASE_URL);
mongoose.connect(process.env.DATABASE_URL).then(() => console.log('Conected to MongoDB'))
.catch(err => console.error('Error', err));

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
