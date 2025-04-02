import express from 'express';
import cors from 'cors';
import sampleRoutes from './routes/sample.route.js';
import dotenv from 'dotenv';


dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/sample',sampleRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});