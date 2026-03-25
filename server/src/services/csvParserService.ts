import { parse } from 'csv-parse/sync';
import { Gabarito, RespostaAluno } from '../models/Correction';

export class CSVParserService {
  /**
   * Parse do CSV de gabarito gerado no Req. 3
   * Formato: Prova,Questao_1,Questao_2,...
   * Exemplo: 1,"A, C","B","15"
   */
  parseGabaritoCSV(csvContent: string): Map<number, Gabarito> {
    try {
      const records = parse(csvContent, {
        columns: true,
        skip_empty_lines: true,
        trim: true
      });

      const gabaritos = new Map<number, Gabarito>();

      for (const record of records) {
        const numeroProva = parseInt(record['Prova']);
        const respostas: string[] = [];

        // Extrair todas as colunas que começam com "Questao_"
        const questaoKeys = Object.keys(record)
          .filter(key => key.startsWith('Questao_'))
          .sort((a, b) => {
            const numA = parseInt(a.split('_')[1]);
            const numB = parseInt(b.split('_')[1]);
            return numA - numB;
          });

        for (const key of questaoKeys) {
          respostas.push(record[key].trim());
        }

        gabaritos.set(numeroProva, {
          numeroProva,
          respostas
        });
      }

      return gabaritos;
    } catch (error) {
      throw new Error(`Erro ao parsear CSV de gabarito: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Parse do CSV de respostas dos alunos
   * Formato simplificado (igual ao gabarito): Prova,Questao_1,Questao_2,...
   * Exemplo: 1,"A, C","B","15"
   * 
   * Nome e CPF são gerados automaticamente como "Aluno X"
   */
  parseRespostasCSV(csvContent: string): RespostaAluno[] {
    try {
      const records = parse(csvContent, {
        columns: true,
        skip_empty_lines: true,
        trim: true
      });

      const respostas: RespostaAluno[] = [];
      let alunoCounter = 1;

      for (const record of records) {
        const numeroProva = parseInt(record['Prova']);
        const respostasQuestoes: string[] = [];

        // Extrair todas as colunas que começam com "Questao_"
        const questaoKeys = Object.keys(record)
          .filter(key => key.startsWith('Questao_'))
          .sort((a, b) => {
            const numA = parseInt(a.split('_')[1]);
            const numB = parseInt(b.split('_')[1]);
            return numA - numB;
          });

        for (const key of questaoKeys) {
          respostasQuestoes.push(record[key].trim());
        }

        respostas.push({
          nome: `Aluno ${alunoCounter}`,
          cpf: `${String(alunoCounter).padStart(11, '0')}`,
          numeroProva,
          respostas: respostasQuestoes
        });
        
        alunoCounter++;
      }

      return respostas;
    } catch (error) {
      throw new Error(`Erro ao parsear CSV de respostas: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}

export const csvParserService = new CSVParserService();
