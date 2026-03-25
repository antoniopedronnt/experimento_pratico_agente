import { Router } from 'express';
import { questionController } from '../controllers';

const router = Router();

// POST /api/questions - Criar nova questão
router.post('/questions', (req, res, next) => 
  questionController.create(req, res, next)
);

// GET /api/questions - Listar todas as questões
router.get('/questions', (req, res, next) => 
  questionController.findAll(req, res, next)
);

// GET /api/questions/:id - Buscar questão por ID
router.get('/questions/:id', (req, res, next) => 
  questionController.findById(req, res, next)
);

// PUT /api/questions/:id - Atualizar questão
router.put('/questions/:id', (req, res, next) => 
  questionController.update(req, res, next)
);

// DELETE /api/questions/:id - Remover questão
router.delete('/questions/:id', (req, res, next) => 
  questionController.delete(req, res, next)
);

export default router;
