import { Given, When, Then } from '@cucumber/cucumber';
import request from 'supertest';
import { expect } from 'chai';
import app from '../../src/server';
import { examRepository, questionRepository } from '../../src/repositories';
import { TipoIdentificacao } from '../../src/models';

interface ExamTestContext {
  response?: request.Response;
  examInput?: any;
  examId?: string;
  questionIds?: string[];
}

const examContext: ExamTestContext = {};

// ========== CONTEXTO ==========

Given('que existem questões cadastradas no sistema', () => {
  // Criar algumas questões para uso nos testes
  examContext.questionIds = [];
  for (let i = 1; i <= 5; i++) {
    const question = questionRepository.create({
      enunciado: `Questão ${i} para prova`,
      alternativas: [
        { descricao: 'Alternativa A', correta: true },
        { descricao: 'Alternativa B', correta: false },
        { descricao: 'Alternativa C', correta: false },
        { descricao: 'Alternativa D', correta: false }
      ]
    });
    examContext.questionIds.push(question.id);
  }
});

Given('que existem {int} provas cadastradas', (count: number) => {
  for (let i = 1; i <= count; i++) {
    examRepository.create({
      titulo: `Prova ${i}`,
      questoes: examContext.questionIds?.slice(0, 2) || [],
      tipoIdentificacao: TipoIdentificacao.LETRAS
    });
  }
});

Given('que existe uma prova cadastrada', () => {
  const exam = examRepository.create({
    titulo: 'Prova de Teste',
    questoes: examContext.questionIds?.slice(0, 2) || [],
    tipoIdentificacao: TipoIdentificacao.LETRAS
  });
  examContext.examId = exam.id;
});

Given('que existe uma prova com identificação por {string}', (tipo: string) => {
  const exam = examRepository.create({
    titulo: 'Prova de Teste',
    questoes: examContext.questionIds?.slice(0, 2) || [],
    tipoIdentificacao: tipo as TipoIdentificacao
  });
  examContext.examId = exam.id;
});

// ========== WHEN - CRIAR ==========

When('eu criar uma prova com título {string}', (titulo: string) => {
  examContext.examInput = {
    titulo,
    questoes: [],
    tipoIdentificacao: TipoIdentificacao.LETRAS
  };
});

When('selecionar {int} questões', (count: number) => {
  examContext.examInput.questoes = examContext.questionIds?.slice(0, count) || [];
});

When('escolher identificação por {string}', (tipo: string) => {
  examContext.examInput.tipoIdentificacao = tipo;
});

When('eu tentar criar uma prova sem título', () => {
  examContext.examInput = {
    titulo: '',
    questoes: examContext.questionIds?.slice(0, 1) || [],
    tipoIdentificacao: TipoIdentificacao.LETRAS
  };
});

When('não selecionar nenhuma questão', () => {
  examContext.examInput.questoes = [];
});

When('selecionar uma questão que não existe', () => {
  examContext.examInput.questoes = ['id-inexistente-123'];
});

// ========== WHEN - LISTAR/VISUALIZAR ==========

When('eu listar todas as provas', async () => {
  examContext.response = await request(app).get('/api/exams');
});

When('eu visualizar o preview da prova', async () => {
  examContext.response = await request(app)
    .get(`/api/exams/${examContext.examId}/preview`);
});

// ========== WHEN - ATUALIZAR ==========

When('eu atualizar o título para {string}', async (novoTitulo: string) => {
  examContext.response = await request(app)
    .put(`/api/exams/${examContext.examId}`)
    .send({ titulo: novoTitulo });
});

// ========== WHEN - REMOVER ==========

When('eu remover a prova', async () => {
  examContext.response = await request(app)
    .delete(`/api/exams/${examContext.examId}`);
});

// ========== THEN - CRIAR ==========

Then('a prova deve ser criada com sucesso', async () => {
  if (!examContext.response) {
    examContext.response = await request(app)
      .post('/api/exams')
      .send(examContext.examInput);
  }
  expect(examContext.response.status).to.equal(201);
  examContext.examId = examContext.response.body.id;
});

Then('a prova deve ter tipo de identificação {string}', (tipo: string) => {
  expect(examContext.response?.body.tipoIdentificacao).to.equal(tipo);
});

Then('a prova deve ter {int} questões', (count: number) => {
  expect(examContext.response?.body.questoes).to.have.lengthOf(count);
});

// ========== THEN - PREVIEW ==========

Then('as alternativas devem estar identificadas como {string}, {string}, {string}, {string}', 
  (id1: string, id2: string, id3: string, id4: string) => {
    const preview = examContext.response?.body;
    expect(preview.questoesCompletas).to.be.an('array');
    
    const primeiraQuestao = preview.questoesCompletas[0];
    const identificadores = primeiraQuestao.alternativas.map((alt: any) => alt.identificador);
    
    expect(identificadores).to.include(id1);
    expect(identificadores).to.include(id2);
    expect(identificadores).to.include(id3);
    expect(identificadores).to.include(id4);
});

Then('deve conter espaço para resposta com texto {string}', (texto: string) => {
  const preview = examContext.response?.body;
  expect(preview.espacoResposta.toLowerCase()).to.include(texto.toLowerCase());
});

// ========== THEN - LISTAR ==========

Then('deve retornar uma lista com {int} provas', (count: number) => {
  expect(examContext.response?.body).to.be.an('array');
  expect(examContext.response?.body).to.have.lengthOf(count);
});

// ========== THEN - ATUALIZAR ==========

Then('a prova deve ter o novo título {string}', (titulo: string) => {
  expect(examContext.response?.body.titulo).to.equal(titulo);
});

// ========== THEN - REMOVER ==========

Then('a prova não deve mais existir no sistema', () => {
  const exam = examRepository.findById(examContext.examId!);
  expect(exam).to.be.undefined;
});
