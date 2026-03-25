import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { examService, ExamPreview } from '../services/examService';
import './ExamPreview.css';

function ExamPreviewPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [preview, setPreview] = useState<ExamPreview | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      loadPreview(id);
    }
  }, [id]);

  const loadPreview = async (examId: string) => {
    try {
      setLoading(true);
      const data = await examService.getPreview(examId);
      setPreview(data);
      setError(null);
    } catch (err) {
      setError('Erro ao carregar preview da prova');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (loading) return <div className="loading">Carregando preview...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!preview) return <div className="error">Prova não encontrada</div>;

  return (
    <div className="exam-preview-page">
      <div className="preview-actions no-print">
        <button onClick={() => navigate('/exams')} className="btn btn-secondary">
          ← Voltar
        </button>
        <button onClick={handlePrint} className="btn btn-primary">
          🖨️ Imprimir
        </button>
      </div>

      <div className="exam-preview-content">
        <header className="exam-header">
          <h1>{preview.titulo}</h1>
          <div className="exam-meta">
            <p><strong>Tipo:</strong> {preview.tipoIdentificacao === 'LETRAS' ? 'Identificação por Letras' : 'Identificação por Potências de 2'}</p>
            <p><strong>Total de questões:</strong> {preview.questoesCompletas.length}</p>
          </div>
        </header>

        <div className="student-info">
          <div className="info-field">
            <label>Nome:</label>
            <div className="underline"></div>
          </div>
          <div className="info-field">
            <label>Data:</label>
            <div className="underline short"></div>
          </div>
        </div>

        <div className="questions">
          {preview.questoesCompletas.map((questao) => (
            <div key={questao.ordem} className="question">
              <h3>Questão {questao.ordem}</h3>
              <p className="enunciado">{questao.enunciado}</p>
              
              <div className="alternatives">
                {questao.alternativas.map((alternativa) => (
                  <div key={alternativa.identificador} className="alternative">
                    <span className="identifier">
                      ({alternativa.identificador})
                    </span>
                    <span className="description">
                      {alternativa.descricao}
                    </span>
                  </div>
                ))}
              </div>

              <div className="answer-space">
                <label>{preview.espacoResposta}</label>
              </div>
            </div>
          ))}
        </div>

        <footer className="exam-footer">
          <p>Boa prova!</p>
        </footer>
      </div>
    </div>
  );
}

export default ExamPreviewPage;
