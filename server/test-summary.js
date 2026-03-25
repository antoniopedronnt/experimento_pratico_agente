const fs = require('fs');
const path = require('path');

// Ler o arquivo JSON de relatório gerado pelo Cucumber
const reportPath = path.join(__dirname, 'tests', 'reports', 'cucumber-report.json');

if (!fs.existsSync(reportPath)) {
  console.log('\n⚠️  Relatório de testes não encontrado!');
  process.exit(1);
}

const report = JSON.parse(fs.readFileSync(reportPath, 'utf8'));

// Contadores
let totalScenarios = 0;
let passedScenarios = 0;
let failedScenarios = 0;
let skippedScenarios = 0;
let pendingScenarios = 0;

const failedDetails = [];

// Analisar cada feature
report.forEach(feature => {
  const featureName = feature.name;
  
  feature.elements.forEach(scenario => {
    totalScenarios++;
    
    const scenarioName = scenario.name;
    const steps = scenario.steps || [];
    
    // Verificar status do cenário
    const hasFailedStep = steps.some(step => step.result.status === 'failed');
    const hasSkippedStep = steps.some(step => step.result.status === 'skipped');
    const hasPendingStep = steps.some(step => step.result.status === 'pending' || step.result.status === 'undefined');
    
    if (hasFailedStep) {
      failedScenarios++;
      
      // Capturar detalhes do erro
      const failedStep = steps.find(step => step.result.status === 'failed');
      failedDetails.push({
        feature: featureName,
        scenario: scenarioName,
        step: failedStep.name,
        error: failedStep.result.error_message
      });
    } else if (hasPendingStep) {
      pendingScenarios++;
    } else if (hasSkippedStep) {
      skippedScenarios++;
    } else {
      passedScenarios++;
    }
  });
});

// Exibir resumo
console.log('\n');
console.log('╔════════════════════════════════════════════════════════════╗');
console.log('║               RESUMO DOS TESTES CUCUMBER                  ║');
console.log('╚════════════════════════════════════════════════════════════╝');
console.log('');
console.log(`📊 Total de Cenários:    ${totalScenarios}`);
console.log(`✅ Cenários Aprovados:   ${passedScenarios} (${Math.round(passedScenarios/totalScenarios*100)}%)`);
console.log(`❌ Cenários Falhados:    ${failedScenarios}`);

if (pendingScenarios > 0) {
  console.log(`⏳ Cenários Pendentes:   ${pendingScenarios}`);
}

if (skippedScenarios > 0) {
  console.log(`⏭️  Cenários Pulados:     ${skippedScenarios}`);
}

console.log('');
console.log('════════════════════════════════════════════════════════════');

// Mostrar detalhes dos cenários falhados
if (failedScenarios > 0) {
  console.log('');
  console.log('❌ CENÁRIOS QUE FALHARAM:');
  console.log('');
  
  failedDetails.forEach((detail, index) => {
    console.log(`${index + 1}. ${detail.feature}`);
    console.log(`   Cenário: ${detail.scenario}`);
    console.log(`   Passo: ${detail.step}`);
    if (detail.error) {
      const errorLines = detail.error.split('\n').slice(0, 3);
      errorLines.forEach(line => console.log(`   ${line}`));
    }
    console.log('');
  });
  
  console.log('════════════════════════════════════════════════════════════');
}

// Exibir barra de progresso visual
console.log('');
const barLength = 50;
const passedBar = Math.round((passedScenarios / totalScenarios) * barLength);
const failedBar = Math.round((failedScenarios / totalScenarios) * barLength);
const pendingBar = Math.round((pendingScenarios / totalScenarios) * barLength);

let progressBar = '█'.repeat(passedBar);
progressBar += '░'.repeat(failedBar);
progressBar += '▒'.repeat(pendingBar);
progressBar += ' '.repeat(barLength - progressBar.length);

console.log(`Progresso: [${progressBar}]`);
console.log('           ✅ Aprovados  ❌ Falhados  ⏳ Pendentes');
console.log('');

// Status final
if (failedScenarios === 0 && pendingScenarios === 0) {
  console.log('🎉 TODOS OS TESTES PASSARAM! 🎉');
  process.exit(0);
} else if (pendingScenarios > 0) {
  console.log('⚠️  EXISTEM TESTES PENDENTES DE IMPLEMENTAÇÃO');
  process.exit(1);
} else {
  console.log('❌ EXISTEM TESTES FALHANDO!');
  process.exit(1);
}
