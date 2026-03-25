import express from 'express';
import cors from 'cors';
import { questionRoutes, examRoutes } from './routes';
import { errorHandler } from './middleware';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Question Manager API is running' });
});

// API Routes
app.use('/api', questionRoutes);
app.use('/api', examRoutes);

// Error handling (deve ser o último middleware)
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
