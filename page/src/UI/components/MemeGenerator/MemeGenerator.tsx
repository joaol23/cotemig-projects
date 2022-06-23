import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { Container, Image, ImageFull, ColW6, ContainerFull } from './MemeGenerator.style';
import { Meme } from '../../../data/@types/MemesInterface';

const scrollToRef = (ref: any) => !ref ? '' : window.scrollTo(0, ref.current.offsetTop)

export function MemeGenerator() {
    const URL_MEMES = "https://api.imgflip.com/get_memes";
    const [memes, setDataMemes] = useState<Meme[]>()
    const [meme, setDataMeme] = useState<any>()
    const myRef = useRef(null)

    useEffect(() => {
        fetch(URL_MEMES)
            .then((res) => res.json())
            .then((data) => { setDataMemes(data.data.memes) });
    }, []);

    const highLightMeme = (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
        const idMeme = event.currentTarget.getAttribute('data-id');
        let memeChoose = !memes ? '' : memes.find(meme => meme.id === idMeme);
        setDataMeme(memeChoose);
        scrollToRef(myRef);
    }

    const createLegendMeme = (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
        const positionRect = event.currentTarget.getBoundingClientRect();
        const x = event.clientX - positionRect.left;
        const y = event.clientY - positionRect.top;
        console.log(x, y)
    }

    return (
        <Container>
            {
                !meme ? '' : (
                    <ContainerFull>
                        <ImageFull ref={myRef} onClick={createLegendMeme} src={meme.url}></ImageFull>
                    </ContainerFull>
                )
            }
            {
                !memes ? '' : memes.map(meme =>
                (
                    <ColW6 key={meme.id} data-id={meme.id} onClick={highLightMeme}>
                        <Image src={meme.url} style={{ color: 'black' }} />
                    </ColW6>
                ))
            }
        </Container>
    );
}