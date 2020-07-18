import CardDeck from 'react-bootstrap/CardDeck';
import Card from 'react-bootstrap/Card';
import CardCustom from './cardCustom';
import Button from 'react-bootstrap/Button';
import React from "react";
import '../../stylesheets/previlegies.css'
import { BsArrowClockwise } from 'react-icons/bs';
import { FaHeartbeat } from 'react-icons/fa';
import { FaFireAlt } from 'react-icons/fa';
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import { GiFalling } from 'react-icons/gi';
import { GiStrong } from 'react-icons/gi';
import { GiFishMonster } from 'react-icons/gi';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import BootstrapSwitchButton from 'bootstrap-switch-button-react';

class Privilegies extends React.Component {
   constructor(props){
      super(props);
      this.state = {
         toggleChecked: true,
         amountMonth: 70,
         test: {
            "name": "VIP",
            "features": [
               {"icon": "BsArrowClockwise", "description": "Воскрешение", "misc": "×1"},
               {"icon": "GiFalling", "description": "Без урона от падения"},
               {"icon": "GiStrong", "description": "Выносливость", "tooltip": "Не будет стоппить при получении урона"},
               {"icon": "GiFishMonster", "description": "Возможность выбрать любой скин"},
               {"icon": "FaHeartbeat", "description": "Восстановление HP", "tooltip": "10HP/Минута"},
               {"icon": "FaFireAlt", "description": "Огонь при ударе ножом"},
               {"icon": "GiRainbowStar", "description": "Трейлы"},
               {"icon": "BsChatDots", "description": "Цветной чат", "tooltip": "Настройка цвета исходящих сообщений"},
               {"icon": "RiHeartAddLine", "description": "125HP при старте"},
               {"icon": "RiMedalLine", "description": "Значки в табе", "tooltip": "DreamHack и другие"}
            ],
            "cost_month": 70,
            "cost_lifetime": 302,
            "link_month": "http://primearea.biz",
            "link_lifetime": "http://google.com"
         }
      }
   }

   renderTooltip = (props) => {
      return (
        <Tooltip id="nofall-tooltip" {...props}>
          Не будет стоппить при получении урона
        </Tooltip>
      );
    }

    renderTooltipEndur = (props) => {
      return (
        <Tooltip id="nofall-tooltip" {...props}>
          10HP/Минута
        </Tooltip>
      );
    }

    handleCheckedPress = () => {
      this.setState({ toggleChecked: !this.state.toggleChecked, amountMonth: !this.state.toggleChecked ? 70 : 300 })
    }

    render() {
        return(
            <div className="container previlegies-section__container">
               <h1>Привилегии</h1>
               <CardDeck>
                  <CardCustom previliege={this.state.test} />
                  <Card>
                     <div className="previlegies-card__top card__top--1">
                        <h2>Supreme</h2>
                     </div>
                     <Card.Body>
                        <Card.Text>
                        This card has supporting text below as a natural lead-in to additional
                        content.{' '}
                        </Card.Text>
                     </Card.Body>
                     <Card.Footer>
                        <small className="text-muted">Last updated 3 mins ago</small>
                     </Card.Footer>
                  </Card>
                  <Card>
                     <div className="previlegies-card__top card__top--1">
                        <h2>Admin+</h2>
                     </div>
                     <Card.Body>
                        <Card.Text>
                        This is a wider card with supporting text below as a natural lead-in to
                        additional content. This card has even longer content than the first to
                        show that equal height action.
                        </Card.Text>
                     </Card.Body>
                     <Card.Footer>
                        <small className="text-muted">Last updated 3 mins ago</small>
                     </Card.Footer>
                  </Card>
               </CardDeck>
            </div>
        );
    }
}

export default Privilegies;