import { ContainerAll, FilesContainer, File, ImageFile, InfoContainer, TextFile } from "./Files.style";
import { FileInterface } from "../../../data/@types/FileInterface";
import { ImageService } from "../../../data/services/Images/Images";
import { Button } from "@mui/material"
import MobiledataOffIcon from '@mui/icons-material/MobiledataOff';

type FilesProps = {
    files?: FileInterface[],
    changeDataFiles: (newValue: FileInterface[]) => void,
}

export function Files({ files, changeDataFiles }: FilesProps) {
    let switchOrder = false;
    const compare = (a: FileInterface, b: FileInterface) => {
        let comparison = 0;
        if (a.countCities > b.countCities) {
            comparison = (switchOrder ? 1 : -1);
        } else if (a.countCities < b.countCities) {
            comparison = (switchOrder ? -1 : 1);
        }

        return comparison;
    }

    if (files) {
        files.sort(compare)
    }

    function changeOrderFiles() {
        if (files) {
            changeDataFiles(files.sort(compare))
            switchOrder = !switchOrder;
        }
    }

    return (
        <ContainerAll>
            <Button variant={'contained'} color="secondary" onClick={changeOrderFiles} startIcon={<MobiledataOffIcon />}>Cidades</Button>
            <FilesContainer>
                {
                    (!files ? '' : files.map(file => {
                        return (
                            <File key={file.fileState.ID}>
                                <ImageFile src={"images/" + ImageService.getImageName(file.type)} />
                                <InfoContainer>
                                    <TextFile>{file.fileName}</TextFile>
                                    <TextFile>Cidades: {file.countCities}</TextFile>
                                </InfoContainer>
                            </File>
                        )
                    }))
                }
            </FilesContainer>
        </ContainerAll>
    )
}