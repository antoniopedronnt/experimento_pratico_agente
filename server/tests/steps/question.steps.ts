import { Given, When, Then, Before, setDefaultTimeout } from '@cucumber/cucumber';
import request from 'supertest';
import { expect } from 'chai';
import app from '../../src/server';
import { questionRepository } from '../../src/repositories';

setDefaultTimeout(10000);

interface TestContext {
  response?: request.Response;
  questionInput?: any;
  questionId?: string;
  questions?: any[];
}

const context: TestContext = {};

Before(() => {
  // Limpar repositório antes de cada cenário
  questionRepository.clear();
  context.response = undefined;
  context.questionInput = undefined;
  context.questionId = undefined;
  context.questions = undefined;
});

// ========== GIVEN ==========

Given('que não existem questões cadastradas', () => {
  questionRepository.clear();
});

Given('que existem {int} questões cadastradas', async (count: number) => {
  context.questions = [];
  for (let i = 1; i <= count; i++) {
    const question = questionRepository.create({
      enunciado: `Questão ${i}`,
      alternativas: [
        { descricao: 'Alternativa A', correta: true },
        { descricao: 'Alternativa B', correta: false }
      ]
    });
    context.questions.push(question);
  }
});

Given('que existe uma questão cadastrada', async () => {
  const question = questionRepository.create({
    enunciado: 'Questão de teste',
    alternativas: [
      { descricao: 'Alternativa correta', correta: true },
      { descricao: 'Alternativa incorreta', correta: false }
    ]
  });
  context.questionId = question.id;
});

Given('que existe uma questão cadastrada com enunciado {string}', async (enunciado: string) => {
  const question = questionRepository.create({
    enunciado,
    alternativas: [
      { descricao: 'Alternativa A', correta: true },
      { descricao: 'Alternativa B', correta: false }
    ]
  });
  context.questionId = question.id;
});

// ========== WHEN ==========

When('eu criar uma questão com enunciado {string}', (enunciado: string) => {
  context.questionInput = {
    enunciado,
    alternativas: []
  };
});

When('adicionar alternativa {string} marcada como correta', (descricao: string) => {
  if (!context.questionInput) {
    context.questionInput = { enunciado: '', alternativas: [] };
  }
  context.questionInput.alternativas.push({ descricao, correta: true });
});

When('adicionar alternativa {string} marcada como incorreta', (descricao: string) => {
  if (!context.questionInput) {
    context.questionInput = { enunciado: '', alternativas: [] };
  }
  context.questionInput.alternativas.push({ descricao, correta: false });
});

When('adicionar apenas {int} alternativa {string} marcada como correta', (count: number, descricao: string) => {
  context.questionInput.alternativas.push({ descricao, correta: true });
});

When('eu tentar criar uma questão sem enunciado', () => {
  context.questionInput = {
    enunciado: '',
    alternativas: [
      { descricao: 'Alternativa A', correta: true },
      { descricao: 'Alternativa B', correta: false }
    ]
  };
});

When('eu listar todas as questões', async () => {
  context.response = await request(app).get('/api/questions');
});

When('eu atualizar o enunciado para {string}', async (novoEnunciado: string) => {
  context.response = await request(app)
    .put(`/api/questions/${context.questionId}`)
    .send({ enunciado: novoEnunciado });
});

When('eu atualizar as alternativas da questão', async () => {
  context.response = await request(app)
    .put(`/api/questions/${context.questionId}`)
    .send({
      alternativas: [
        { descricao: 'Nova alternativa 1', correta: true },
        { descricao: 'Nova alternativa 2', correta: false },
        { descricao: 'Nova alternativa 3', correta: false }
      ]
    });
});

When('eu tentar atualizar uma questão com ID inexistente', async () => {
  context.response = await request(app)
    .put('/api/questions/id-inexistente-123')
    .send({ enunciado: 'Teste' });
});

When('eu remover a questão', async () => {
  context.response = await request(app)
    .delete(`/api/questions/${context.questionId}`);
});

When('eu tentar remover uma questão com ID inexistente', async () => {
  context.response = await request(app)
    .delete('/api/questions/id-inexistente-123');
});

// ========== THEN ==========

Then('a questão deve ser criada com sucesso', async () => {
  context.response = await request(app)
    .post('/api/questions')
    .send(context.questionInput);
  
  expect(context.response.status).to.equal(201);
});

Then('deve retornar erro de validação', async () => {
  if (!context.response) {
    context.response = await request(app)
      .post('/api/questions')
      .send(context.questionInput);
  }
  expect(context.response.status).to.equal(400);
});

Then('a resposta deve ter status {int}', (statusCode: number) => {
  expect(context.response?.status).to.equal(statusCode);
});

Then('a questão deve ter um ID único', () => {
  expect(context.response?.body).to.have.property('id');
  expect(context.response?.body.id).to.be.a('string');
});

Then('a questão deve ter {int} alternativas', (count: number) => {
  expect(context.response?.body.alternativas).to.have.lengthOf(count);
});

Then('a mensagem de erro deve mencionar {string}', (texto: string) => {
  const body = context.response?.body;
  const hasError = body.error?.toLowerCase().includes(texto.toLowerCase()) ||
                   body.errors?.some((e: any) => e.message?.toLowerCase().includes(texto.toLowerCase()));
  expect(hasError).to.be.true;
});

Then('deve retornar uma lista vazia', () => {
  expect(context.response?.body).to.be.an('array');
  expect(context.response?.body).to.have.lengthOf(0);
});

Then('deve retornar uma lista com {int} questões', (count: number) => {
  expect(context.response?.body).to.be.an('array');
  expect(context.response?.body).to.have.lengthOf(count);
});

Then('cada questão deve ter ID, enunciado e alternativas', () => {
  const questions = context.response?.body;
  expect(questions).to.be.an('array');
  questions.forEach((q: any) => {
    expect(q).to.have.property('id');
    expect(q).to.have.property('enunciado');
    expect(q).to.have.property('alternativas');
    expect(q.alternativas).to.be.an('array');
  });
});

Then('a questão deve ter o novo enunciado {string}', (enunciado: string) => {
  expect(context.response?.body.enunciado).to.equal(enunciado);
});

Then('a questão deve ter as novas alternativas', () => {
  expect(context.response?.body.alternativas).to.be.an('array');
  expect(context.response?.body.alternativas.length).to.be.greaterThan(0);
});

Then('a mensagem deve indicar que a questão não foi encontrada', () => {
  const body = context.response?.body;
  expect(body.error?.toLowerCase()).to.include('não encontrada');
});

Then('a questão não deve mais existir no sistema', async () => {
  const question = questionRepository.findById(context.questionId!);
  expect(question).to.be.undefined;
});
