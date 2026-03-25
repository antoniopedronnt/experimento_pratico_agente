import { useState } from 'react';
import { RelatorioNotas, ResultadoAluno } from '../types';
import StudentGradeDetail from './StudentGradeDetail';
import './GradingReport.css';

interface GradingReportProps {
  relatorio: RelatorioNotas;
  onBack: () => void;
}

function GradingReport({ relatorio, onBack }: GradingReportProps) {
  const [selectedAluno, setSelectedAluno] = useState<ResultadoAluno | null>(null);
  const [sortField, setSortField] = useState<'nome' | 'nota'>('nota');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [filterText, setFilterText] = useState('');

  const handleSort = (field: 'nome' | 'nota') => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder(field === 'nota' ? 'desc' : 'asc');
    }
  };

  const getSortedAndFilteredResults = () => {
    let results = [...relatorio.resultados];

    // Filtrar
    if (filterText) {
      results = results.filter(r =>
        r.nome.toLowerCase().includes(filterText.toLowerCase()) ||
        r.cpf.includes(filterText)
      );
    }

    // Ordenar
    results.sort((a, b) => {
      const multiplier = sortOrder === 'asc' ? 1 : -1;
      if (sortField === 'nome') {
        return multiplier * a.nome.localeCompare(b.nome);
      } else {
        return multiplier * (a.notaFinal - b.notaFinal);
      }
    });

    return results;
  };

  const results = getSortedAndFilteredResults();

  const getNotaColor = (nota: number): string => {
    if (nota >= 70) return 'nota-alta';
    if (nota >= 50) return 'nota-media';
    return 'nota-baixa';
  };

  return (
    <>
      <div className="grading-report">
        <div className="report-header">
          <button onClick={onBack} className="btn btn-secondary">
            ← Nova Correção
          </button>
          <div className="header-info">
            <h1>📊 Relatório de Notas</h1>
            <div className="mode-badge">
              {relatorio.modoCorrecao === 'RIGOROSO' ? '⚡ Rigoroso' : '📈 Proporcional'}
            </div>
          </div>
        </div>

        <div className="statistics-grid">
          <div className="stat-card">
            <div className="stat-label">Total de Alunos</div>
            <div className="stat-value">{relatorio.estatisticas.totalAlunos}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Média da Turma</div>
            <div className={`stat-value ${getNotaColor(relatorio.estatisticas.media)}`}>
              {relatorio.estatisticas.media.toFixed(2)}
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Mediana</div>
            <div className="stat-value">{relatorio.estatisticas.mediana.toFixed(2)}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Maior Nota</div>
            <div className="stat-value nota-alta">{relatorio.estatisticas.maiorNota.toFixed(2)}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Menor Nota</div>
            <div className="stat-value nota-baixa">{relatorio.estatisticas.menorNota.toFixed(2)}</div>
          </div>
        </div>

        <div className="table-controls">
          <input
            type="text"
            placeholder="🔍 Filtrar por nome ou CPF..."
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            className="filter-input"
          />
        </div>

        <div className="results-table-container">
          <table className="results-table">
            <thead>
              <tr>
                <th onClick={() => handleSort('nome')} className="sortable">
                  Nome {sortField === 'nome' && (sortOrder === 'asc' ? '▲' : '▼')}
                </th>
                <th>CPF</th>
                <th>Prova Nº</th>
                <th>Questões Corretas</th>
                <th onClick={() => handleSort('nota')} className="sortable">
                  Nota Final {sortField === 'nota' && (sortOrder === 'asc' ? '▲' : '▼')}
                </th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {results.map((resultado, index) => {
                const questoesCorretas = resultado.questoes.filter(q => q.acertou).length;
                const totalQuestoes = resultado.questoes.length;

                return (
                  <tr key={index}>
                    <td className="student-name">{resultado.nome}</td>
                    <td className="cpf">{resultado.cpf}</td>
                    <td className="text-center">{resultado.numeroProva}</td>
                    <td className="text-center">
                      {questoesCorretas}/{totalQuestoes}
                    </td>
                    <td className="text-center">
                      <span className={`nota-badge ${getNotaColor(resultado.notaFinal)}`}>
                        {resultado.notaFinal.toFixed(2)}
                      </span>
                    </td>
                    <td className="text-center">
                      <button
                        onClick={() => setSelectedAluno(resultado)}
                        className="btn btn-small btn-detail"
                      >
                        📋 Detalhes
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {results.length === 0 && (
            <div className="no-results">
              Nenhum resultado encontrado para "{filterText}"
            </div>
          )}
        </div>
      </div>

      {selectedAluno && (
        <StudentGradeDetail
          aluno={selectedAluno}
          tipoIdentificacao={relatorio.tipoIdentificacao}
          onClose={() => setSelectedAluno(null)}
        />
      )}
    </>
  );
}

export default GradingReport;
