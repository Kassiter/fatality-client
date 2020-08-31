import React from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import '../../../stylesheets/personal_page.css';
import { BsExclamationDiamondFill } from 'react-icons/bs';
import Alert from 'react-bootstrap/Alert';
import ProgressBar from 'react-bootstrap/ProgressBar';
import environment from '../../../environment';
import ContestKey from './contestKey';
import parse from 'html-react-parser';
import moment from 'moment-timezone';

interface Props {
  id: number | string;
  text: string;
  reported: boolean;
  report(id: string | number): void;
}

interface State {}

class LogRow extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  renderTextClass = () => {
    return this.props.reported ? 'ml-2 w-100 row--reported' : 'ml-2 w-100';
  };

  parseText = () => {
    let txt = this.props.text;
    var command: RegExpMatchArray | string | null = '';

    var nickname: RegExpMatchArray | string | null = txt.match(/".*?<[0-9]/);
    if (nickname != null) {
      nickname = nickname[0];
    }
    var steam_id: RegExpMatchArray | string | null = txt.match(
      /<STEAM_.*?><.*?>/
    );
    if (steam_id != null) {
      steam_id = steam_id[0];
      var command_regex = new RegExp(
        `${steam_id}" .*? "|${steam_id}" .*?`,
        'g'
      );
      command = txt.match(command_regex);
      if (command != null) {
        command = command[0];
        var steam_str = steam_id + '"';
        command = command.slice(steam_str.length, -1);
      }
    }
    var log_regex = /L .*?\/.*?\/.*? - .*?:.*?:.*?:/;
    var log_time: RegExpMatchArray | string | null = txt.match(log_regex);
    if (log_time != null) {
      log_time = log_time[0];
    }

    if (
      log_time != null &&
      nickname != null &&
      steam_id != null &&
      command != null
    ) {
      return (
        <h6 className={this.renderTextClass()}>
          {txt.slice(0, txt.indexOf(nickname) + 1).replace(log_time, '')}
          <span className="log__nickname">
            {txt.slice(
              txt.indexOf(nickname) + 1,
              txt.indexOf(nickname) + nickname.slice(0, -2).length
            )}
          </span>
          <span className="log__steam-id">
            {' '}
            [{steam_id.slice(1, steam_id.indexOf('>'))}]
          </span>
          <span className="log__command">{command}</span>
          {txt.slice(txt.indexOf(command) + command.length)}
        </h6>
      );
    }
  };

  render() {
    return (
      <div className="d-flex justify-content-between align-items-center log-row">
        <h6 className="text-muted">{this.props.id}</h6>
        {this.parseText()}
        {/* <h7 className={this.renderTextClass()}>{this.props.text}</h7> */}
        <BsExclamationDiamondFill
          className="ml-2 report__icon"
          size={"1.5em"}
          onClick={() => this.props.report(this.props.id)}
        />
      </div>
    );
  }
}

export default LogRow;
