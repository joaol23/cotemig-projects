import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Files } from "./UI/components/Files/Files";

function App() {
  const [files, setData] = React.useState();

  React.useEffect(() => {
    fetch("/arquivos-estados")
      .then((res) => res.json())
      .then((data) => {setData(data.files);});
  }, []);
  return (
    <div className="App">
      <header className="App-header aa">
        <Files files={files} />
      </header>
    </div>
  );
}

export default App;
