import { Outlet } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="header">
        Notes App
      </header>
      <div className='details'>
        <Outlet />
      </div>
    </div>
  );
}

export default App;
