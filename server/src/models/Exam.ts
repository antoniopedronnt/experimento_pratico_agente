export enum TipoIdentificacao {
  LETRAS = 'LETRAS',
  POTENCIAS = 'POTENCIAS'
}

export interface Exam {
  id: string;
  titulo: string;
  questoes: string[]; // Array de IDs de questões
  tipoIdentificacao: TipoIdentificacao;
  criadaEm: Date;
}

export interface ExamInput {
  titulo: string;
  questoes: string[];
  tipoIdentificacao: TipoIdentificacao;
}

export interface ExamUpdate {
  titulo?: string;
  questoes?: string[];
  tipoIdentificacao?: TipoIdentificacao;
}

export interface ExamPreview extends Exam {
  questoesCompletas: Array<{
    ordem: number;
    enunciado: string;
    alternativas: Array<{
      identificador: string; // 'A', 'B', 'C' ou '1', '2', '4', '8'
      descricao: string;
      correta: boolean;
    }>;
  }>;
  espacoResposta: string; // Descrição do espaço para resposta
}
