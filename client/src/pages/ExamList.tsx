import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { examService, Exam } from '../services/examService';
import './ExamList.css';

function ExamList() {
  const [exams, setExams] = useState<Exam[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
