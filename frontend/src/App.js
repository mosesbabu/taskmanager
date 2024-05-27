import { BrowserRouter as Router, Route, Routes,Link } from 'react-router-dom';
import IssueForm from './components/IssueForm';
import IssueList from './components/IssueList';
import LoginForm from './components/LoginForm';

const App = () => {
  return (
    <Router>
         <header className="bg-indigo-600 text-white p-4">
          <h1 className="text-2xl">Issue Tracking App</h1>
          <nav className="mt-2">
            <Link to="/" className="mr-4">Submit Issue</Link>
            <Link to="/issues">View Issues</Link>
          </nav>
        </header>
      <Routes>
        <Route path="/" element={<IssueForm />} />
        <Route path="/issues" element={<IssueList />} />
        <Route path="/login" element={<LoginForm/>} />
      </Routes>
    </Router>
  );
};

export default App;
