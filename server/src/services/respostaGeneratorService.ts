import { ShuffledExam } from './shuffleService';

/**
 * Interface para configuração de geração de respostas
 */
export interface RespostaConfig {
  percentualAcerto: number; // 0-100: percentual de questões que devem estar corretas
  percentualParcial: number; // 0-100: percentual de alternativas corretas nas questões erradas
}

/**
 * Gera respostas simuladas de alunos para testes
 */
export class RespostaGeneratorService {
  /**
   * Gera um CSV com respostas simuladas de múltiplos alunos
   * Formato: Prova,Questao_1,Questao_2,...
   * Compatível com o formato do gabarito
   */
  generateRespostasCSV(
    provas: ShuffledExam[],
    numAlunos: number,
    tipoIdentificacao: 'LETRAS' | 'POTENCIAS'
  ): string {
    const lines: string[] = [];
    
    // Cabeçalho (igual ao gabarito)
    const numQuestoes = provas[0]?.gabarito.length || 0;
    const header = ['Prova', ...Array.from({ length: numQuestoes }, (_, i) => `Questao_${i + 1}`)];
    lines.push(header.join(','));
    
    // Gerar respostas para cada aluno
    for (let alunoNum = 1; alunoNum <= numAlunos; alunoNum++) {
      // Selecionar uma prova aleatória
      const prova = provas[Math.floor(Math.random() * provas.length)];
      
      // Determinar perfil do aluno (variação de desempenho)
      const config = this.getPerfilAluno(alunoNum, numAlunos);
      
      // Gerar respostas para cada questão
      const respostas = prova.gabarito.map(gabaritoQuestao => 
        this.gerarResposta(gabaritoQuestao, tipoIdentificacao, config)
      );
      
      // Adicionar linha (com escape de vírgulas)
      const row = [
        prova.numeroProva.toString(),
        ...respostas.map(r => this.escapeCSVValue(r))
      ];
      lines.push(row.join(','));
    }
    
    return lines.join('\n');
  }
  
  /**
   * Define perfil de desempenho do aluno
   * Distribui alunos com diferentes níveis de acerto
   */
  private getPerfilAluno(alunoNum: number, totalAlunos: number): RespostaConfig {
    const percentual = (alunoNum - 1) / Math.max(totalAlunos - 1, 1);
    
    if (percentual <= 0.2) {
      // 20% dos alunos com excelente desempenho (90-100%)
      return { percentualAcerto: 90 + Math.random() * 10, percentualParcial: 80 };
    } else if (percentual <= 0.5) {
      // 30% dos alunos com bom desempenho (70-89%)
      return { percentualAcerto: 70 + Math.random() * 20, percentualParcial: 60 };
    } else if (percentual <= 0.8) {
      // 30% dos alunos com desempenho médio (50-69%)
      return { percentualAcerto: 50 + Math.random() * 20, percentualParcial: 40 };
    } else {
      // 20% dos alunos com desempenho baixo (0-49%)
      return { percentualAcerto: Math.random() * 50, percentualParcial: 20 };
    }
  }
  
  /**
   * Gera resposta para uma questão com base no gabarito e config
   */
  private gerarResposta(
    gabarito: string,
    tipoIdentificacao: 'LETRAS' | 'POTENCIAS',
    config: RespostaConfig
  ): string {
    // Decidir se a questão será correta ou errada
    const acertaQuestao = Math.random() * 100 < config.percentualAcerto;
    
    if (acertaQuestao) {
      return gabarito; // Resposta correta
    }
    
    // Gerar resposta errada
    if (tipoIdentificacao === 'LETRAS') {
      return this.gerarRespostaErradaLetras(gabarito, config.percentualParcial);
    } else {
      return this.gerarRespostaErradaPotencias(gabarito, config.percentualParcial);
    }
  }
  
  /**
   * Gera resposta errada para questão com letras
   */
  private gerarRespostaErradaLetras(gabarito: string, percentualParcial: number): string {
    const letrasCorretas = gabarito.split(',').map(l => l.trim());
    const todasLetras = ['A', 'B', 'C', 'D', 'E', 'F'];
    const letrasIncorretas = todasLetras.filter(l => !letrasCorretas.includes(l));
    
    const resultado: string[] = [];
    
    // Manter algumas letras corretas baseado no percentual
    for (const letra of letrasCorretas) {
      if (Math.random() * 100 < percentualParcial) {
        resultado.push(letra);
      }
    }
    
    // Adicionar algumas letras incorretas
    const numIncorretasAdicionar = Math.floor(Math.random() * Math.min(2, letrasIncorretas.length));
    for (let i = 0; i < numIncorretasAdicionar; i++) {
      const letraIncorreta = letrasIncorretas[Math.floor(Math.random() * letrasIncorretas.length)];
      if (!resultado.includes(letraIncorreta)) {
        resultado.push(letraIncorreta);
      }
    }
    
    // Se ficou vazio, adicionar pelo menos uma letra qualquer
    if (resultado.length === 0) {
      resultado.push(todasLetras[Math.floor(Math.random() * todasLetras.length)]);
    }
    
    return resultado.sort().join(', ');
  }
  
  /**
   * Gera resposta errada para questão com potências
   */
  private gerarRespostaErradaPotencias(gabarito: string, percentualParcial: number): string {
    const valorCorreto = parseInt(gabarito);
    const potencias = [1, 2, 4, 8, 16, 32];
    
    // Decomposição do valor correto em potências
    const potenciasCorretas: number[] = [];
    let resto = valorCorreto;
    for (let i = potencias.length - 1; i >= 0; i--) {
      if (resto >= potencias[i]) {
        potenciasCorretas.push(potencias[i]);
        resto -= potencias[i];
      }
    }
    
    const resultado: number[] = [];
    
    // Manter algumas potências corretas
    for (const pot of potenciasCorretas) {
      if (Math.random() * 100 < percentualParcial) {
        resultado.push(pot);
      }
    }
    
    // Adicionar algumas potências incorretas
    const potenciasIncorretas = potencias.filter(p => !potenciasCorretas.includes(p));
    const numIncorretasAdicionar = Math.floor(Math.random() * Math.min(2, potenciasIncorretas.length));
    for (let i = 0; i < numIncorretasAdicionar; i++) {
      const potIncorreta = potenciasIncorretas[Math.floor(Math.random() * potenciasIncorretas.length)];
      if (!resultado.includes(potIncorreta)) {
        resultado.push(potIncorreta);
      }
    }
    
    // Calcular soma
    const soma = resultado.reduce((acc, val) => acc + val, 0);
    return soma.toString();
  }
  
  /**
   * Escapa valores CSV (adiciona aspas se contém vírgula)
   */
  private escapeCSVValue(value: string): string {
    if (value.includes(',') || value.includes('"') || value.includes('\n') || value.includes('\r')) {
      return `"${value.replace(/"/g, '""')}"`;
    }
    return value;
  }
}

export const respostaGeneratorService = new RespostaGeneratorService();
