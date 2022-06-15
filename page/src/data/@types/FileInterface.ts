export interface FileInterface {
    fileName: string,
    fileState: State,
    countCities: number,
    type: string,
    order: string,
}

interface State {
    ID: string,
    Sigla: string,
    Nome: string,
    Capital: string,
    Zone: string,
}

export type City = {
    ID: string,
    Nome: string,
    Estado: number
}