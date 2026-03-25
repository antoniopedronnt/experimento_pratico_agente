import axios from 'axios';

const API_URL = 'https://experimento-pratico-agente-server.onrender.com/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export enum TipoIdentificacao {
  LETRAS = 'LETRAS',
  POTENCIAS = 'POTENCIAS'
}

export interface Exam {
  id: string;
  titulo: string;
  questoes: string[];
  tipoIdentificacao: TipoIdentificacao;
  criadaEm: string;
}

export interface ExamInput {
  titulo: string;
  questoes: string[];
  tipoIdentificacao: TipoIdentificacao;
}

export interface ExamPreview extends Exam {
  questoesCompletas: Array<{
    ordem: number;
    enunciado: string;
    alternativas: Array<{
      identificador: string;
      descricao: string;
      correta: boolean;
    }>;
  }>;
  espacoResposta: string;
}

export const examService = {
  async getAll(): Promise<Exam[]> {
    const response = await api.get<Exam[]>('/exams');
    return response.data;
  },

  async getById(id: string): Promise<Exam> {
    const response = await api.get<Exam>(`/exams/${id}`);
    return response.data;
  },

  async getPreview(id: string): Promise<ExamPreview> {
    const response = await api.get<ExamPreview>(`/exams/${id}/preview`);
    return response.data;
  },

  async create(data: ExamInput): Promise<Exam> {
    const response = await api.post<Exam>('/exams', data);
    return response.data;
  },

  async update(id: string, data: Partial<ExamInput>): Promise<Exam> {
    const response = await api.put<Exam>(`/exams/${id}`, data);
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/exams/${id}`);
  },

  /**
   * Gera CSV com respostas simuladas de alunos
   */
  async generateResponses(
    examId: string, 
    numAlunos: number, 
    numProvas: number
  ): Promise<Blob> {
    const response = await api.post(
      `/exams/${examId}/generate-responses`,
      { numAlunos, numProvas },
      { responseType: 'blob' }
    );
    return response.data;
  }
};
