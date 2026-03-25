export interface Alternative {
  id: string;
  descricao: string;
  correta: boolean;
}

export interface Question {
  id: string;
  enunciado: string;
  alternativas: Alternative[];
}

export interface QuestionInput {
  enunciado: string;
  alternativas: AlternativeInput[];
}

export interface AlternativeInput {
  descricao: string;
  correta: boolean;
}

// Re-export exam types
export type { Exam, ExamInput, ExamPreview } from '../services/examService';
export { TipoIdentificacao } from '../services/examService';
