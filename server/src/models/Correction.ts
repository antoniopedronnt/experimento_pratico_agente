export enum ModoCorrecao {
  RIGOROSO = 'RIGOROSO',
  PROPORCIONAL = 'PROPORCIONAL'
}

export interface RespostaAluno {
  nome: string;
  cpf: string;
  numeroProva: number;
  respostas: string[]; // ["A, C", "B", "15"]
}

export interface Gabarito {
  numeroProva: number;
  respostas: string[]; // ["A, C", "B", "15"]
}

export interface ResultadoQuestao {
  questao: number;
  respostaAluno: string;
  respostaCorreta: string;
  acertou: boolean;
  pontuacao: number; // 0-100
}

export interface ResultadoAluno {
  nome: string;
  cpf: string;
  numeroProva: number;
  questoes: ResultadoQuestao[];
  notaFinal: number; // média das questões
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

export interface CorrecaoRequest {
  gabaritoCSV: string;
  respostasCSV: string;
  modoCorrecao: ModoCorrecao;
}
