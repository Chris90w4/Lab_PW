import { Link } from 'react-router';

function Navbar() {
    return (
        <nav style={{ marginBottom: '20px', padding: '10px', borderBottom: '1px solid gray' }}>
            <Link to="/" style={{ marginRight: '15px' }}>Home</Link>
            <Link to="/projects" style={{ marginRight: '15px' }}>Projects</Link>
            <Link to="/contact">Contact</Link>
        </nav>
    );
}
export default Navbar;