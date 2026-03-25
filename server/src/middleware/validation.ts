import { QuestionInput } from '../models';

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
