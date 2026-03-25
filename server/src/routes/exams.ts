import { Router } from 'express';
import { examController } from '../controllers';

const router = Router();

// POST /api/exams - Criar nova prova
router.post('/exams', (req, res, next) => 
  examController.create(req, res, next)
);

// GET /api/exams - Listar todas as provas
router.get('/exams', (req, res, next) => 
  examController.findAll(req, res, next)
);

// GET /api/exams/:id - Buscar prova por ID
router.get('/exams/:id', (req, res, next) => 
  examController.findById(req, res, next)
);

// GET /api/exams/:id/preview - Visualizar prova formatada
router.get('/exams/:id/preview', (req, res, next) => 
  examController.getPreview(req, res, next)
);

// POST /api/exams/:id/generate - Gerar PDFs e CSV
router.post('/exams/:id/generate', (req, res, next) => 
  examController.generatePDFs(req, res, next)
);

// PUT /api/exams/:id - Atualizar prova
router.put('/exams/:id', (req, res, next) => 
  examController.update(req, res, next)
);

// DELETE /api/exams/:id - Remover prova
router.delete('/exams/:id', (req, res, next) => 
  examController.delete(req, res, next)
);

export default router;
