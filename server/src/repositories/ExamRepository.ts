import { Exam, ExamInput, ExamUpdate, TipoIdentificacao } from '../models';
import { v4 as uuidv4 } from 'uuid';

export class InMemoryExamRepository {
  private exams: Map<string, Exam> = new Map();

  create(input: ExamInput): Exam {
    const id = uuidv4();
    
    const exam: Exam = {
      id,
      titulo: input.titulo,
      questoes: [...input.questoes],
      tipoIdentificacao: input.tipoIdentificacao,
      criadaEm: new Date()
    };

    this.exams.set(id, exam);
    return exam;
  }

  findAll(): Exam[] {
    return Array.from(this.exams.values()).sort((a, b) => 
      b.criadaEm.getTime() - a.criadaEm.getTime()
    );
  }

  findById(id: string): Exam | undefined {
    return this.exams.get(id);
  }

  update(id: string, input: ExamUpdate): Exam | undefined {
    const existing = this.exams.get(id);
    if (!existing) {
      return undefined;
    }

    const updated: Exam = {
      ...existing,
      titulo: input.titulo ?? existing.titulo,
      questoes: input.questoes ?? existing.questoes,
      tipoIdentificacao: input.tipoIdentificacao ?? existing.tipoIdentificacao
    };

    this.exams.set(id, updated);
    return updated;
  }

  delete(id: string): boolean {
    return this.exams.delete(id);
  }

  clear(): void {
    this.exams.clear();
  }

  count(): number {
    return this.exams.size;
  }
}

// Singleton instance
export const examRepository = new InMemoryExamRepository();
