import { styled } from "@mui/material";

export const ContainerAll = styled('div')`
    width: 100%;
    max-width: 1280px;
`;

export const FilesContainer = styled('div')`
    width: 100%;
    min-height: 100px;
`;

export const File = styled('div')`
    display: inline-block;
    cursor: pointer;
    position: relative;
    width: 25%;
    height: 33vh;
    margin: ${({ theme }) => theme.spacing(4)};
    border: 1px solid;
    border-radius: ${({ theme }) => theme.spacing(1)};
    box-shadow: 2px 2px 3px gray;
    background-color: white;
    
    ${({ theme }) => theme.breakpoints.down('md')}{        
        width: 50%;
    }
`;

export const ImageFile = styled('img')`
    width: 50%;
    height: 50%;
    padding-top: 20px;
`;

export const InfoContainer = styled('div')`    
    width: 100%;
    height: 30%;
    background-color:rgba(0,0,0,0.5);
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    border-bottom-left-radius: ${({ theme }) => theme.spacing(1)};
    border-bottom-right-radius: ${({ theme }) => theme.spacing(1)};
    position: absolute;
    bottom: 0;
`

export const TextFile = styled('p')` 
    word-break: break-word;
`