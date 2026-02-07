import express from 'express';
import mongoose from 'mongoose';
import type { Request, Response } from 'express';
import cors from 'cors';
import productRoutes from './routes/product.routes.js';
import { config } from './config/env.config.js';

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use(productRoutes);

app.get('/', (req: Request, res : Response) => {
    res.send({ status: 'ok' });
});
const connectDB = async () => {
    try {
        await mongoose.connect(config.mongoUri);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Failed to connect to MongoDB', error);
        process.exit(1);
    }
};

connectDB();

app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
});
