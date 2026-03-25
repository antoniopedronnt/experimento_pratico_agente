import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { examService } from '../services/examService';
import { correctionService } from '../services/correctionService';
import { ModoCorrecao, RelatorioNotas } from '../types';
import GradingReport from '../components/GradingReport';
import './ExamCorrection.css';

function ExamCorrection() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [examTitle, setExamTitle] = useState('');
  const [gabaritoFile, setGabaritoFile] = useState<File | null>(null);
  const [respostasFile, setRespostasFile] = useState<File | null>(null);
  const [modoCorrecao, setModoCorrecao] = useState<ModoCorrecao>(ModoCorrecao.RIGOROSO);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [relatorio, setRelatorio] = useState<RelatorioNotas | null>(null);

  useEffect(() => {
    if (id) {
      loadExam(id);
    }
  }, [id]);

  const loadExam = async (examId: string) => {
    try {
      const exam = await examService.getById(examId);
      setExamTitle(exam.titulo);
    } catch (err) {
      setError('Erro ao carregar prova');
      console.error(err);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, tipo: 'gabarito' | 'respostas') => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.name.endsWith('.csv')) {
        setError('Apenas arquivos CSV são permitidos');
        return;
      }
      if (tipo === 'gabarito') {
        setGabaritoFile(file);
      } else {
        setRespostasFile(file);
      }
      setError(null);
    }
  };

  const readFileContent = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target?.result as string);
      reader.onerror = reject;
      reader.readAsText(file);
    });
  };

  const handleCorrect = async () => {
    if (!id || !gabaritoFile || !respostasFile) {
      setError('Todos os campos são obrigatórios');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const gabaritoCSV = await readFileContent(gabaritoFile);
      const respostasCSV = await readFileContent(respostasFile);

      const result = await correctionService.correctExam(
        id,
        gabaritoCSV,
        respostasCSV,
        modoCorrecao
      );

      setRelatorio(result);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Erro ao corrigir provas');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setGabaritoFile(null);
    setRespostasFile(null);
    setRelatorio(null);
    setError(null);
  };

  if (relatorio) {
    return <GradingReport relatorio={relatorio} onBack={handleReset} />;
  }

  return (
    <div className="exam-correction-page">
      <div className="correction-header">
        <button onClick={() => navigate('/exams')} className="btn btn-secondary">
          ← Voltar
        </button>
        <h1>📝 Correção de Provas</h1>
      </div>

      <div className="correction-container">
        <div className="exam-info">
          <h2>{examTitle}</h2>
          <p className="subtitle">Faça o upload dos arquivos CSV para correção automática</p>
        </div>

        <div className="correction-form">
          <div className="form-section">
            <h3>1. Upload do Gabarito</h3>
            <p className="help-text">CSV gerado na criação das provas (Prova,Questao_1,Questao_2,...)</p>
            <div className="file-input-wrapper">
              <input
                type="file"
                accept=".csv"
                onChange={(e) => handleFileChange(e, 'gabarito')}
                id="gabarito-file"
                className="file-input"
              />
              <label htmlFor="gabarito-file" className="file-label">
                {gabaritoFile ? `✓ ${gabaritoFile.name}` : '📄 Escolher arquivo CSV'}
              </label>
            </div>
          </div>

          <div className="form-section">
            <h3>2. Upload das Respostas dos Alunos</h3>
            <p className="help-text">CSV com formato: Nome,CPF,NumeroProva,Questao_1,Questao_2,...</p>
            <div className="file-input-wrapper">
              <input
                type="file"
                accept=".csv"
                onChange={(e) => handleFileChange(e, 'respostas')}
                id="respostas-file"
                className="file-input"
              />
              <label htmlFor="respostas-file" className="file-label">
                {respostasFile ? `✓ ${respostasFile.name}` : '📄 Escolher arquivo CSV'}
              </label>
            </div>
          </div>

          <div className="form-section">
            <h3>3. Modo de Correção</h3>
            <div className="radio-group">
              <label className={`radio-option ${modoCorrecao === ModoCorrecao.RIGOROSO ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="modoCorrecao"
                  value={ModoCorrecao.RIGOROSO}
                  checked={modoCorrecao === ModoCorrecao.RIGOROSO}
                  onChange={(e) => setModoCorrecao(e.target.value as ModoCorrecao)}
                />
                <div className="radio-content">
                  <strong>Rigoroso (All-or-Nothing)</strong>
                  <p>Qualquer erro na questão resulta em nota zero para ela</p>
                </div>
              </label>

              <label className={`radio-option ${modoCorrecao === ModoCorrecao.PROPORCIONAL ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="modoCorrecao"
                  value={ModoCorrecao.PROPORCIONAL}
                  checked={modoCorrecao === ModoCorrecao.PROPORCIONAL}
                  onChange={(e) => setModoCorrecao(e.target.value as ModoCorrecao)}
                />
                <div className="radio-content">
                  <strong>Proporcional (Partial Credit)</strong>
                  <p>Nota proporcional ao percentual de alternativas corretas</p>
                </div>
              </label>
            </div>
          </div>

          {error && (
            <div className="error-message">
              ❌ {error}
            </div>
          )}

          <div className="form-actions">
            <button
              onClick={handleCorrect}
              disabled={loading || !gabaritoFile || !respostasFile}
              className="btn btn-primary btn-large"
            >
              {loading ? '⏳ Corrigindo...' : '✅ Corrigir Provas'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExamCorrection;
