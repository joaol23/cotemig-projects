import { Search, TextFilter, FilterContainer } from "./Search.style";
import { FileInterface } from "../../../data/@types/FileInterface";

type SearchProps = {
    files?: FileInterface[],
    onChange: (newValue?: FileInterface[]) => void,
}

export function SearchComponent({ onChange, files }: SearchProps) {

    function getTestBabi(event: React.FormEvent<HTMLInputElement>) {
        let valueCurrent = event.currentTarget.value.toUpperCase();
        if (valueCurrent !== '') {
            let newFiles = !files ? [] : files.filter((file: any) => file.fileState.Sigla.toUpperCase().includes(valueCurrent));
            onChange(newFiles);
            return;
        }
        onChange(files);
    }

    return (
        <div>
            <div>
                <TextFilter>Visualize os arquivos aqui</TextFilter>
            </div>
            <FilterContainer>
                <TextFilter>Filtre por:</TextFilter>
                <Search type="text" onChange={getTestBabi} />
            </FilterContainer>
        </div>
    )
}