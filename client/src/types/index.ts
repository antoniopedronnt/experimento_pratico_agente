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

// Correction types
export enum ModoCorrecao {
  RIGOROSO = 'RIGOROSO',
  PROPORCIONAL = 'PROPORCIONAL'
}

export interface ResultadoQuestao {
  questao: number;
  respostaAluno: string;
  respostaCorreta: string;
  acertou: boolean;
  pontuacao: number;
}

export interface ResultadoAluno {
  nome: string;
  cpf: string;
  numeroProva: number;
  questoes: ResultadoQuestao[];
  notaFinal: number;
}

export interface Estatisticas {
  media: number;
  mediana: number;
  maiorNota: number;
  menorNota: number;
  totalAlunos: number;
}

export interface RelatorioNotas {
  provaId: string;
  tipoIdentificacao: string;
  modoCorrecao: ModoCorrecao;
  resultados: ResultadoAluno[];
  estatisticas: Estatisticas;
  dataCorrecao: Date;
}
