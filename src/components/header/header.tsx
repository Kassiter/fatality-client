import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import '../../stylesheets/navbar.css';
import { FaSteamSymbol } from 'react-icons/fa';
import { RiUserStarFill } from 'react-icons/ri';

import axios from 'axios';
import PersonalPage from '../personal-page/personalPage';
import environment from '../../environment';

interface Props {
  toggleModal(): void
}

interface State {
  modalToggled: boolean
}

class Header extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      modalToggled: false,
    };
  }

  componentDidMount(): void {
    require('dotenv').config();
  }

  componentDidUpdate(): void {
    if (this.state.modalToggled) {
      document.getElementById('root')!.classList.add('blurred');
    } else {
      document.getElementById('root')!.classList.remove('blurred');
    }
  }

  renderActionButton = () => {
    if (localStorage.getItem('steam_id')) {
      return (
        <Button
          variant="danger"
          className="navbar__pp"
          onClick={this.toggleModal}
        >
          <RiUserStarFill className="steam-icon" />
          <div className="navbar__pp-text">Личный кабинет</div>
        </Button>
      );
    }
    return (
      <Button
        variant="danger"
        className="navbar__pp"
        href={`${environment.backend_url}/auth/steam`}
      >
        <FaSteamSymbol className="steam-icon" />
        <div className="navbar__pp-text">
          войти
          <br />
          через Steam
        </div>
      </Button>
    );
  };

  toggleModal = () => {
    this.setState({ modalToggled: !this.state.modalToggled });
  };

  render() {
    return (
      <Navbar variant="dark" expand="lg" className="navbar--container">
        <Navbar.Brand href="#home">
          <div className="navbar__logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#privilegies">Привилегии</Nav.Link>
            <Nav.Link href="#rules" onClick={this.props.toggleModal}>
              Правила
            </Nav.Link>
          </Nav>
          {this.renderActionButton()}
        </Navbar.Collapse>

        <PersonalPage
          show={this.state.modalToggled}
          onHide={() => this.toggleModal()}
        />
      </Navbar>
    );
  }
}

export default Header;
