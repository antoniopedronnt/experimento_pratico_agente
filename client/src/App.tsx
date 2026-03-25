import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import QuestionList from './pages/QuestionList';
import QuestionForm from './pages/QuestionForm';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <header className="app-header">
          <h1>Gerenciador de Questoes de Provas</h1>
          <nav>
            <Link to="/">Questoes</Link>
            <Link to="/new">Nova Questao</Link>
          </nav>
        </header>
        <main className="app-main">
          <Routes>
            <Route path="/" element={<QuestionList />} />
            <Route path="/new" element={<QuestionForm />} />
            <Route path="/edit/:id" element={<QuestionForm />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
