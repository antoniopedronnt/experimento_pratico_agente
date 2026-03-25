import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { examService, TipoIdentificacao } from '../services/examService';
import { questionService } from '../services/questionService';
import { Question } from '../types';
import './ExamForm.css';

function ExamForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [titulo, setTitulo] = useState('');
  const [questoesSelecionadas, setQuestoesSelecionadas] = useState<string[]>([]);
  const [tipoIdentificacao, setTipoIdentificacao] = useState<TipoIdentificacao>(TipoIdentificacao.LETRAS);
  const [questoesDisponiveis, setQuestoesDisponiveis] = useState<Question[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingQuestions, setLoadingQuestions] = useState(true);

  useEffect(() => {
    loadQuestions();
    if (id) {
      loadExam(id);
    }
  }, [id]);

  const loadQuestions = async () => {
    try {
      setLoadingQuestions(true);
      const questions = await questionService.getAll();
      setQuestoesDisponiveis(questions);
    } catch (err) {
      alert('Erro ao carregar questões');
    } finally {
      setLoadingQuestions(false);
    }
  };

  const loadExam = async (examId: string) => {
    try {
      const exam = await examService.getById(examId);
      setTitulo(exam.titulo);
      setQuestoesSelecionadas(exam.questoes);
      setTipoIdentificacao(exam.tipoIdentificacao);
    } catch (err) {
      alert('Erro ao carregar prova');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (questoesSelecionadas.length === 0) {
      alert('Selecione pelo menos uma questão');
      return;
    }

    setLoading(true);
    try {
      if (id) {
        await examService.update(id, { titulo, questoes: questoesSelecionadas, tipoIdentificacao });
      } else {
        await examService.create({ titulo, questoes: questoesSelecionadas, tipoIdentificacao });
      }
      navigate('/exams');
    } catch (err: any) {
      alert(err.response?.data?.error || 'Erro ao salvar prova');
    } finally {
      setLoading(false);
    }
  };

  const toggleQuestao = (questionId: string) => {
    setQuestoesSelecionadas(prev => 
      prev.includes(questionId)
        ? prev.filter(id => id !== questionId)
        : [...prev, questionId]
    );
  };

  if (loadingQuestions) {
    return <div className="loading">Carregando questões...</div>;
  }

  return (
    <div className="exam-form">
      <h2>{id ? 'Editar Prova' : 'Nova Prova'}</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Título da Prova:</label>
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            placeholder="Ex: Prova de Matemática - 1º Bimestre"
            required
          />
        </div>

        <div className="form-group">
          <label>Tipo de Identificação das Alternativas:</label>
          <div className="radio-group">
            <label className="radio-label">
              <input
                type="radio"
                value={TipoIdentificacao.LETRAS}
                checked={tipoIdentificacao === TipoIdentificacao.LETRAS}
                onChange={(e) => setTipoIdentificacao(e.target.value as TipoIdentificacao)}
              />
              <div className="radio-content">
                <strong>Letras (A, B, C, D...)</strong>
                <p>Aluno indica as letras das alternativas corretas</p>
              </div>
            </label>
            
            <label className="radio-label">
              <input
                type="radio"
                value={TipoIdentificacao.POTENCIAS}
                checked={tipoIdentificacao === TipoIdentificacao.POTENCIAS}
                onChange={(e) => setTipoIdentificacao(e.target.value as TipoIdentificacao)}
              />
              <div className="radio-content">
                <strong>Potências (1, 2, 4, 8, 16...)</strong>
                <p>Aluno indica a soma das alternativas corretas</p>
              </div>
            </label>
          </div>
        </div>

        <div className="form-group">
          <label>Questões da Prova ({questoesSelecionadas.length} selecionadas):</label>
          
          {questoesDisponiveis.length === 0 ? (
            <p className="empty-message">
              Nenhuma questão cadastrada. <a href="/new">Cadastre questões primeiro</a>.
            </p>
          ) : (
            <div className="questions-list">
              {questoesDisponiveis.map((question, index) => (
                <div key={question.id} className="question-item">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={questoesSelecionadas.includes(question.id)}
                      onChange={() => toggleQuestao(question.id)}
                    />
                    <div className="question-content">
                      <strong>Questão {index + 1}:</strong> {question.enunciado}
                      <div className="alternatives-preview">
                        {question.alternativas.map((alt, altIndex) => (
                          <span key={alt.id} className={alt.correta ? 'correct' : ''}>
                            {String.fromCharCode(65 + altIndex)}) {alt.descricao}
                          </span>
                        ))}
                      </div>
                    </div>
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="form-actions">
          <button type="submit" disabled={loading} className="btn btn-primary">
            {loading ? 'Salvando...' : 'Salvar Prova'}
          </button>
          <button type="button" onClick={() => navigate('/exams')} className="btn btn-secondary">
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

export default ExamForm;
