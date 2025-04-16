// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Learn from './pages/LearnPage';
import Compiler from './pages/Compiler';
import Labs from './pages/Lab';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/learn" element={<Learn />} />
        <Route path="/c-compiler" element={<Compiler />} />
        <Route path="/c-Labs" element={<Labs />} />
      </Routes>
    </Router>
  );
}

export default App;