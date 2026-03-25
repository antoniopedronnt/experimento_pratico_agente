import { ModoCorrecao, Gabarito, RespostaAluno, ResultadoAluno, ResultadoQuestao, Estatisticas } from '../models/Correction';
import { TipoIdentificacao } from '../models';

export class CorrectionService {
  
  /**
   * Corrige uma única questão
   */
  corrigirQuestao(
    respostaAluno: string,
    respostaCorreta: string,
    tipoIdentificacao: TipoIdentificacao,
    modoCorrecao: ModoCorrecao,
    totalAlternativas: number
  ): { pontuacao: number; acertou: boolean } {
    
    if (tipoIdentificacao === TipoIdentificacao.LETRAS) {
      return this.corrigirQuestaoLetras(respostaAluno, respostaCorreta, modoCorrecao, totalAlternativas);
    } else {
      return this.corrigirQuestaoPotencias(respostaAluno, respostaCorreta, modoCorrecao, totalAlternativas);
    }
  }

  /**
   * Correção para tipo LETRAS (A, B, C)
   */
  private corrigirQuestaoLetras(
    respostaAluno: string,
    respostaCorreta: string,
    modoCorrecao: ModoCorrecao,
    totalAlternativas: number
  ): { pontuacao: number; acertou: boolean } {
    
    // Normalizar respostas: remover espaços, converter para maiúsculas
    const normalizarResposta = (resp: string): Set<string> => {
      if (!resp || resp.trim() === '') return new Set();
      return new Set(
        resp.split(',')
          .map(l => l.trim().toUpperCase())
          .filter(l => l.length > 0)
      );
    };

    const letrasAluno = normalizarResposta(respostaAluno);
    const letrasCorretas = normalizarResposta(respostaCorreta);

    if (modoCorrecao === ModoCorrecao.RIGOROSO) {
      // Modo rigoroso: deve ser exatamente igual
      const acertou = this.setsIguais(letrasAluno, letrasCorretas);
      return {
        pontuacao: acertou ? 100 : 0,
        acertou
      };
    } else {
      // Modo proporcional: calcular com base nas alternativas
      // Acertos: letras corretas que foram marcadas + letras incorretas que NÃO foram marcadas
      const todasLetras = this.gerarLetras(totalAlternativas);
      const letrasIncorretas = todasLetras.filter(l => !letrasCorretas.has(l));
      
      let acertos = 0;
      
      // Contar letras corretas que foram marcadas
      for (const letra of letrasCorretas) {
        if (letrasAluno.has(letra)) {
          acertos++;
        }
      }
      
      // Contar letras incorretas que NÃO foram marcadas
      for (const letra of letrasIncorretas) {
        if (!letrasAluno.has(letra)) {
          acertos++;
        }
      }
      
      const pontuacao = (acertos / totalAlternativas) * 100;
      const acertou = pontuacao === 100;
      
      return { pontuacao, acertou };
    }
  }

  /**
   * Correção para tipo POTENCIAS (1, 2, 4, 8...)
   */
  private corrigirQuestaoPotencias(
    respostaAluno: string,
    respostaCorreta: string,
    modoCorrecao: ModoCorrecao,
    totalAlternativas: number
  ): { pontuacao: number; acertou: boolean } {
    
    const somaAluno = parseInt(respostaAluno.trim()) || 0;
    const somaCorreta = parseInt(respostaCorreta.trim()) || 0;

    if (modoCorrecao === ModoCorrecao.RIGOROSO) {
      const acertou = somaAluno === somaCorreta;
      return {
        pontuacao: acertou ? 100 : 0,
        acertou
      };
    } else {
      // Modo proporcional: decompor em potências e comparar
      const potenciasAluno = this.decomporEmPotencias(somaAluno);
      const potenciasCorretas = this.decomporEmPotencias(somaCorreta);
      
      // Todas as potências possíveis para essa questão
      const todasPotencias = Array.from({ length: totalAlternativas }, (_, i) => Math.pow(2, i));
      
      let acertos = 0;
      
      // Contar potências corretas que foram marcadas
      for (const pot of potenciasCorretas) {
        if (potenciasAluno.includes(pot)) {
          acertos++;
        }
      }
      
      // Contar potências incorretas que NÃO foram marcadas
      const potenciasIncorretas = todasPotencias.filter(p => !potenciasCorretas.includes(p));
      for (const pot of potenciasIncorretas) {
        if (!potenciasAluno.includes(pot)) {
          acertos++;
        }
      }
      
      const pontuacao = (acertos / totalAlternativas) * 100;
      const acertou = pontuacao === 100;
      
      return { pontuacao, acertou };
    }
  }

