import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { ImExit } from 'react-icons/im';
import PersonalItemForm from './personalItemForm';
import '../../stylesheets/personal_page.css';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import TabContainer from 'react-bootstrap/TabContainer';
import Contest from './contest';
import axios from 'axios';
import environment from '../../environment';
import ModerContest from './moderContest';
import ContestModerPage from './moder_personals/contestModerPage';
import RulesModerPage from './moder_personals/rulesModerPage';
import Refund from './refund';
import PrimeModerPage from './moder_personals/primeModerPage';
import ModelUploadPage from './modelUploadPage';
import MapUploadPage from './mapUploadPage';
import KeyGenPage from './keyGenPage';
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
      // this.getManageCommandsCategories();
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

    let nickname = localStorage.getItem('nickname');
    let steam_id = localStorage.getItem('steam_id');
  //   if (nickname) {
  //     axios
  //       .get(`${environment.backend_url}/users/vip_data?nickname=${nickname}`)
  //       .then((res: any) => {
  //         this.setState({
  //           vip_group: res.data.vip_group,
  //           vip_expires: res.data.expires,
  //           nickname: nickname,
  //           avatar: localStorage.getItem('avatarfull'),
  //         });
  //       });

  //     axios
  //       .get(`${environment.backend_url}/contests?steam_id=${steam_id}`)
  //       .then((res) => {
  //         if (res.data.contest) {
  //           this.setState({
  //             contest: res.data.contest,
  //           });
  //         }
  //       });

  //     axios
  //       .get(`${environment.backend_url}/users/strikes?steamID=${steam_id}`)
  //       .then((res) => {
  //         this.setState({
  //           strikes: res.data.strikes,
  //         });
  //       });

  //     axios
  //       .get(`${environment.backend_url}/moder_contests?steam_id=${steam_id}`)
  //       .then((res) => {
  //         this.setState({
  //           moder_contest: res.data.contest,
  //           moder_contest_winner: res.data.winner,
  //         });
  //       });

  //     axios
  //       .get(
  //         `${environment.backend_url}/refund/participating?steam_id=${steam_id}`
  //       )
  //       .then((res) => {
  //         this.setState({
  //           refund_participating: res.data.participating,
  //         });
  //       });
  //   }
  }

  logout = () => {
    localStorage.clear();
    window.location.href = window.location.origin;
  };

  renderContest = () => {
    if (!this.state.contest) {
      return (
        <div className="giveaway__main-content">
          <div className="peronal-page__icon gift-icon"></div>
          <h4>На данный момент нет розгрышей</h4>
        </div>
      );
    }

    return (
      <Contest
        id={this.state.contest.id}
        img_url={this.state.contest.image}
        winner={this.state.contest.winner}
        con_key={this.state.contest.con_key}
        description={this.state.contest.description}
        title={this.state.contest.title}
        due_date={this.state.contest.due_date}
        participating={this.state.contest.participating}
      />
    );
  };

  renderModerContest = () => {
    if (this.state.moder_contest == null) {
      let phrase = <h4>На данный момент набор не проводится</h4>;
      let cl = 'peronal-page__icon shield-icon';
      if (
        this.state.moder_contest_winner &&
        localStorage.getItem('m_type') == 'no'
      ) {
        phrase = (
          <h4 className="participating">
            Вы приняты! Ожидайте дополнительную информацию
          </h4>
        );
        cl = 'peronal-page__icon confetti-icon';
      }
      if (
        localStorage.getItem('m_type') &&
        (localStorage.getItem('m_type') == 'undefined' ||
          localStorage.getItem('m_type')!.includes('no'))
      ) {
        return (
          <div className="giveaway__main-content">
            <div className={cl}></div>
            {phrase}
          </div>
        );
      }
    }

    if (localStorage.getItem('m_type') == 'contest') {
      return <ContestModerPage />;
    }

    if (localStorage.getItem('m_type') == 'ruler') {
      return <RulesModerPage />;
    }

    if (localStorage.getItem('m_type') == 'main') {
      return <PrimeModerPage />;
    }

    if (localStorage.getItem('m_type') == 'ceo') {
      return (
        <Tabs>
          <Tab eventKey="home" title="Main">
            <PrimeModerPage />
          </Tab>
          <Tab eventKey="profile" title="Contest">
            <ContestModerPage />
          </Tab>
          <Tab eventKey="logs" title="Logs">
            <RulesModerPage />
          </Tab>
          <Tab eventKey="upload_s" title="Загрузка моделей">
            <ModelUploadPage />
          </Tab>
          <Tab eventKey="upload" title="Загрузка карт">
            <MapUploadPage />
          </Tab>
          <Tab eventKey="keygen" title="Генерация ключей">
            <KeyGenPage />
          </Tab>
        </Tabs>
      );
    }

    if (localStorage.getItem('m_type') == 'cto') {
      return (
        <Tabs>
          <Tab eventKey="upload_s" title="Models upload">
            <ModelUploadPage />
          </Tab>
          <Tab eventKey="upload" title="Maps upload">
            <MapUploadPage />
          </Tab>
        </Tabs>
      );
    }

    if (this.state.moder_contest) {
      return (
        <ModerContest
          id={this.state.moder_contest.id}
          participating={this.state.moder_contest.participating}
          due_date={this.state.moder_contest.due_date}
        />
      );
    }
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
