import './App.css';
import {Container, Nav, Navbar, NavbarBrand} from "react-bootstrap";
import {Route, Routes, useNavigate} from "react-router-dom";
import Moim from "./components/Moim.js";
import Post from "./components/Post";
import Detail from "./components/Detail";

function App() {

    const navigate = useNavigate();

  return (
    <div className="App">
        <MainNav navigate={navigate}/>

        <Routes>
            <Route path={'/'}></Route>
            <Route path={'/moim'} element={<Moim />}></Route>
            <Route path={'/moim/:id'} element={<Detail />}></Route>
            <Route path={'/post'} element={<Post />}></Route>
            <Route path={'*'} element={<div>404</div>}></Route>
        </Routes>
    </div>
  );
}

function MainNav({navigate}) {
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand onClick={() => navigate("/")} style={{ cursor: 'pointer' }}>Home</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link onClick={() => navigate("/moim")}>모임찾기</Nav.Link>
                        <Nav.Link onClick={() => navigate("/")}>설정</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default App;
