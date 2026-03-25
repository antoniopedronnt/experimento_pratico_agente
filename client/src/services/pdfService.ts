import axios from 'axios';

const API_URL = 'https://experimento-pratico-agente-server.onrender.com/api';

export interface PDFGenerationRequest {
  quantidade: number;
  header: {
    disciplina: string;
    professor: string;
    data: string;
    instituicao?: string;
  };
}

export const pdfService = {
  async generatePDFs(examId: string, data: PDFGenerationRequest): Promise<Blob> {
    const response = await axios.post(
      `${API_URL}/exams/${examId}/generate`,
      data,
      {
        responseType: 'blob'
      }
    );
    return response.data;
  }
};
