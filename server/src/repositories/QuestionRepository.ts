import { Question, QuestionInput, QuestionUpdate } from '../models';
import { v4 as uuidv4 } from 'uuid';

export class InMemoryQuestionRepository {
  private questions: Map<string, Question> = new Map();

  create(input: QuestionInput): Question {
    const id = uuidv4();
    
    const question: Question = {
      id,
      enunciado: input.enunciado,
      alternativas: input.alternativas.map(alt => ({
        id: uuidv4(),
        descricao: alt.descricao,
        correta: alt.correta
      }))
    };

    this.questions.set(id, question);
    return question;
  }

  findAll(): Question[] {
    return Array.from(this.questions.values());
  }

  findById(id: string): Question | undefined {
    return this.questions.get(id);
  }

  update(id: string, input: QuestionUpdate): Question | undefined {
    const existing = this.questions.get(id);
    if (!existing) {
      return undefined;
    }

    const updated: Question = {
      ...existing,
      enunciado: input.enunciado ?? existing.enunciado,
      alternativas: input.alternativas 
        ? input.alternativas.map(alt => ({
            id: uuidv4(),
            descricao: alt.descricao,
            correta: alt.correta
          }))
        : existing.alternativas
    };

    this.questions.set(id, updated);
    return updated;
  }

  delete(id: string): boolean {
    return this.questions.delete(id);
  }

  clear(): void {
    this.questions.clear();
  }

  count(): number {
    return this.questions.size;
  }
}

// Singleton instance
export const questionRepository = new InMemoryQuestionRepository();
