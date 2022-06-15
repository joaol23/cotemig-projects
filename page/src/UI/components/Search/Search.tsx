import { Search, TextFilter, FilterContainer } from "./Search.style";
import { TextService } from '../../../data/services/Text/Text';

type SearchProps = {
    files?: any[],
    onChange: (newData?: any[]) => void,
    options?: any
}

export function SearchComponent({ onChange, files, options }: SearchProps) {

    function getTestBabi(event: React.FormEvent<HTMLInputElement>) {
        let valueCurrent = TextService.removeAccent(event.currentTarget.value.toUpperCase());
        if (valueCurrent !== '') {
            let newData = !files ? [] : files.filter((data: any) => makeCheckSearch(data, valueCurrent));
            onChange(newData);
            return;
        }
        onChange(files);
    }

    const makeCheckSearch = (data: any, search: string): boolean => {
        let check = false, checks = [];
        if (options) {
            for (const option of options) {
                checks.push(checkEachItemFilter(data, search, option));
            }
            check = checks.some(eachCheck => eachCheck === true);
        }
        return check;
    }

    const checkEachItemFilter = (data: any, search: string, option: string | Array<string>): boolean => {
        if (Array.isArray(option)) {
            let teste = option[0];
            let teste2 = option[1];
            return TextService.removeAccent(data[teste][teste2].toUpperCase()).includes(search)
        }
        return TextService.removeAccent(data[option].toUpperCase()).includes(search);
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