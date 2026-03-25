import express from 'express';
import cors from 'cors';
import { questionRoutes, examRoutes, correctionRoutes } from './routes';
import { errorHandler } from './middleware';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' })); // Aumentar limite para CSVs grandes

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Question Manager API is running' });
});

// API Routes
app.use('/api', questionRoutes);
app.use('/api', examRoutes);
app.use('/api/exams', correctionRoutes);

// Error handling (deve ser o último middleware)
app.use(errorHandler);

// Só inicia o servidor se não estiver em modo de teste
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

export default app;
