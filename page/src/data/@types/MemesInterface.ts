export interface Meme {
    id: string,
    name: string,
    url: string
}

export interface CaptionTextMeme {
    id: number,
    text: string,
    idImage: number,
    position: positionText,
    color: string,
    fontSize: number,
}

type positionText = {
    x: number,
    y: number
}
