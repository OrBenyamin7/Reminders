import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route,Navigate } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';
import { MdWbSunny, MdNightsStay } from 'react-icons/md';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { useAuthContext } from './hooks/useAuthContext'


// Pages & components
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Category from './components/Category'


function App() {
  const { user } = useAuthContext()
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
        <Category/>
        <Button variant="secondary" className="theme-toggle" onClick={toggleTheme}>
          {theme === 'light' ? <MdNightsStay /> : <MdWbSunny />}
        </Button>
        <Container>
          <Routes>
          <Route 
              path="/" 
              element={user ? <Home /> : <Navigate to="/login" />} 
            />
          {/* <Route path="/" element={<Home theme={theme} />} />  */}
          </Routes>
          <Routes>
          <Route 
              path="/signup" 
              element={!user ? <Signup /> : <Navigate to="/" />}   />
          </Routes>
          <Routes>
          <Route 
              path="/login" 
              element={!user ? <Login /> : <Navigate to="/" />} 
            />
          </Routes>
        </Container>
      </BrowserRouter>
    </div>
  );

   }

export default App;
