import { Request, Response, NextFunction } from 'express';
import { questionRepository } from '../repositories';
import { QuestionInput, QuestionUpdate } from '../models';
import { validateQuestion, AppError } from '../middleware';

export class QuestionController {
  
  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const input: QuestionInput = req.body;

      // Validar entrada
      const validation = validateQuestion(input);
      if (!validation.isValid) {
        throw new AppError(400, 'Dados inválidos', validation.errors);
      }

      // Criar questão
      const question = questionRepository.create(input);
      
      res.status(201).json(question);
    } catch (error) {
      next(error);
    }
  }

  async findAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const questions = questionRepository.findAll();
      res.json(questions);
    } catch (error) {
      next(error);
    }
  }

  async findById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const question = questionRepository.findById(id);

      if (!question) {
        throw new AppError(404, 'Questão não encontrada');
      }

      res.json(question);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const input: QuestionUpdate = req.body;

      // Se estiver atualizando tudo, validar
      if (input.enunciado && input.alternativas) {
        const validation = validateQuestion(input as QuestionInput);
        if (!validation.isValid) {
          throw new AppError(400, 'Dados inválidos', validation.errors);
        }
      }

      const question = questionRepository.update(id, input);

      if (!question) {
        throw new AppError(404, 'Questão não encontrada');
      }

      res.json(question);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const deleted = questionRepository.delete(id);

      if (!deleted) {
        throw new AppError(404, 'Questão não encontrada');
      }

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

export const questionController = new QuestionController();
