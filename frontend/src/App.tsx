// App.tsx
import Home from './pages/Home';
import { AnalysisProvider } from './contexts/AnalysisContext';
import './styles/globals.css';

function App() {
  return (
    <AnalysisProvider>
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
        <Home />
      </div>
    </AnalysisProvider>
  );
}

export default App;
