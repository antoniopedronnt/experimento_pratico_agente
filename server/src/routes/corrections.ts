import { Router } from 'express';
import { correctionController } from '../controllers/CorrectionController';

const router = Router();

// POST /api/corrections/:examId - Corrigir provas
router.post('/:id/correct', (req, res, next) => correctionController.correctExam(req, res, next));

export default router;