  /**
   * Corrige todas as provas
   */
  corrigirProvas(
    gabaritos: Map<number, Gabarito>,
    respostas: RespostaAluno[],
    tipoIdentificacao: TipoIdentificacao,
    modoCorrecao: ModoCorrecao,
    totalAlternativasPorQuestao: number[]
  ): ResultadoAluno[] {
    
    const resultados: ResultadoAluno[] = [];

    for (const respAluno of respostas) {
      const gabarito = gabaritos.get(respAluno.numeroProva);

      if (!gabarito) {
        throw new Error(`Gabarito não encontrado para prova ${respAluno.numeroProva}`);
      }

      if (respAluno.respostas.length !== gabarito.respostas.length) {
        throw new Error(`Número de respostas do aluno ${respAluno.nome} não corresponde ao número de questões da prova`);
      }

      const questoes: ResultadoQuestao[] = [];
      let somaPontos = 0;

      for (let i = 0; i < gabarito.respostas.length; i++) {
        const totalAlts = totalAlternativasPorQuestao[i] || 4; // fallback para 4 alternativas
        
        const { pontuacao, acertou } = this.corrigirQuestao(
          respAluno.respostas[i],
          gabarito.respostas[i],
          tipoIdentificacao,
          modoCorrecao,
          totalAlts
        );

        questoes.push({
          questao: i + 1,
          respostaAluno: respAluno.respostas[i],
          respostaCorreta: gabarito.respostas[i],
          acertou,
          pontuacao
        });

        somaPontos += pontuacao;
      }

      const notaFinal = somaPontos / gabarito.respostas.length;

      resultados.push({
        nome: respAluno.nome,
        cpf: respAluno.cpf,
        numeroProva: respAluno.numeroProva,
        questoes,
        notaFinal: Math.round(notaFinal * 100) / 100 // arredondar para 2 casas decimais
      });
    }

    return resultados;
  }

  /**
   * Calcular estatísticas da turma
   */
  calcularEstatisticas(resultados: ResultadoAluno[]): Estatisticas {
    if (resultados.length === 0) {
      return {
        media: 0,
        mediana: 0,
        maiorNota: 0,
        menorNota: 0,
        totalAlunos: 0
      };
    }

    const notas = resultados.map(r => r.notaFinal).sort((a, b) => a - b);
    const soma = notas.reduce((acc, n) => acc + n, 0);
    const media = soma / notas.length;

    let mediana: number;
    const meio = Math.floor(notas.length / 2);
    if (notas.length % 2 === 0) {
      mediana = (notas[meio - 1] + notas[meio]) / 2;
    } else {
      mediana = notas[meio];
    }

    return {
      media: Math.round(media * 100) / 100,
      mediana: Math.round(mediana * 100) / 100,
      maiorNota: notas[notas.length - 1],
      menorNota: notas[0],
      totalAlunos: resultados.length
    };
  }

  // Funções auxiliares

  private setsIguais<T>(set1: Set<T>, set2: Set<T>): boolean {
    if (set1.size !== set2.size) return false;
    for (const item of set1) {
      if (!set2.has(item)) return false;
    }
    return true;
  }

  private gerarLetras(quantidade: number): string[] {
    return Array.from({ length: quantidade }, (_, i) => String.fromCharCode(65 + i));
  }

  private decomporEmPotencias(valor: number): number[] {
    const potencias: number[] = [];
    let resto = valor;
    let exp = 0;

    while (resto > 0) {
      const potencia = Math.pow(2, exp);
      if (resto & 1) {
        potencias.push(potencia);
      }
      resto = resto >> 1;
      exp++;
    }

    return potencias;
  }
}

export const correctionService = new CorrectionService();
