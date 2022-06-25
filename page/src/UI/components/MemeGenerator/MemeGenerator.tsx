import { useEffect, useRef, useState } from 'react';
import { Container, Image, ImageFull, ColW6, ContainerFull, ContainerImage, LegendMeme, ModalBody } from './MemeGenerator.style';
import { Meme } from '../../../data/@types/MemesInterface';
import { Button, Modal } from '@mui/material';
import { HexColorPicker } from "react-colorful";

const scrollToRef = (ref: any) => !ref ? '' : window.scrollTo(0, ref.current.offsetTop)

type positionText = {
    x: number,
    y: number
}

export function MemeGenerator() {
    const URL_MEMES = "https://api.imgflip.com/get_memes";
    const [memes, setDataMemes] = useState<Meme[]>()
    const [meme, setDataMeme] = useState<any>()
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [textMeme, setTextMeme] = useState<string>('');
    const [colorText, setColorText] = useState<string>('#ffffff');
    const [positionLegend, setPositonLegend] = useState<positionText>({ x: 0, y: 0 })
    const myRef = useRef(null)
    const inputLegend = useRef<HTMLInputElement>(null)

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
        setOpenModal(true)
        const positionRect = event.currentTarget.getBoundingClientRect();
        const x = event.clientX - positionRect.left;
        const y = event.clientY - positionRect.top;
        setPositonLegend({ x: x, y: y })
    }
    const makeLegendMeme = () => {
        if (!inputLegend.current) {
            return;
        }

        let legend = inputLegend.current.value;

        setOpenModal(false)
        setTextMeme(legend)
    }

    return (
        <>
            <Container>
                {
                    !meme ? <ContainerFull ref={myRef} /> : (
                        <ContainerFull ref={myRef}>
                            <ContainerImage>
                                <ImageFull onClick={createLegendMeme} src={meme.url} />
                                <LegendMeme style={{ color: colorText, top: positionLegend.y, left: positionLegend.x }}>{textMeme}</LegendMeme>
                            </ContainerImage>
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
            <Modal
                open={openModal}
                onClose={() => setOpenModal(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <ModalBody>
                    <h2>Crie sua legenda:</h2>
                    <input ref={inputLegend} type="text" defaultValue={textMeme} name="legendMeme" />
                    <HexColorPicker style={{margin: '10px auto'}} color={colorText} onChange={setColorText} />
                    <Button onClick={makeLegendMeme} style={{ margin: '10px 0' }} variant="contained" color="success">criar</Button>
                </ModalBody>
            </Modal>
        </>
    );
}