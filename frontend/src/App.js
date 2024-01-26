import { Route, Routes } from 'react-router-dom';
import './css/App.css';
import Nav from './components/Nav';
import Add from './Pages/Add';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Sign from './Pages/Sign';
function App() {
  return (
    <>
    <Nav/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<Add />} />
        <Route path="/l" element={<Login />} />
        <Route path="/s" element={<Sign />} />
      </Routes>
    </>
  );
}

export default App;

