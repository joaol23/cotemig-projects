import { useEffect, useRef, useState } from 'react';
import { Container, Image, ImageFull, ColW6, ContainerFull, ContainerImage, InputMeme, CaptionMeme, ModalBody } from './MemeGenerator.style';
import { Meme, CaptionTextMeme } from '../../../data/@types/MemesInterface';
import { Button, FormControl, InputLabel, MenuItem, Modal, Select } from '@mui/material';
import { HexColorPicker } from "react-colorful";
import { toast } from 'react-toastify';

const scrollToRef = (ref: any) => !ref ? '' : window.scrollTo(0, ref.current.offsetTop)

type positionText = {
    x: number,
    y: number
}

export function MemeGenerator() {
    const URL_MEMES = "https://api.imgflip.com/get_memes";
    const [memes, setDataMemes] = useState<Meme[]>()
    const [meme, setDataMeme] = useState<Meme>()
    const [captionText, setCaptionText] = useState<CaptionTextMeme[]>();
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [positionLegend, setPositonLegend] = useState<positionText>({ x: 0, y: 0 })

    const myRef = useRef(null)
    const inputCaption = useRef<HTMLInputElement>(null)
    const inputIdImage = useRef<HTMLInputElement>(null)

    useEffect(() => {
        fetch(URL_MEMES)
            .then((res) => res.json())
            .then((data) => { setDataMemes(data.data.memes) });
    }, []);

    let captionFake: CaptionTextMeme = {
        id: 0,
        text: '',
        idImage: 0,
        position: {
            x: 0,
            y: 0
        },
        color: '',
        fontSize: 0
    };


    const highLightMeme = (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
        if (!memes) {
            return;
        }
        const idMeme = event.currentTarget.getAttribute('data-id');
        getCaptions((!idMeme ? '' : idMeme));
        let memeChoose = memes.find(meme => meme.id === idMeme);
        setDataMeme(memeChoose);
        scrollToRef(myRef);
    }

    const getCaptions = (idMeme: string) => {
        fetch(`/caption-meme/${idMeme}`)
            .then((res) => res.json())
            .then((data) => { setCaptionText(data.captions) });
    }

    const createCaptionMeme = (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
        setOpenModal(true)
        const positionRect = event.currentTarget.getBoundingClientRect();
        const x = event.clientX - positionRect.left;
        const y = event.clientY - positionRect.top;
        setPositonLegend({ x: x, y: y })
    }

    const insertCaptionMeme = async (idImage: string) => {
        await fetch(`/insert-item`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ data: captionFake, fileName: 'captionMemes.json' })
        });
        toast.success('Legenda adicionada!');
        getCaptions(idImage);
    }

    const makeCaptionMeme = () => {
        if (!inputCaption.current || !inputIdImage.current) {
            return;
        }

        let caption = inputCaption.current.value;
        if (caption == '') {
            toast.error('Coloque um texto!');
            return;
        }
        let idImage = parseInt(inputIdImage.current.value);

        captionFake.text = caption;
        captionFake.position.y = positionLegend.y;
        captionFake.position.x = positionLegend.x;
        captionFake.idImage = idImage;

        if (captionFake.fontSize == 0) {
            toast.error('Coloque um tamanho!');
            return;
        }

        insertCaptionMeme(inputIdImage.current.value);
        setOpenModal(false)
    }

    let options = [];

    for (let i = 1; i <= 24; i++) {
        options.push(<MenuItem key={i} value={i}>{i} px</MenuItem>);
    }

    return (
        <>
            <Container>
                {
                    !meme ? <ContainerFull ref={myRef} /> : (
                        <ContainerFull ref={myRef}>
                            <h2 style={{ color: 'black' }}>{meme.name}</h2>
                            <ContainerImage>
                                <ImageFull onClick={createCaptionMeme} src={meme.url} />
                                {
                                    !captionText ? '' : captionText.map(caption => (
                                        <CaptionMeme key={caption.id} style={{ color: caption.color, fontSize: caption.fontSize, top: caption.position.y, left: caption.position.x }}>{caption.text}</CaptionMeme>
                                    ))
                                }
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
                    <InputMeme ref={inputCaption} type="text" defaultValue={''} name="legendMeme" />
                    <>
                        <HexColorPicker style={{ margin: '10px auto' }} color="white" onChange={color => captionFake.color = color} />
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Font-size</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Font-size"
                                defaultValue={0}
                                onChange={value => captionFake.fontSize = (value.target.value as number)}
                            >
                                <MenuItem value={0}>Escolha um tamanho para a legenda</MenuItem>
                                {
                                    options.map(option => option)
                                }
                            </Select>
                        </FormControl>
                    </>
                    <input ref={inputIdImage} type="hidden" defaultValue={!meme ? '' : meme.id} />
                    <Button onClick={makeCaptionMeme} style={{ margin: '10px 0' }} variant="contained" color="success">criar</Button>
                </ModalBody>
            </Modal>
        </>
    );
}