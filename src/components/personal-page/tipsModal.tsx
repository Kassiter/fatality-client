import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { FiLogOut } from 'react-icons/fi';
import '../../stylesheets/personal_page.css';
import '../../stylesheets/global.css';

interface Props{
  show: boolean,
  mcc: Object[],
  onHide(): void
}

class TipsModal extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  logout = () => {
    localStorage.clear();
    window.location.href = window.location.origin;
  };

  renderMCC = () => {
    let res: Array<JSX.Element> = [];
    if (this.props.mcc.length > 0 && this.props.mcc != undefined) {
      this.props.mcc.forEach((category: any) => {
        res.push(<h2>{category.name}:</h2>);
        category.commands.forEach((command: any) => {
          res.push(
            <h5 className="w-100">
              <div className={this.commandClass(command.group)}>
                {command.group}
              </div>
              <span className="help__command ml-2"> {command.name}</span>
              <span className="help__target ml-2"> {command.target}</span>
              <span className="help__param ml-2"> {command.param}</span>
              <span className="text-muted ml-2"> {command.description}</span>
            </h5>
          );
        });
      });
    }
    return res;
  };

  commandClass = (group: string) => {
    return `help__group help__group--${group.toLowerCase()}`;
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
        <Modal.Header
          closeButton
          className="personal-page__header"
        ></Modal.Header>
        <Modal.Body className="help__body">
          <div className="d-flex flex-column align-items-center">
            {this.renderMCC()}
            <div>
              <h3 className="text-center">ПРИМЕЧАНИЕ</h3>
              <h5 className="text-left">
                Вместо ников определенного игрока можно обобщать команды, для
                этого есть:
              </h5>
              <div className="d-flex flex-column">
                <span>
                  <span className="help__target ml-2">@me</span>
                  <span className="text-muted ml-2"> ты</span>
                </span>
                <span>
                  <span className="help__target ml-2">@all</span>
                  <span className="text-muted ml-2"> все игроки</span>
                </span>
                <span>
                  <span className="help__target ml-2">@ct</span>
                  <span className="text-muted ml-2"> контртеррористы</span>
                </span>
                <span>
                  <span className="help__target ml-2">@t</span>
                  <span className="text-muted ml-2"> террористы</span>
                </span>
              </div>
              <h4 className="text-left mt-3">Пример: </h4>{' '}
              <span className="help__command ml-2">sm_tp</span>
              <span className="help__target ml-2"> @all</span>
              <span className="help__param ml-2">@me</span>
              <span className="text-muted ml-2">телепорт всех ко мне</span>
            </div>
            <div>
              <h3 className="text-center">
                Разделение команд по полезности для админов/модеров
              </h3>
              <div>
                <div className="help__group help__group--a">A</div>:{' '}
                <span className="help__param">
                  самые важные для конкурсов и управления сервером/игроками [
                  <b>эти команды должен наизусть знать каждый модер</b>]
                </span>
              </div>
              <div>
                <div className="help__group help__group--b">B</div>:{' '}
                <span className="help__param">
                  команды средней важности [команды которые можно использовать
                  только в определенных ситуациях, знать по возможности]
                </span>
              </div>
              <div>
                <div className="help__group help__group--c">C</div>:{' '}
                <span className="help__param">
                  шуточные команды [никогда не использовать не по назначению,
                  так как это будет считаться за баловство, что приведет к
                  последующим страйкам и т.д]
                </span>
              </div>
              <div>
                <div className="help__group help__group--d">D</div>:{' '}
                <span className="help__param">
                  бесполезные команды [команды которые лучше совсем не
                  использовать]
                </span>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    );
  }
}

export default TipsModal;
