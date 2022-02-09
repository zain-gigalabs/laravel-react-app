import {Navbar, Container, Nav, NavDropdown} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";

function Header() {
    const user = JSON.parse(localStorage.getItem('user-info'));
    const history = useNavigate();

    function logout() {
        localStorage.clear();
        history("/register");
    }

    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">Navbar</Navbar.Brand>
                    <Nav className="mr-auto nav_bar_wrapper">
                        {
                            localStorage.getItem('user-info') ?
                                <>
                                    <Link to="/">Product List</Link>
                                    <Link to="/add">Add Product</Link>
                                    <Link to="/search">Search Product</Link>
                                </>
                                :
                                <>
                                    <Link to="/login">Login</Link>
                                    <Link to="/register">Register</Link>
                                </>
                        }


                    </Nav>
                    {
                        localStorage.getItem('user-info') ?
                        <Nav>
                            <NavDropdown title={user && user.name}>
                                <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                                <NavDropdown.Item>Profile</NavDropdown.Item>
                            </NavDropdown>
                        </Nav> : null
                    }
                </Container>
            </Navbar>
        </div>
    )
}

export default Header