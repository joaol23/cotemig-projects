import { ContainerAll, FilesContainer, File, ImageFile, InfoContainer, TextFile } from "./Files.style";
import { FileInterface } from "../../../data/@types/FileInterface";
import { ImageService } from "../../../data/services/Images/Images";

interface FilesProps {
    files?: FileInterface[]
}

export function Files(props: FilesProps) {
    const compare = (a: FileInterface, b: FileInterface) => {
        let comparison = 0;
        if (a.countCities > b.countCities) {
          comparison = -1;
        } else if (a.countCities < b.countCities) {
          comparison = 1;
        }
        return comparison;
    }

    if (props.files) {
        props.files.sort(compare)
    }
    return (
        <ContainerAll>
            <FilesContainer>
                {
                    (!props.files ? '' : props.files.map(file => {
                        return (
                            <File>
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