import { Alternative, AlternativeInput } from './Alternative';

export interface Question {
  id: string;
  enunciado: string;
  alternativas: Alternative[];
}

export interface QuestionInput {
  enunciado: string;
  alternativas: AlternativeInput[];
}

export interface QuestionUpdate {
  enunciado?: string;
  alternativas?: AlternativeInput[];
}
