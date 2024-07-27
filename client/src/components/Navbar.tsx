import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function NavBar() {
    return (<>
        <Navbar expand="lg" className="bg-body-tertiary" data-bs-theme="dark">
            <Container>
                <Navbar.Brand href="#home">Pokémon Realms</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto container-fluid">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#play">Play</Nav.Link>
                        <Nav.Link href="#settings">Settings</Nav.Link>
                        <Nav.Link className="ms-auto" href="#register">Register</Nav.Link>
                        <Nav.Link href="#login">Login</Nav.Link>
                        <NavDropdown title="Username" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Profile</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">
                                Party
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">PC</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">
                                Add friend
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </>
    );
}

export default NavBar;