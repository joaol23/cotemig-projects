import { useEffect, useState } from 'react';
import { Container, Image, ImageFull, ColW6, ContainerFull } from './MemeGenerator.style';
import { Meme } from '../../../data/@types/MemesInterface';


export function MemeGenerator() {
    const URL_MEMES = "https://api.imgflip.com/get_memes";
    const [memes, setDataMemes] = useState<Meme[]>()
    const [meme, setDataMeme] = useState<any>()

    useEffect(() => {
        fetch(URL_MEMES)
            .then((res) => res.json())
            .then((data) => { setDataMemes(data.data.memes) });
    }, []);

    const teste = (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
        const idMeme = event.currentTarget.getAttribute('data-id');
        let memeChoose = !memes ? '' : memes.find(meme => meme.id === idMeme);
        setDataMeme(memeChoose);
    }

    return (
        <Container>
            {
                !meme ? '' : (<ContainerFull>
                    <ImageFull src={meme.url}></ImageFull>
                </ContainerFull>)
            }
            {
                !memes ? '' : memes.map(meme =>
                (
                    <ColW6 key={meme.id} data-id={meme.id} onClick={teste}>
                        <Image src={meme.url} style={{ color: 'black' }} />
                    </ColW6>
                ))
            }
        </Container>
    );
}