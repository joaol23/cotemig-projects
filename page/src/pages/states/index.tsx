import React, { useState } from 'react';
import { Files } from "../../UI/components/Files";
import { SearchComponent } from "../../UI/components/Search";
import { FileInterface } from "../../data/@types/FileInterface";
import { Container } from './style';


export function FilesPage() {
  const [files, setDataFiles] = useState<FileInterface[]>();
  const [filesDataBase, setDatafilesDataBase] = React.useState<FileInterface[]>();

  React.useEffect(() => {
    fetch("/arquivos-estados")
      .then((res) => res.json())
      .then((data) => { setDataFiles(data.files); setDatafilesDataBase(data.files); });
  }, []);

  function changeValueFiles(newValue?: FileInterface[]): void {    
    setDataFiles(() => newValue);
  }

  return (
    <Container>
      <SearchComponent onChange={changeValueFiles} files={filesDataBase} options={['fileName', ['fileState', 'Sigla'], ['fileState', 'Nome'], ['fileState', 'Capital'], ['fileState', 'Zone']]} />
      <Files changeDataFiles={changeValueFiles} files={files} />
    </Container>
  );
}