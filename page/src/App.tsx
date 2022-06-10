import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Files } from "./UI/components/Files/Files";
import { SearchComponent } from "./UI/components/Search/Search";
import { FileInterface } from "./data/@types/FileInterface";


function App() {
  const [files, setDataFiles] = React.useState<FileInterface[]>();
  const [filesDataBase, setDatafilesDataBase] = React.useState<FileInterface[]>();

  React.useEffect(() => {
    fetch("/arquivos-estados")
      .then((res) => res.json())
      .then((data) => { setDataFiles(data.files); setDatafilesDataBase(data.files); });
  }, []);

  const changeValueFiles = (newValue: FileInterface[]) => {
    setDataFiles(newValue);
  }

  return (
    <div className="App">
      <header className="App-header aa">
        <SearchComponent onChange={changeValueFiles} files={filesDataBase} />
        <Files files={files} />
      </header>
    </div>
  );
}

export default App;
