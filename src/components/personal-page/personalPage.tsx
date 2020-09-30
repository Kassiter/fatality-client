import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { ImExit } from 'react-icons/im';
import PersonalItemForm from './personalItemForm';
import '../../stylesheets/personal_page.css';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import TabContainer from 'react-bootstrap/TabContainer';
import axios from 'axios';
import environment from '../../environment';
import Refund from './refund';
import ReportPage from './reportPage';
import { ExecFileOptionsWithStringEncoding } from 'child_process';

interface Props {
  show: boolean;
  onHide(): void;
}

interface State {
  vip_group: string;
  contest: any;
  moder_contest_winner: boolean;
  tipsModalToggled: boolean;
  manageCommandsCategories: Object[];
  strikes: number;
  nickname: string | null;
  avatar: string | null;
  vip_expires: string | any;
  moder_contest: any;
  refund_participating: any;
}

class PersonalPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      vip_group: '-',
      contest: null,
      vip_expires: null,
      nickname: '',
      moder_contest_winner: false,
      tipsModalToggled: false,
      manageCommandsCategories: [],
      strikes: 0,
      avatar: '',
      moder_contest: null,
      refund_participating: null,
    };
  }

  toggleModal = () => {
    this.setState({ tipsModalToggled: !this.state.tipsModalToggled });
  };

  componentDidMount() {
    if (
      localStorage.getItem('m_type') &&
      !localStorage.getItem('m_type')!.includes('no')
    ) {
    }

    if (localStorage.getItem('steam_id64')) {
      axios
        .get(
          `${
            environment.backend_url
          }/users/refresh?steam_id64=${localStorage.getItem('steam_id64')}`
        )
        .then((res) => {
          localStorage.setItem('nickname', res.data.name);
        });
    }
  }

  logout = () => {
    localStorage.clear();
    window.location.href = window.location.origin;
  };


  getManageCommandsCategories = () => {
    axios
      .get(
        `${
          environment.backend_url
        }/manage_command_categories/mc_categories?steamID=${localStorage.getItem(
          'steam_id'
        )}&auth_token=${localStorage.getItem('auth_token')}`
      )
      .then((res) => {
        if (res.data.categories) {
          this.setState({
            manageCommandsCategories: res.data.categories,
          });
        }
      });
  };

  renderHelpBtn = () => {
    if (
      localStorage.getItem('m_type') &&
      !localStorage.getItem('m_type')!.includes('no')
    ) {
      return (
          <></>
      );
    }
  };

  renderStrikes = () => {
    if (this.state.strikes > 0) {
      return (
        <div className="row profile__feature--point">
          <h3 className="text-left">
            <span className="text-muted">Страйки: </span>
            {this.state.strikes}/3
          </h3>
        </div>
      );
    }
  };

  render() {
    return (
      <Modal
        show={this.props.show}
        onHide={this.props.onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        id="personal-page"
      >
        {/* <Modal.Header closeButton className='personal-page__header'>
         </Modal.Header> */}
        <Modal.Body>
          <Tabs>
            <Tab eventKey="home" title="Главная">
              <div className="col align-items-center profile">
                <div className="row profile__feature">
                  <div
                    className="profile__avatar"
                    style={{ backgroundImage: `url(${localStorage.getItem('avatarfull')})` }}
                  ></div>
                </div>
                <div className="row profile__nickname">
                  <h2>{localStorage.getItem('nickname')}</h2>
                </div>
                {/* <div className="row profile__feature--point">
                  <h3 className="text-left">
                    <span className="text-muted">Привилегия: </span>
                    {this.state.vip_group}
                  </h3>
                </div>
                <div className="row profile__feature--point">
                  <h3 className="text-left">
                    <span className="text-muted">Истекает: </span>
                    {this.state.vip_expires}
                  </h3>
                </div> */}
                {this.renderStrikes()}
              </div>
            </Tab>
            <Tab eventKey="profile" title="Персональный товар">
              <PersonalItemForm />
            </Tab>
            {/* <Tab eventKey="giveaway" title="Розыгрыши">
              {this.renderContest()}
            </Tab> */}

            {/* <Tab eventKey="moderators" title="Модерация">
              {this.renderModerContest()}
            </Tab> */}

            <Tab eventKey="refund" title="Возврат привелегий">
              <Refund participating={this.state.refund_participating} />
            </Tab>
            <Tab eventKey="report" title="Репорт">
              <ReportPage />
            </Tab>
          </Tabs>
        </Modal.Body>
        <Modal.Footer className="justify-content-between">
        <Button onClick={this.props.onHide} variant="light">
            Закрыть
          </Button>
          {this.renderHelpBtn()}
          <Button onClick={this.logout} variant="danger" size="sm" className='pp_quit'>
            <ImExit className="h5 mt-2" /> Выход из учётной записи
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default PersonalPage;
