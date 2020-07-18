import CardDeck from 'react-bootstrap/CardDeck';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import React from "react";
import '../../stylesheets/previlegies.css'
import { BsArrowClockwise } from 'react-icons/bs';
import { FaHeartbeat } from 'react-icons/fa';
import { FaFireAlt } from 'react-icons/fa';
import { FaUserCog } from 'react-icons/fa';
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import { GiFalling } from 'react-icons/gi';
import { GiStrong } from 'react-icons/gi';
import { GiFishMonster } from 'react-icons/gi';
import { GiRainbowStar } from 'react-icons/gi';
import { BsChatDots } from 'react-icons/bs';
import { RiHeartAddLine } from 'react-icons/ri'
import { RiCoinsLine } from 'react-icons/ri'
import { RiMedalLine } from 'react-icons/ri'
import { FiUserMinus } from 'react-icons/fi'
import { GiBeamsAura } from 'react-icons/gi'
import { GiJumpAcross } from 'react-icons/gi'
import { IoMdFlashOff } from 'react-icons/io'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import BootstrapSwitchButton from 'bootstrap-switch-button-react';

class CardCustom extends React.Component {

   constructor(props){
      super(props);
      this.state = {
         toggleChecked: true,
         amountMonth: this.props.previliege.cost_month,
         BsArrowClockwise: BsArrowClockwise,
         FaHeartbeat: FaHeartbeat,
         AiOutlineQuestionCircle: AiOutlineQuestionCircle, 
         GiFalling: GiFalling,
         GiStrong: GiStrong,
         GiFishMonster: GiFishMonster,
         FaFireAlt: FaFireAlt,
         GiRainbowStar: GiRainbowStar,
         BsChatDots: BsChatDots,
         RiHeartAddLine: RiHeartAddLine,
         RiMedalLine: RiMedalLine,
         FiUserMinus: FiUserMinus,
         GiBeamsAura: GiBeamsAura,
         RiCoinsLine: RiCoinsLine,
         IoMdFlashOff: IoMdFlashOff,
         GiJumpAcross: GiJumpAcross,
         FaUserCog: FaUserCog
      }
   }

   renderTooltip = (props, text) => {
      return (
        <Tooltip id="nofall-tooltip" {...props}>
          {text}
        </Tooltip>
      );
    }

    handleCheckedPress = () => {
      this.setState({ toggleChecked: !this.state.toggleChecked, amountMonth: !this.state.toggleChecked ? this.props.previliege.cost_month : this.props.previliege.cost_lifetime })
    }

    parseFeatures = () =>{
       let features = [];
       this.props.previliege.features.forEach(feature => {
          features.push( 
            <Card.Text className="previlegies-card__text">
               {React.createElement(this.state[feature.icon], null)}&nbsp;
               {feature.description} <span className="text-muted">{feature.misc ? feature.misc : null}</span>&nbsp;
               {feature.tooltip ? this.renderTooltipBase(feature.tooltip) : false}
            </Card.Text>
         );
       });
       return(features);
    }

    renderTooltipBase = (text) => {
      return (<OverlayTrigger
         placement="right"
         delay={{ show: 250, hide: 400 }}
         overlay={this.renderTooltip(this.props, text)}
      >
         <AiOutlineQuestionCircle className="text-muted"/>
      </OverlayTrigger>);
    }

    render() {
        return(
         <Card>
            <div className="previlegies-card__top card__top--1">
               <h2>{this.props.previliege.name}</h2>
            </div>
            <Card.Body>
               {this.parseFeatures()}
            </Card.Body>
            <Card.Footer>
               <Button variant="success" id="vip-buy" href={this.state.toggleChecked ? this.props.previliege.link_month : this.props.previliege.link_lifetime} className="btn-price">{this.state.amountMonth}₽</Button>
            </Card.Footer>
            <Card.Footer id="switcher">
               <BootstrapSwitchButton 
                  checked={this.state.toggleChecked}
                  onlabel='Месяц'
                  onstyle='danger'
                  offlabel='Навсегда'
                  //size="m"
                  offstyle='primary'
                  style='w-50 mx-3'
                  onChange={() => {
                     this.handleCheckedPress()
                  }}
               />
            </Card.Footer>
         </Card>
        );
    }
}

export default CardCustom;