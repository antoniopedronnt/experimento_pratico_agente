module.exports = {
  default: {
    require: ['tests/steps/**/*.ts'],
    requireModule: ['ts-node/register'],
    format: ['progress', 'html:tests/reports/cucumber-report.html'],
    formatOptions: { snippetInterface: 'async-await' }
  }
};
