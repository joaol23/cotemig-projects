import { Container, Content } from "./style";
import { useParams } from 'react-router';
import { City } from "../../data/@types/FileInterface";
import React from "react";

export function DetailsPage() {
    const [contentFile, setContentFile] = React.useState<City[]>();

    const { id } = useParams();

    fetch(`/arquivo-detalhes/${id}`)
        .then((res) => res.json())
        .then((data) => { setContentFile(data.contentFile) });

    return (
        <Container>
            {!contentFile ? '' : contentFile.map(content => {
                return (
                    <Content key={content.ID}>{JSON.stringify(content)}</Content>
                )
            })}
        </Container>
    )
}