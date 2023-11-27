import logo from './logo.svg';
import './App.css';
import {Route, BrowserRouter as Router, Routes} from "react-router-dom";
import Home from './pages/Home';
import { GameProvider } from './hooks/GameContext';

function App() {
  return (
    <GameProvider>
      <Router>  
        <Routes>       
          <Route path={"/"} element={<Home/>}/>
        </Routes>
      </Router>
    </GameProvider>
  )
}

export default App;
