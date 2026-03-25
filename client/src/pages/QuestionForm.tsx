import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { questionService } from '../services/questionService';
import { AlternativeInput } from '../types';
import './QuestionForm.css';

function QuestionForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [enunciado, setEnunciado] = useState('');
  const [alternativas, setAlternativas] = useState<AlternativeInput[]>([
    { descricao: '', correta: false },
    { descricao: '', correta: false }
  ]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      loadQuestion(id);
    }
  }, [id]);

  const loadQuestion = async (questionId: string) => {
    try {
      const question = await questionService.getById(questionId);
      setEnunciado(question.enunciado);
      setAlternativas(question.alternativas.map(alt => ({
        descricao: alt.descricao,
        correta: alt.correta
      })));
    } catch (err) {
      alert('Erro ao carregar questao');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (id) {
        await questionService.update(id, { enunciado, alternativas });
      } else {
        await questionService.create({ enunciado, alternativas });
      }
      navigate('/');
    } catch (err: any) {
      alert(err.response?.data?.error || 'Erro ao salvar questao');
    } finally {
      setLoading(false);
    }
  };

  const addAlternativa = () => {
    setAlternativas([...alternativas, { descricao: '', correta: false }]);
  };

  const removeAlternativa = (index: number) => {
    setAlternativas(alternativas.filter((_, i) => i !== index));
  };

  const updateAlternativa = (index: number, field: 'descricao' | 'correta', value: any) => {
    const updated = [...alternativas];
    updated[index] = { ...updated[index], [field]: value };
    setAlternativas(updated);
  };

  return (
    <div className="question-form">
      <h2>{id ? 'Editar Questao' : 'Nova Questao'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Enunciado:</label>
          <textarea
            value={enunciado}
            onChange={(e) => setEnunciado(e.target.value)}
            required
            rows={3}
          />
        </div>
        <div className="form-group">
          <label>Alternativas:</label>
          {alternativas.map((alt, index) => (
            <div key={index} className="alternativa-item">
              <input
                type="text"
                value={alt.descricao}
                onChange={(e) => updateAlternativa(index, 'descricao', e.target.value)}
                placeholder={`Alternativa ${index + 1}`}
                required
              />
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={alt.correta}
                  onChange={(e) => updateAlternativa(index, 'correta', e.target.checked)}
                />
                Correta
              </label>
              {alternativas.length > 2 && (
                <button type="button" onClick={() => removeAlternativa(index)} className="btn-remove">
                  Remover
                </button>
              )}
            </div>
          ))}
          <button type="button" onClick={addAlternativa} className="btn btn-add">
            + Adicionar Alternativa
          </button>
        </div>
        <div className="form-actions">
          <button type="submit" disabled={loading} className="btn btn-primary">
            {loading ? 'Salvando...' : 'Salvar'}
          </button>
          <button type="button" onClick={() => navigate('/')} className="btn btn-secondary">
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

export default QuestionForm;
