import React from "react";
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'
import Nav from 'react-bootstrap/Nav'
import '../../stylesheets/navbar.css'
import { FaSteamSymbol } from 'react-icons/fa';
import axios from "axios";
import PersonalPage from "../personal-page/personalPage";
import enviroment from '../../enviroment'

class Header extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            modalToggled: false
        }
    }

    componentDidMount(){
        require('dotenv').config()
    }

    renderActionButton = () =>{
        if(localStorage.getItem('steam_id')){
            return(
                <Button variant="danger" className="navbar__pp" onClick={this.toggleModal}>
                    <FaSteamSymbol className="steam-icon"/> 
                    <div className="navbar__pp-text">Личный кабинет</div>
                </Button>
            );
        }
        return(
            <Button variant="danger" className="navbar__pp" href={`${enviroment.backend_url}/auth/steam`}>
                <FaSteamSymbol className="steam-icon"/> 
                <div className="navbar__pp-text">войти<br/>через Steam</div>
            </Button>
        );
    }

    toggleModal = () =>{
        this.setState({modalToggled: !this.state.modalToggled})
    }

    render() {
        return(
            <Navbar variant="dark" expand="lg" className="navbar--container">
                <Navbar.Brand href="#home"><div className="navbar__logo"></div></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="#privilegies">Привилегии</Nav.Link>
                        <Nav.Link href="#personal-stuff">Персональные товары</Nav.Link>
                        <Nav.Link href="#home">Акции</Nav.Link>
                        <Nav.Link href="#home">Розыгрыши</Nav.Link>
                        <Nav.Link href="#home">Администрация</Nav.Link>
                    </Nav>
                {this.renderActionButton()}
                </Navbar.Collapse>

                <PersonalPage
                    show={this.state.modalToggled}
                    onHide={() => this.toggleModal(false)}
                />
            </Navbar>
        );
    }
}

export default Header;