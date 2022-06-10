import React from 'react';
import { Files } from "../Files/Files";
import { SearchComponent } from "../Search/Search";
import { FileInterface } from "../../../data/@types/FileInterface";
import { Container } from './FilesHome.style';


export function FilesPage() {
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
    <Container>
      <SearchComponent onChange={changeValueFiles} files={filesDataBase} />
      <Files files={files} />
    </Container>
  );
}
