import { Question, Alternative, TipoIdentificacao } from '../models';

export interface ShuffledAlternative {
  originalIndex: number;
  alternativa: Alternative;
  novoIdentificador: string;
}

export interface ShuffledQuestion {
  originalIndex: number;
  questao: Question;
  alternativasEmbaralhadas: ShuffledAlternative[];
}

export interface ShuffledExam {
  numeroProva: number;
  questoesEmbaralhadas: ShuffledQuestion[];
  gabarito: string[];
}

/**
 * Embaralha um array usando o algoritmo Fisher-Yates
 */
function shuffle<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * Gera identificador para alternativa baseado no tipo e índice
 */
function getIdentificador(tipo: TipoIdentificacao, index: number): string {
  if (tipo === TipoIdentificacao.LETRAS) {
    return String.fromCharCode(65 + index); // A, B, C, D...
  } else {
    return Math.pow(2, index).toString(); // 1, 2, 4, 8...
  }
}

/**
 * Calcula o gabarito de uma questão embaralhada
 */
function calcularGabarito(
  alternativasEmbaralhadas: ShuffledAlternative[],
  tipoIdentificacao: TipoIdentificacao
): string {
  const corretas = alternativasEmbaralhadas.filter(a => a.alternativa.correta);
  
  if (tipoIdentificacao === TipoIdentificacao.LETRAS) {
    // Retorna letras separadas por vírgula: "A, C, E"
    return corretas
      .map(a => a.novoIdentificador)
      .sort()
      .join(', ');
  } else {
    // Retorna soma: "13" (para 1+4+8)
    const soma = corretas.reduce((sum, a) => {
      return sum + parseInt(a.novoIdentificador);
    }, 0);
    return soma.toString();
  }
}

/**
 * Embaralha questões e alternativas de uma prova
 */
export function shuffleExam(
  questions: Question[],
  tipoIdentificacao: TipoIdentificacao,
  numeroProva: number
): ShuffledExam {
  // Embaralhar ordem das questões
  const questoesComIndice = questions.map((q, idx) => ({ questao: q, originalIndex: idx }));
  const questoesEmbaralhadas = shuffle(questoesComIndice);

  const questoesProcessadas: ShuffledQuestion[] = questoesEmbaralhadas.map(({ questao, originalIndex }) => {
    // Embaralhar alternativas de cada questão
    const alternativasComIndice = questao.alternativas.map((alt, idx) => ({
      alternativa: alt,
      originalIndex: idx
    }));
    
    const alternativasEmbaralhadas = shuffle(alternativasComIndice);

    // Atribuir novos identificadores baseados na nova posição
    const alternativasComNovoId: ShuffledAlternative[] = alternativasEmbaralhadas.map((item, newIndex) => ({
      originalIndex: item.originalIndex,
      alternativa: item.alternativa,
      novoIdentificador: getIdentificador(tipoIdentificacao, newIndex)
    }));

    return {
      originalIndex,
      questao,
      alternativasEmbaralhadas: alternativasComNovoId
    };
  });

  // Gerar gabarito
  const gabarito = questoesProcessadas.map(q => 
    calcularGabarito(q.alternativasEmbaralhadas, tipoIdentificacao)
  );

  return {
    numeroProva,
    questoesEmbaralhadas: questoesProcessadas,
    gabarito
  };
}

/**
 * Gera múltiplas provas embaralhadas
 */
export function generateShuffledExams(
  questions: Question[],
  tipoIdentificacao: TipoIdentificacao,
  quantidade: number
): ShuffledExam[] {
  const provas: ShuffledExam[] = [];
  
  for (let i = 1; i <= quantidade; i++) {
    provas.push(shuffleExam(questions, tipoIdentificacao, i));
  }
  
  return provas;
}
