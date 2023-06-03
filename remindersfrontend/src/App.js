import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';

import { MdWbSunny, MdNightsStay } from 'react-icons/md';

// Pages & components
import Home from './pages/Home';
import Navbar from './components/Navbar';

function App() {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  useEffect(() => {
    const body = document.body;
    body.classList.remove('theme-light', 'theme-dark');
    body.classList.add(`theme-${theme}`);
  }, [theme]);

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Button variant="secondary" className="theme-toggle" onClick={toggleTheme}>
          {theme === 'light' ? <MdNightsStay /> : <MdWbSunny />}
        </Button>
        <Container>
          <Routes>
            <Route path="/" element={<Home theme={theme} />} />
          </Routes>
        </Container>
      </BrowserRouter>
    </div>
  );
}

export default App;
