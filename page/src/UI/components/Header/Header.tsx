import { Link } from 'react-router-dom';
import { HeaderContainer, Logo, LogoContainer } from './Header.style';

export function Header() {
    return (
        <HeaderContainer>
            <LogoContainer>
                <Link to='/'><Logo src="images/derickLindo.png" /></Link>
            </LogoContainer>
        </HeaderContainer>
    )
}