import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import QuestionList from './pages/QuestionList';
import QuestionForm from './pages/QuestionForm';
import ExamList from './pages/ExamList';
import ExamForm from './pages/ExamForm';
import ExamPreview from './pages/ExamPreview';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <header className="app-header">
          <h1>📝 Gerenciador de Questões e Provas</h1>
          <nav>
            <Link to="/">Questões</Link>
            <Link to="/new">Nova Questão</Link>
            <Link to="/exams">Provas</Link>
            <Link to="/exams/new">Nova Prova</Link>
          </nav>
        </header>
        <main className="app-main">
          <Routes>
            {/* Rotas de Questões */}
            <Route path="/" element={<QuestionList />} />
            <Route path="/new" element={<QuestionForm />} />
            <Route path="/edit/:id" element={<QuestionForm />} />
            
            {/* Rotas de Provas */}
            <Route path="/exams" element={<ExamList />} />
            <Route path="/exams/new" element={<ExamForm />} />
            <Route path="/exams/:id/edit" element={<ExamForm />} />
            <Route path="/exams/:id/preview" element={<ExamPreview />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
