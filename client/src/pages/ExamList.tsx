import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { examService, Exam } from '../services/examService';
import './ExamList.css';

function ExamList() {
  const [exams, setExams] = useState<Exam[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [generatingResponses, setGeneratingResponses] = useState<string | null>(null);

  useEffect(() => {
    loadExams();
  }, []);

  const loadExams = async () => {
    try {
      setLoading(true);
      const data = await examService.getAll();
      setExams(data);
      setError(null);
    } catch (err) {
      setError('Erro ao carregar provas');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Tem certeza que deseja remover esta prova?')) return;
    try {
      await examService.delete(id);
      await loadExams();
    } catch (err) {
      alert('Erro ao remover prova');
    }
  };

  const handleGenerateResponses = async (examId: string, examTitle: string) => {
    const numAlunos = prompt('Quantos alunos simular? (1-100)', '10');
    if (!numAlunos) return;
    
    const numProvas = prompt('Quantas versões de prova? (1-50)', '5');
    if (!numProvas) return;

    const numAlunosInt = parseInt(numAlunos);
    const numProvasInt = parseInt(numProvas);

    if (isNaN(numAlunosInt) || numAlunosInt < 1 || numAlunosInt > 100) {
      alert('Número de alunos deve estar entre 1 e 100');
      return;
    }
    if (isNaN(numProvasInt) || numProvasInt < 1 || numProvasInt > 50) {
      alert('Número de provas deve estar entre 1 e 50');
      return;
    }

    try {
      setGeneratingResponses(examId);
      const blob = await examService.generateResponses(examId, numAlunosInt, numProvasInt);
      
      // Download do arquivo
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `respostas_${examTitle.replace(/[^a-zA-Z0-9]/g, '_')}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      alert('CSV de respostas gerado com sucesso!');
    } catch (err) {
      alert('Erro ao gerar respostas');
      console.error(err);
    } finally {
      setGeneratingResponses(null);
    }
  };

  if (loading) return <div className="loading">Carregando...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="exam-list">
      <div className="exam-list-header">
        <h2>Provas Cadastradas</h2>
        <Link to="/exams/new" className="btn btn-primary">+ Nova Prova</Link>
      </div>
      
      {exams.length === 0 ? (
        <p className="empty-message">Nenhuma prova cadastrada.</p>
      ) : (
        <div className="exams">
          {exams.map(exam => (
            <div key={exam.id} className="exam-card">
              <div className="exam-card-header">
                <h3>{exam.titulo}</h3>
                <span className={`badge badge-${exam.tipoIdentificacao.toLowerCase()}`}>
                  {exam.tipoIdentificacao === 'LETRAS' ? 'Letras (A, B, C...)' : 'Potências (1, 2, 4...)'}
                </span>
              </div>
              
              <div className="exam-info">
                <p><strong>Questões:</strong> {exam.questoes.length}</p>
                <p><strong>Criada em:</strong> {new Date(exam.criadaEm).toLocaleDateString('pt-BR')}</p>
              </div>

              <div className="actions">
                <Link to={`/exams/${exam.id}/preview`} className="btn btn-view">
                  👁️ Visualizar
                </Link>
                <button 
                  onClick={() => handleGenerateResponses(exam.id, exam.titulo)}
                  className="btn btn-generate-responses"
                  disabled={generatingResponses === exam.id}
                >
                  {generatingResponses === exam.id ? '⏳ Gerando...' : '📝 Gerar Respostas'}
                </button>
                <Link to={`/exams/${exam.id}/correct`} className="btn btn-correct">
                  ✅ Corrigir
                </Link>
                <Link to={`/exams/${exam.id}/edit`} className="btn btn-edit">
                  ✏️ Editar
                </Link>
                <button onClick={() => handleDelete(exam.id)} className="btn btn-delete">
                  🗑️ Remover
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ExamList;
