import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import studentRoutes from './routes/studentRoutes.js';

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/students', studentRoutes);

app.get('/', (req, res) => {
  res.send('Student Registration API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
