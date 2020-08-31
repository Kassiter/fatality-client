import React from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import '../../stylesheets/personal_page.css';

import Alert from 'react-bootstrap/Alert';

import environment from '../../environment';

interface Props{
  participating: boolean
}

interface State{
  buyer_nickname: string | null,
  proofs: string | null,
  priviliege_type: string | null,
  when_buyed: string | null,
  requestSucceed: boolean,
  requestFailed: boolean,
  errorText: string,
  participating: boolean,
}

class Refund extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      buyer_nickname: null,
      proofs: null,
      priviliege_type: null,
      when_buyed: null,
      requestSucceed: false,
      requestFailed: false,
      errorText: '',
      participating: this.props.participating,
    };
  }

  updateNickname = (e: any) => {
    this.setState({ buyer_nickname: e.target.value });
  };

  updateProofs = (e: any) => {
    this.setState({ proofs: e.target.value });
  };

  updateWhen = (e: any) => {
    this.setState({ when_buyed: e.target.value });
  };

  updateType = (e: any) => {
    this.setState({ priviliege_type: e.target.value });
  };

  send = (e: any) => {
    e.preventDefault();
    axios
      .post(`${environment.backend_url}/refund/take_part`, {
        buyer_nickname: this.state.buyer_nickname,
        when_buyed: this.state.when_buyed,
        priviliege_type: this.state.priviliege_type,
        proofs: this.state.proofs,
        user: {
          steam_id: localStorage.getItem('steam_id'),
        },
      })
      .then((res) => {
        this.setState({
          requestSucceed: true,
          requestFailed: false,
          participating: true,
        });
      })
      .catch((error) => {
        const err = error.response.data.error;
        this.setState({
          errorText: err,
          requestFailed: true,
          requestSucceed: false,
        });
      });
  };

  renderPart = () => (
    <Form>
      <Alert variant="danger" hidden={!this.state.requestFailed}>
        Произошла ошибка:&nbsp;
        {' '}
        {this.state.errorText}
      </Alert>
      <Alert variant="success" hidden={!this.state.requestSucceed}>
        Форма успешно отправлена.
      </Alert>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Никнейм на момент покупки привилегии</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="Введите никнейм"
          onChange={(e) => this.updateNickname(e)}
        />
      </Form.Group>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Приблизительная дата покупки</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="Введите дату"
          onChange={(e) => this.updateWhen(e)}
        />
      </Form.Group>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Тип привилегии</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="Введите тип"
          onChange={(e) => this.updateType(e)}
        />
      </Form.Group>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Доказательства покупки</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="Введите доказательства"
          onChange={(e) => this.updateProofs(e)}
        />
        <Form.Text className="text-muted">
          Например: ссылка на скриншот письма с ключом/ссылка на скриншот вип
          меню с датой окончания.
        </Form.Text>
      </Form.Group>
      <Button
        variant="success"
        type="submit"
        onClick={(e) => this.send(e)}
        disabled={this.state.participating}
      >
        Отправить
      </Button>
    </Form>
  );

  render() {
    return this.renderPart();
  }
}

export default Refund;
