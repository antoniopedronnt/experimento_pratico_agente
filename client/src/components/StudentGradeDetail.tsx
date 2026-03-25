import { ResultadoAluno } from '../types';
import './StudentGradeDetail.css';

interface StudentGradeDetailProps {
  aluno: ResultadoAluno;
  onClose: () => void;
}

function StudentGradeDetail({ aluno, onClose }: StudentGradeDetailProps) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content detail-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h2>📋 Detalhes da Correção</h2>
            <p className="student-info-line">
              <strong>{aluno.nome}</strong> - CPF: {aluno.cpf} - Prova: {aluno.numeroProva}
            </p>
          </div>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="modal-body">
          <div className="grade-summary">
            <div className="summary-item">
              <span className="label">Nota Final:</span>
              <span className="value grade">{aluno.notaFinal.toFixed(2)}</span>
            </div>
            <div className="summary-item">
              <span className="label">Questões Corretas:</span>
              <span className="value">{aluno.questoes.filter(q => q.acertou).length}/{aluno.questoes.length}</span>
            </div>
          </div>

          <h3>Questões:</h3>
          
          <div className="questions-list">
            {aluno.questoes.map((questao) => (
              <div key={questao.questao} className={`question-detail ${questao.acertou ? 'correct' : 'incorrect'}`}>
                <div className="question-header">
                  <span className="question-number">Questão {questao.questao}</span>
                  <span className={`status-badge ${questao.acertou ? 'correct' : 'incorrect'}`}>
                    {questao.acertou ? '✓ Correta' : '✗ Incorreta'}
                  </span>
                  <span className="pontuacao">{questao.pontuacao.toFixed(1)}pts</span>
                </div>

                <div className="question-body">
                  <div className="answer-row">
                    <span className="answer-label">Resposta do Aluno:</span>
                    <span className={`answer-value ${questao.acertou ? '' : 'wrong'}`}>
                      {questao.respostaAluno || '(vazio)'}
                    </span>
                  </div>
                  <div className="answer-row">
                    <span className="answer-label">Resposta Correta:</span>
                    <span className="answer-value correct">{questao.respostaCorreta}</span>
                  </div>
                  
                  {!questao.acertou && questao.pontuacao > 0 && (
                    <div className="partial-credit-note">
                      💡 Crédito parcial: {questao.pontuacao.toFixed(1)}% por acertos parciais
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="modal-footer">
          <button onClick={onClose} className="btn btn-primary">
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}

export default StudentGradeDetail;
