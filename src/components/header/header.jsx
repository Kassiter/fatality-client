import React from "react";
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'
import Nav from 'react-bootstrap/Nav'
import '../../stylesheets/navbar.css'
import { FaSteamSymbol } from 'react-icons/fa';

class Header extends React.Component {
    signIn = () => {
        require('dotenv').config()
        alert(process.env.API_URL)
    }

    componentDidMount(){
        require('dotenv').config()
    }

    render() {
        return(
            <Navbar variant="dark" expand="lg" className="navbar--container">
                <Navbar.Brand href="#home"><div className="navbar__logo"></div></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="#home">Привилегии</Nav.Link>
                        <Nav.Link href="#home">Акции</Nav.Link>
                        <Nav.Link href="#home">Розыгрыши</Nav.Link>
                        <Nav.Link href="#home">Администрация</Nav.Link>
                    </Nav>
                <Button variant="danger" className="navbar__pp" onClick={this.signIn}>
                    <FaSteamSymbol className="steam-icon"/> 
                    <div className="navbar__pp-text">войти<br/>через Steam</div>
                </Button>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default Header;