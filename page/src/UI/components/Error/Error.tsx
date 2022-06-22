import { Link } from "react-router-dom";


export function Error() {
    return (
        <div className="not-found">
            <h1 style={{ color: 'black' }}>404</h1>
            <h2 style={{ color: 'black' }}>Página não encontrada</h2>
            <Link to="/">Volte para o menu Principal</Link>
        </div>
    )
}
