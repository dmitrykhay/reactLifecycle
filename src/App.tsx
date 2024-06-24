import './App.css';

import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Watches } from './components/Watches';
import { Crud } from './components/CRUD/fronted';
import { Chat } from './components/Chat/fronted';


function App() {

  return (
    <>      
      <Router>
        <nav>
          <ul className="nav-ul">
            <li className="nav-ul-li"><Link to="/">Главная</Link></li>
            <li className="nav-ul-li"><Link to="/watches">Мировые часы</Link></li>
            <li className="nav-ul-li"><Link to="/crud">CRUD</Link></li>
            <li className="nav-ul-li"><Link to="/chat">Чат</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={
            <div className="wrap">
              <h1>Задачи по теме "Жизненный цикл и работа с HTTP"</h1>
            </div>
          } />
          <Route path="/watches" element={<Watches />} />
          <Route path="/crud" element={<Crud />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
