import { ShuffledExam } from './shuffleService';

/**
 * Escapa valores para CSV (adiciona aspas se necessário)
 */
function escapeCSVValue(value: string): string {
  // Se o valor contém vírgula, aspas ou quebra de linha, precisa ser quotado
  if (value.includes(',') || value.includes('"') || value.includes('\n') || value.includes('\r')) {
    // Escapa aspas duplas duplicando-as
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

/**
 * Gera arquivo CSV com gabaritos das provas
 * Formato: numero_prova,gabarito_q1,gabarito_q2,...
 */
export function generateCSV(provas: ShuffledExam[]): string {
  const lines: string[] = [];
  
  // Cabeçalho
  const numQuestoes = provas[0]?.gabarito.length || 0;
  const header = ['Prova', ...Array.from({ length: numQuestoes }, (_, i) => `Questao_${i + 1}`)];
  lines.push(header.join(','));
  
  // Dados de cada prova
  provas.forEach(prova => {
    const row = [
      prova.numeroProva.toString(), 
      ...prova.gabarito.map(g => escapeCSVValue(g))
    ];
    lines.push(row.join(','));
  });
  
  return lines.join('\n');
}
