import React from "react";
import '../../stylesheets/individuals.css';
import Button from 'react-bootstrap/Button';
import BootstrapSwitchButton from 'bootstrap-switch-button-react';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import { AiFillLock } from 'react-icons/ai';

class RouletteCard extends React.Component {
   constructor(props){
      super(props);
      this.state = {
         toggleChecked: true,
         amountMonth: this.props.option_basic_cost
      }
   }

   renderTooltip = (props, text) => {
      return (
      <Tooltip id="nofall-tooltip" {...props}>
         {text}
      </Tooltip>
      );
    }

    renderTooltipBase = (text) => {
      if (text){
         return (<OverlayTrigger
            placement={this.props.tooltipPlacement || 'right'}
            delay={{ show: 250, hide: 400 }}
            overlay={this.renderTooltip(this.props, text)}
         >
            <AiOutlineQuestionCircle className="h5 mb-4"/>
         </OverlayTrigger>);
      }
    }

   renderButton = () =>{
         return(
               <div>
               <Button variant="success" href="http://google.com" className="btn-price">
                  100₽
               </Button>
               </div>
         )
   }

    render() {
        return(
            <div className="individuals-card" id="ind-card" style={{backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(https://lh4.googleusercontent.com/j8_oY8Z9dfMMPi071wUejDi3EZOIXBMYtb3LaS0uqzap7zrg0YzWwhC-I51cr2_p8_xsa6zO_UvLrqU=w1848-h1020-rw)`}}>
               <h2>Random{this.renderTooltipBase('Рандом')}</h2>
               {this.renderButton()}
               <div>
               <Button variant="success" href="http://google.com" className="btn-price">
                  Открыть
               </Button>
               </div>
            </div>
        );
    }
}

export default RouletteCard;