import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from 'chai';
import request from 'supertest';
import app from '../../src/server';
import { questionRepository, examRepository } from '../../src/repositories';
import { TipoIdentificacao, ModoCorrecao } from '../../src/models';

let questionId: string;
let examId: string;
let gabaritoCSV: string;
let respostasCSV: string;
let correcaoResponse: any;

Given('que existe uma questão cadastrada com {int} alternativas', function (numAlternativas: number) {
  const alternativas = [
    { descricao: 'Alternativa A', correta: true },
    { descricao: 'Alternativa B', correta: false },
    { descricao: 'Alternativa C', correta: true },
    { descricao: 'Alternativa D', correta: false }
  ];

  const question = questionRepository.create({
    enunciado: 'Questão de teste para correção',
    alternativas: alternativas.slice(0, numAlternativas)
  });

  questionId = question.id;
});

Given('a questão tem alternativas {string} e {string} marcadas como corretas', function (letra1: string, letra2: string) {
  // Já criado no step anterior com A e C corretas
});

Given('existe uma prova com tipo de identificação {string}', function (tipo: string) {
  const question = questionRepository.create({
    enunciado: 'Questão de teste',
    alternativas: [
      { descricao: 'Alt 1', correta: true },
      { descricao: 'Alt 2', correta: false },
      { descricao: 'Alt 3', correta: true },
      { descricao: 'Alt 4', correta: false }
    ]
  });

  const tipoId = tipo === 'LETRAS' ? TipoIdentificacao.LETRAS : TipoIdentificacao.POTENCIAS;
  
  const exam = examRepository.create({
    titulo: `Prova Teste ${tipo}`,
    questoes: [question.id],
    tipoIdentificacao: tipoId
  });

  examId = exam.id;
  questionId = question.id;
});

Given('a prova contém a questão cadastrada', function () {
  if (!examId) {
    const exam = examRepository.create({
      titulo: 'Prova de Teste',
      questoes: [questionId],
      tipoIdentificacao: TipoIdentificacao.LETRAS
    });
    examId = exam.id;
  }
});

Given('que o gabarito da prova {int} é {string}', function (numeroProva: number, gabarito: string) {
  gabaritoCSV = `Prova,Questao_1\n${numeroProva},"${gabarito}"`;
});

Given('o aluno {string} com CPF {string} respondeu {string} na prova {int}', 
function (nome: string, cpf: string, resposta: string, numeroProva: number) {
  if (!respostasCSV || !respostasCSV.startsWith('Nome,CPF')) {
    respostasCSV = 'Nome,CPF,NumeroProva,Questao_1\n';
  }
  respostasCSV += `${nome},${cpf},${numeroProva},"${resposta}"\n`;
});

When('corrijo as provas no modo {string}', async function (modo: string) {
  const modoCorrecao = modo === 'RIGOROSO' ? ModoCorrecao.RIGOROSO : ModoCorrecao.PROPORCIONAL;
  
  const response = await request(app)
    .post(`/api/exams/${examId}/correct`)
    .send({
      gabaritoCSV,
      respostasCSV,
      modoCorrecao
    });

  correcaoResponse = response.body;
});

Then('o aluno {string} deve ter nota final {int}', function (nome: string, notaEsperada: number) {
  const aluno = correcaoResponse.resultados.find((r: any) => r.nome === nome);
  expect(aluno).to.exist;
  expect(aluno.notaFinal).to.be.closeTo(notaEsperada, 0.01);
});

Then('o relatório deve conter {int} alunos', function (quantidade: number) {
  expect(correcaoResponse.resultados).to.have.lengthOf(quantidade);
});

Then('a média da turma deve ser aproximadamente {float}', function (mediaEsperada: number) {
  expect(correcaoResponse.estatisticas.media).to.be.closeTo(mediaEsperada, 0.1);
});
