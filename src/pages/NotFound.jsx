import { Link } from 'react-router';

function NotFound() {
    return (
        <div>
            <h2>404 - Pagina nu a fost gasita</h2>
            <Link to="/">Inapoi la Home</Link>
        </div>
    );
}
export default NotFound;