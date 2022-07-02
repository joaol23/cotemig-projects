import './App.css';
import { Maps } from '../Routes';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <div className="App">
      <header className="App-header aa">
        <ToastContainer autoClose={2000}/>
        <Maps />
      </header>
    </div>
  );
}

export default App;
