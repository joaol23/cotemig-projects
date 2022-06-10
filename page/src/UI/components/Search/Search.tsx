import { Search, TextFilter, FilterContainer } from "./Search.style";



export function SearchComponent({ onChange, files }: any) {

    function getTestBabi(event: React.FormEvent<HTMLInputElement>) {
        let valueCurrent = event.currentTarget.value;
        if (valueCurrent !== '') {
            let newFiles = files.filter((file: any) => file.fileState.Sigla.includes(valueCurrent))
            console.log(newFiles);
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