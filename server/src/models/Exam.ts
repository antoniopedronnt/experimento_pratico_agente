export enum TipoIdentificacao {
  LETRAS = 'LETRAS',
  POTENCIAS = 'POTENCIAS'
}

export interface ExamHeader {
  disciplina: string;
  professor: string;
  data: string;
  instituicao?: string;
}

export interface Exam {
  id: string;
  titulo: string;
  questoes: string[]; // Array de IDs de questões
  tipoIdentificacao: TipoIdentificacao;
  criadaEm: Date;
  // Campos opcionais para cabeçalho (usados na geração de PDF)
  disciplina?: string;
  professor?: string;
  dataProva?: string;
  instituicao?: string;
}

export interface ExamInput {
  titulo: string;
  questoes: string[];
  tipoIdentificacao: TipoIdentificacao;
  disciplina?: string;
  professor?: string;
  dataProva?: string;
  instituicao?: string;
}

export interface ExamUpdate {
  titulo?: string;
  questoes?: string[];
  tipoIdentificacao?: TipoIdentificacao;
  disciplina?: string;
  professor?: string;
  dataProva?: string;
  instituicao?: string;
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

export interface GeneratePDFRequest {
  examId: string;
  quantidade: number;
  header: ExamHeader;
}
