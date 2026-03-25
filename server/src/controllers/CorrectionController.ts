import { Request, Response, NextFunction } from 'express';
import { examRepository, questionRepository } from '../repositories';
import { CorrecaoRequest, RelatorioNotas, ModoCorrecao } from '../models/Correction';
import { AppError } from '../middleware';
import { validateCorrection } from '../middleware/validation';
import { csvParserService } from '../services/csvParserService';
import { correctionService } from '../services/correctionService';

export class CorrectionController {
  
  /**
   * POST /api/exams/:id/correct
   * Corrige provas e retorna relatório de notas
   */
  async correctExam(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const input: CorrecaoRequest = req.body;

      // Validação básica
      const validation = validateCorrection(input);
      if (!validation.isValid) {
        throw new AppError(400, 'Dados inválidos', validation.errors);
      }

      const { gabaritoCSV, respostasCSV, modoCorrecao } = input;

      // Buscar prova
      const exam = examRepository.findById(id);
      if (!exam) {
        throw new AppError(404, 'Prova não encontrada');
      }

      // Parsear CSVs
      let gabaritos;
      let respostasAlunos;

      try {
        gabaritos = csvParserService.parseGabaritoCSV(gabaritoCSV);
      } catch (error) {
        throw new AppError(400, `Erro ao processar CSV de gabarito: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }

      try {
        respostasAlunos = csvParserService.parseRespostasCSV(respostasCSV);
      } catch (error) {
        throw new AppError(400, `Erro ao processar CSV de respostas: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }

      // Buscar informações das questões (para saber número de alternativas)
      const totalAlternativasPorQuestao: number[] = [];
      for (const questionId of exam.questoes) {
        const question = questionRepository.findById(questionId);
        if (!question) {
          throw new AppError(400, `Questão ${questionId} não encontrada`);
        }
        totalAlternativasPorQuestao.push(question.alternativas.length);
      }

      // Corrigir provas
      const resultados = correctionService.corrigirProvas(
        gabaritos,
        respostasAlunos,
        exam.tipoIdentificacao,
        modoCorrecao,
        totalAlternativasPorQuestao
      );

      // Calcular estatísticas
      const estatisticas = correctionService.calcularEstatisticas(resultados);

      // Montar relatório
      const relatorio: RelatorioNotas = {
        provaId: exam.id,
        tipoIdentificacao: exam.tipoIdentificacao,
        modoCorrecao,
        resultados,
        estatisticas,
        dataCorrecao: new Date()
      };

      res.json(relatorio);
    } catch (error) {
      next(error);
    }
  }
}

export const correctionController = new CorrectionController();
