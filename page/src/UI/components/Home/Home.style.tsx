import { styled } from "@mui/material";

export const Container = styled('div')`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    margin: 15px 0;
    width: 100%;
    max-width: 1280px;
    margin: 0 auto;
`;

export const LinksMenu = styled('div')`
    width: 100%;
    height: 100px;
    box-shadow: 2px 2px 10px gray;
    border-radius: 25px;
    border: 1px solid;
    display: flex;
    justify-content: left;
    align-items: center;
    transition: 0.5s;

    
    &:hover {
        height: 110px;
    }
`;

export const ImageMenu = styled('img')`
    width: 20%;
    height: 100%;
    margin: 5px 20px;
    object-fit: cover;
`;

export const ContainerInfo = styled('div')`
    height: 100%;
    width: 80%;
    border-left: 1px solid gray;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const TitleMenu = styled('h2')`
    font-size: 24px;
    color: #000;
`