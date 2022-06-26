import { styled } from "@mui/material";

export const Container = styled('div')`
    margin: 15px auto;
    width: 100%;
    max-width: 1280px;
`;

export const ColW6 = styled('div')`
    width: 15%;
    display: inline-block;
`

export const Image = styled('img')`
    width: 50%;
    height: 50%;
    box-shadow: 2px 2px 5px gray;
    transition: 0.5s;
    cursor: pointer;

    &:hover {
        width: 100%;
    }
`
export const ContainerFull = styled('div')`
    width: 100%;
    margin: 25px auto;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const ContainerImage = styled('div')`
    max-width: 100%;
    height: 100%;
    max-height: 500px;
    position: relative;    
`

export const CaptionMeme = styled('div')`
    position: absolute;
`

export const ImageFull = styled('img')`
    max-width: 100%;
    height: 100%;
    max-height: 500px;
    position: relative;
    box-shadow: 2px 2px 5px gray;
`
export const ModalBody = styled('div')`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 40%;
    padding: 20px;
    border-radius: 15px;
    background-color: lightgrey;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`

export const InputMeme = styled('input')`
    width: 60%;
    border: 1px solid black;
    border-radius: 15px;
    padding: 10px;
`