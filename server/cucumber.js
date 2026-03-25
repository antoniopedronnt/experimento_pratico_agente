// Configurar ambiente de teste
process.env.NODE_ENV = 'test';
process.env.TS_NODE_PROJECT = './tsconfig.test.json';

module.exports = {
  default: {
    require: ['tests/steps/**/*.ts'],
    requireModule: ['ts-node/register'],
    format: [
      'progress-bar',
      'summary',
      'json:tests/reports/cucumber-report.json',
      'html:tests/reports/cucumber-report.html'
    ],
    formatOptions: { 
      snippetInterface: 'async-await',
      colorsEnabled: true
    },
    publishQuiet: true
  }
};
