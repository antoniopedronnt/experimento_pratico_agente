import { QuestionInput, ExamInput, TipoIdentificacao } from '../models';
import { questionRepository } from '../repositories';

export interface ValidationError {
  field: string;
  message: string;
}

export class ValidationResult {
  constructor(
    public isValid: boolean,
    public errors: ValidationError[] = []
  ) {}

  static success(): ValidationResult {
    return new ValidationResult(true, []);
  }

  static failure(errors: ValidationError[]): ValidationResult {
    return new ValidationResult(false, errors);
  }
}

export function validateQuestion(input: QuestionInput): ValidationResult {
  const errors: ValidationError[] = [];

  // Validar enunciado
  if (!input.enunciado || input.enunciado.trim() === '') {
    errors.push({
      field: 'enunciado',
      message: 'Enunciado não pode ser vazio'
    });
  }

  // Validar alternativas
  if (!input.alternativas || input.alternativas.length < 2) {
    errors.push({
      field: 'alternativas',
      message: 'Deve haver pelo menos 2 alternativas'
    });
  } else {
    // Validar cada alternativa
    input.alternativas.forEach((alt, index) => {
      if (!alt.descricao || alt.descricao.trim() === '') {
        errors.push({
          field: `alternativas[${index}].descricao`,
          message: `Alternativa ${index + 1}: descrição não pode ser vazia`
        });
      }
    });

    // Validar se há pelo menos uma alternativa correta
    const hasCorrectAnswer = input.alternativas.some(alt => alt.correta === true);
    if (!hasCorrectAnswer) {
      errors.push({
        field: 'alternativas',
        message: 'Deve haver pelo menos uma alternativa marcada como correta'
      });
    }
  }

  return errors.length > 0 
    ? ValidationResult.failure(errors)
    : ValidationResult.success();
}

export function validateExam(input: ExamInput): ValidationResult {
  const errors: ValidationError[] = [];

  // Validar título
  if (!input.titulo || input.titulo.trim() === '') {
    errors.push({
      field: 'titulo',
      message: 'Título da prova não pode ser vazio'
    });
  }

  // Validar questões
  if (!input.questoes || input.questoes.length === 0) {
    errors.push({
      field: 'questoes',
      message: 'A prova deve ter pelo menos uma questão'
    });
  } else {
    // Validar se todas as questões existem
    input.questoes.forEach((questionId, index) => {
      const question = questionRepository.findById(questionId);
      if (!question) {
        errors.push({
          field: `questoes[${index}]`,
          message: `Questão com ID "${questionId}" não encontrada`
        });
      }
    });
  }

  // Validar tipo de identificação
  if (!input.tipoIdentificacao) {
    errors.push({
      field: 'tipoIdentificacao',
      message: 'Tipo de identificação é obrigatório'
    });
  } else if (input.tipoIdentificacao !== TipoIdentificacao.LETRAS && 
             input.tipoIdentificacao !== TipoIdentificacao.POTENCIAS) {
    errors.push({
      field: 'tipoIdentificacao',
      message: 'Tipo de identificação deve ser "LETRAS" ou "POTENCIAS"'
    });
  }

  return errors.length > 0 
    ? ValidationResult.failure(errors)
    : ValidationResult.success();
}
