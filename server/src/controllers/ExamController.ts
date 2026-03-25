import { Request, Response, NextFunction } from 'express';
import { examRepository, questionRepository } from '../repositories';
import { ExamInput, ExamUpdate, TipoIdentificacao, ExamPreview, ExamHeader } from '../models';
import { validateExam, AppError } from '../middleware';
import { generateShuffledExams } from '../services/shuffleService';
import { generateCSV } from '../services/csvService';
import { generateMultiplePDFs } from '../services/pdfService';
import archiver from 'archiver';

export class ExamController {
  
  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const input: ExamInput = req.body;

      // Validar entrada
      const validation = validateExam(input);
      if (!validation.isValid) {
        throw new AppError(400, 'Dados inválidos', validation.errors);
      }

      const exam = examRepository.create(input);
      
      res.status(201).json(exam);
    } catch (error) {
      next(error);
    }
  }

  async findAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const exams = examRepository.findAll();
      res.json(exams);
    } catch (error) {
      next(error);
    }
  }

  async findById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const exam = examRepository.findById(id);

      if (!exam) {
        throw new AppError(404, 'Prova não encontrada');
      }

      res.json(exam);
    } catch (error) {
      next(error);
    }
  }

  async getPreview(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const exam = examRepository.findById(id);

      if (!exam) {
        throw new AppError(404, 'Prova não encontrada');
      }

      // Buscar questões completas
      const questoesCompletas = exam.questoes.map((questionId, index) => {
        const question = questionRepository.findById(questionId);
        if (!question) {
          throw new AppError(400, `Questão ${questionId} não encontrada`);
        }

        // Gerar identificadores baseados no tipo
        const alternativasComIdentificador = question.alternativas.map((alt, altIndex) => {
          let identificador: string;
          if (exam.tipoIdentificacao === TipoIdentificacao.LETRAS) {
            // A, B, C, D, E, F...
            identificador = String.fromCharCode(65 + altIndex);
          } else {
            // 1, 2, 4, 8, 16, 32...
            identificador = Math.pow(2, altIndex).toString();
          }

          return {
            identificador,
            descricao: alt.descricao,
            correta: alt.correta
          };
        });

        return {
          ordem: index + 1,
          enunciado: question.enunciado,
          alternativas: alternativasComIdentificador
        };
      });

      // Gerar descrição do espaço para resposta
      let espacoResposta: string;
      if (exam.tipoIdentificacao === TipoIdentificacao.LETRAS) {
        espacoResposta = 'Resposta (indique as letras das alternativas corretas): ___________';
      } else {
        espacoResposta = 'Resposta (indique a soma das alternativas corretas): ___________';
      }

      const preview: ExamPreview = {
        ...exam,
        questoesCompletas,
        espacoResposta
      };

      res.json(preview);
    } catch (error) {
      next(error);
    }
  }

  async generatePDFs(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const { quantidade, header } = req.body as { quantidade: number; header: ExamHeader };

      // Validações
      if (!quantidade || quantidade < 1 || quantidade > 100) {
        throw new AppError(400, 'Quantidade deve ser entre 1 e 100');
      }

      if (!header || !header.disciplina || !header.professor || !header.data) {
        throw new AppError(400, 'Cabeçalho incompleto (disciplina, professor e data são obrigatórios)');
      }

      const exam = examRepository.findById(id);
      if (!exam) {
        throw new AppError(404, 'Prova não encontrada');
      }

      // Buscar questões completas
      const questions = exam.questoes.map(questionId => {
        const question = questionRepository.findById(questionId);
        if (!question) {
          throw new AppError(400, `Questão ${questionId} não encontrada`);
        }
        return question;
      });

      // Gerar provas embaralhadas
      const provasEmbaralhadas = generateShuffledExams(
        questions,
        exam.tipoIdentificacao,
        quantidade
      );

      // Gerar CSV
      const csvContent = generateCSV(provasEmbaralhadas);

      // Gerar PDFs
      const pdfs = generateMultiplePDFs(provasEmbaralhadas, {
        titulo: exam.titulo,
        header,
        tipoIdentificacao: exam.tipoIdentificacao
      });

      // Criar arquivo ZIP
      const archive = archiver('zip', { zlib: { level: 9 } });

      // Configurar headers da resposta
      res.setHeader('Content-Type', 'application/zip');
      res.setHeader('Content-Disposition', `attachment; filename="provas-${exam.titulo.replace(/\s+/g, '_')}.zip"`);

      // Pipe do archive para a resposta
      archive.pipe(res);

      // Adicionar CSV ao ZIP
      archive.append(csvContent, { name: 'gabarito.csv' });

      // Adicionar cada PDF ao ZIP
      pdfs.forEach((pdfStream, index) => {
        archive.append(pdfStream, { name: `prova_${index + 1}.pdf` });
      });

      // Finalizar o ZIP
      archive.finalize();

      // Tratamento de erros do archiver
      archive.on('error', (err) => {
        throw new AppError(500, `Erro ao gerar ZIP: ${err.message}`);
      });

    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const input: ExamUpdate = req.body;

      const exam = examRepository.update(id, input);

      if (!exam) {
        throw new AppError(404, 'Prova não encontrada');
      }

      res.json(exam);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const deleted = examRepository.delete(id);

      if (!deleted) {
        throw new AppError(404, 'Prova não encontrada');
      }

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

export const examController = new ExamController();
