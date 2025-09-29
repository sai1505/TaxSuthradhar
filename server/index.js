// Import necessary packages
import express from 'express';
import cors from 'cors';
import 'dotenv/config'; // Loads environment variables from .env file

// Import routes
import authRoutes from './routes/auth.js';

// --- Server Setup ---
const app = express();
const PORT = process.env.PORT || 3000;

// --- Middleware ---
app.use(cors()); // Enable Cross-Origin Resource Sharing for your frontend
app.use(express.json()); // Enable the express app to parse JSON formatted request bodies
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// --- API Routes ---
// All routes defined in auth.js will be prefixed with /api
app.use('/api', authRoutes);

// --- Start Server ---
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
