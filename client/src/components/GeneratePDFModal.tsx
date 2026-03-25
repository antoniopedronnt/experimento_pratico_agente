import { useState } from 'react';
import { pdfService, PDFGenerationRequest } from '../services/pdfService';
import './GeneratePDFModal.css';

interface GeneratePDFModalProps {
  examId: string;
  examTitle: string;
  onClose: () => void;
}

function GeneratePDFModal({ examId, examTitle, onClose }: GeneratePDFModalProps) {
  const [quantidade, setQuantidade] = useState(1);
  const [disciplina, setDisciplina] = useState('');
  const [professor, setProfessor] = useState('');
  const [data, setData] = useState(new Date().toISOString().split('T')[0]);
  const [instituicao, setInstituicao] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const request: PDFGenerationRequest = {
        quantidade,
        header: {
          disciplina,
          professor,
          data,
          ...(instituicao && { instituicao })
        }
      };

      const blob = await pdfService.generatePDFs(examId, request);

      // Criar URL do blob e fazer download
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `provas-${examTitle.replace(/\s+/g, '_')}.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      // Fechar modal após sucesso
      setTimeout(() => onClose(), 500);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Erro ao gerar PDFs');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>📄 Gerar PDFs da Prova</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit} className="pdf-form">
          <div className="form-info">
            <p><strong>Prova:</strong> {examTitle}</p>
            <p className="info-text">
              Serão gerados {quantidade} {quantidade === 1 ? 'PDF' : 'PDFs'} com questões e 
              alternativas em ordem aleatória + arquivo CSV com gabaritos.
            </p>
          </div>

          <div className="form-group">
            <label>Quantidade de Provas:</label>
            <input
              type="number"
              value={quantidade}
              onChange={(e) => setQuantidade(parseInt(e.target.value))}
              min={1}
              max={100}
              required
            />
            <small>Máximo: 100 provas</small>
          </div>

          <div className="form-divider">
            <span>Informações do Cabeçalho</span>
          </div>

          <div className="form-group">
            <label>Disciplina: *</label>
            <input
              type="text"
              value={disciplina}
              onChange={(e) => setDisciplina(e.target.value)}
              placeholder="Ex: Matemática"
              required
            />
          </div>

          <div className="form-group">
            <label>Professor: *</label>
            <input
              type="text"
              value={professor}
              onChange={(e) => setProfessor(e.target.value)}
              placeholder="Ex: Prof. João Silva"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Data: *</label>
              <input
                type="date"
                value={data}
                onChange={(e) => setData(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Instituição:</label>
              <input
                type="text"
                value={instituicao}
                onChange={(e) => setInstituicao(e.target.value)}
                placeholder="Ex: Escola ABC"
              />
            </div>
          </div>

          {error && (
            <div className="error-message">
              ❌ {error}
            </div>
          )}

          <div className="form-actions">
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary"
            >
              {loading ? '⏳ Gerando...' : '✅ Gerar PDFs'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="btn btn-secondary"
              disabled={loading}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default GeneratePDFModal;
