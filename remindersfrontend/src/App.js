import { BrowserRouter, Routes, Route,Navigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { useAuthContext } from './hooks/useAuthContext'


// Pages & components
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Category from './components/Category'


function App() {
  const { user } = useAuthContext()

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Category/>
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
