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
import div from 'react-bootstrap/Badge'
import Tooltip from 'react-bootstrap/Tooltip'
import BootstrapSwitchButton from 'bootstrap-switch-button-react';

class CardCustom extends React.Component {

   constructor(props){
      super(props);
      this.state = {
         toggleChecked: true,
         amountMonth: this.countDiscount(this.props.previliege.cost_month, this.props.previliege.discount),
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
      this.setState({ toggleChecked: !this.state.toggleChecked, amountMonth: !this.state.toggleChecked ? this.countDiscount(this.props.previliege.cost_month, this.props.previliege.discount) : this.countDiscount(this.props.previliege.cost_lifetime, this.props.previliege.discount) })
    }

    countDiscount = (price, discount) =>{
      return ((discount != undefined && discount != null && discount > 0) ? price-(price*(discount/100)) : price)    
    }

    renderDiscount = () =>{
       if(this.props.previliege.discount != null && this.props.previliege.discount != undefined && this.props.previliege.discount > 0){
         return(<div variant="danger" className="discount__badge">-{this.props.previliege.discount}%</div>)
       }
    }

    parseFeatures = () =>{
       let privilieges_features = [];
       this.props.previliege.privilieges_features.forEach(feature => {
          privilieges_features.push( 
            <Card.Text className="previlegies-card__text">
               {React.createElement(this.state[feature.icon], null)}&nbsp;
               {feature.description} <span className="text-muted">{feature.misc ? feature.misc : null}</span>&nbsp;
               {feature.tooltip ? this.renderTooltipBase(feature.tooltip) : false}
            </Card.Text>
         );
       });
       return(privilieges_features);
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

    renderInstructionButton = () => {
       if(this.props.instructable){
         return(<Button variant="outline-secondary" onClick={this.props.instruct} className="ml-2">Как купить?</Button>)
       }
    }

    render() {
        return(
         <Card>
            <div className="previlegies-card__top card__top--1">
            <div className="d-flex align-items-center"><h2>{this.props.previliege.name}</h2>{this.renderDiscount()}</div>
            </div>
            <Card.Body>
               {this.parseFeatures()}
            </Card.Body>
            <Card.Footer>
               <Button variant="success" id="vip-buy" href={this.state.toggleChecked ? this.props.previliege.link_month : this.props.previliege.link_lifetime} className="btn-price">{this.state.amountMonth}₽</Button>
               {this.renderInstructionButton()}
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