import express from 'express';
import cors from 'cors';
import path from 'path';
import { questionRoutes, examRoutes, correctionRoutes } from './routes';
import { errorHandler } from './middleware';

const app = express();
const PORT = process.env.PORT || 3000;
const isProduction = process.env.NODE_ENV === 'production';

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  credentials: true
}));
app.use(express.json({ limit: '10mb' })); // Aumentar limite para CSVs grandes

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Question Manager API is running',
    environment: process.env.NODE_ENV || 'development'
  });
});

// API Routes
app.use('/api', questionRoutes);
app.use('/api', examRoutes);
app.use('/api/exams', correctionRoutes);

// Servir frontend em produção
if (isProduction) {
  const publicPath = path.join(__dirname, '..', 'public');
  app.use(express.static(publicPath));
  
  // SPA fallback - todas as rotas não-API retornam index.html
  app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
  });
}

// Error handling (deve ser o último middleware)
app.use(errorHandler);

// Só inicia o servidor se não estiver em modo de teste
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
    console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
    if (isProduction) {
      console.log(`🌐 Frontend being served from: ${path.join(__dirname, '..', 'public')}`);
    }
  });
}

export default app;
