import { Container, LinksMenu, ImageMenu, ContainerInfo, TitleMenu } from './Home.style'
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { LinkMenu } from '../../../data/@types/MenuInterface'

export function Home() {
    const [linksMenu, setDatalinksMenu] = useState<LinkMenu[]>();

    useEffect(() => {
        fetch("/menu")
            .then((res) => res.json())
            .then((data) => { setDatalinksMenu(data.links); });
    }, []);


    return (
        <Container>
            {
                !linksMenu ? '' : linksMenu.map((link) => (
                    <Link to={'/' + link.path} key={link.id} style={{ textDecoration: 'none', borderRadius: "25px", color: "white", width: '50%', border: '2px solid black', margin: '25px 0'}}>
                        <LinksMenu>
                            <ImageMenu src={link.image} />
                            <ContainerInfo>
                                <TitleMenu>{link.title}</TitleMenu>
                            </ContainerInfo>
                        </LinksMenu>
                    </Link>
                ))
            }
        </Container>
    );
}
