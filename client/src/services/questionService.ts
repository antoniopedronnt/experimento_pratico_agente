import axios from 'axios';
import { Question, QuestionInput } from '../types';

const API_URL = 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const questionService = {
  async getAll(): Promise<Question[]> {
    const response = await api.get<Question[]>('/questions');
    return response.data;
  },

  async getById(id: string): Promise<Question> {
    const response = await api.get<Question>(`/questions/${id}`);
    return response.data;
  },

  async create(data: QuestionInput): Promise<Question> {
    const response = await api.post<Question>('/questions', data);
    return response.data;
  },

  async update(id: string, data: Partial<QuestionInput>): Promise<Question> {
    const response = await api.put<Question>(`/questions/${id}`, data);
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/questions/${id}`);
  }
};
