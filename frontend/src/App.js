import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import IssueForm from './components/IssueForm'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/issueform" element={<IssueForm />} />
      </Routes>
    </Router>
  );
}

export default App;
