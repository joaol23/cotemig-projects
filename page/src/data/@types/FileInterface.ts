export interface FileInterface {
    fileName: string,
    fileState: State,
    countCities: number,
    type: string
}

interface State {
    ID: string,
    Sigla: string,
    Nome: string
}