import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { questionService } from '../services/questionService';
import { Question } from '../types';
import './QuestionList.css';

function QuestionList() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadQuestions();
  }, []);

  const loadQuestions = async () => {
    try {
      setLoading(true);
      const data = await questionService.getAll();
      setQuestions(data);
      setError(null);
    } catch (err) {
      setError('Erro ao carregar questoes');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Tem certeza que deseja remover esta questao?')) return;
    try {
      await questionService.delete(id);
      await loadQuestions();
    } catch (err) {
      alert('Erro ao remover questao');
    }
  };

  if (loading) return <div className="loading">Carregando...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="question-list">
      <h2>Questoes Cadastradas</h2>
      {questions.length === 0 ? (
        <p className="empty-message">Nenhuma questao cadastrada.</p>
      ) : (
        <div className="questions">
          {questions.map(question => (
            <div key={question.id} className="question-card">
              <h3>{question.enunciado}</h3>
              <ul>
                {question.alternativas.map(alt => (
                  <li key={alt.id} className={alt.correta ? 'correct' : ''}>
                    {alt.descricao}
                  </li>
                ))}
              </ul>
              <div className="actions">
                <Link to={`/edit/${question.id}`} className="btn btn-edit">Editar</Link>
                <button onClick={() => handleDelete(question.id)} className="btn btn-delete">Remover</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default QuestionList;
