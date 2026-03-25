import axios from 'axios';
import { ModoCorrecao, RelatorioNotas } from '../types';

const API_URL = 'http://localhost:3000/api';

export const correctionService = {
  async correctExam(
    examId: string,
    gabaritoCSV: string,
    respostasCSV: string,
    modoCorrecao: ModoCorrecao
  ): Promise<RelatorioNotas> {
    const response = await axios.post(
      `${API_URL}/exams/${examId}/correct`,
      {
        gabaritoCSV,
        respostasCSV,
        modoCorrecao
      }
    );
    return response.data;
  }
};
