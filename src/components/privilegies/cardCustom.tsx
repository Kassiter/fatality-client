import CardDeck from 'react-bootstrap/CardDeck';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import React from "react";
import '../../stylesheets/previlegies.css'
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import div from 'react-bootstrap/Badge'
import Tooltip from 'react-bootstrap/Tooltip'
import BootstrapSwitchButton from 'bootstrap-switch-button-react';

interface Props{
   previliege: any,
   instructable: boolean,
   instruct(): void 
}

interface State{
   toggleChecked: boolean,
   amountMonth: number,
   [key: string]: any
}

class CardCustom extends React.Component<Props, State>{

   constructor(props: Props){
      super(props);
      this.state = {
         toggleChecked: true,
         amountMonth: this.props.previliege.cost_month
      }
   }

   renderTooltip = (props: Props, text: string) => {
      return (
        <Tooltip id="nofall-tooltip" {...props}>
          {text}
        </Tooltip>
      );
    }

    handleCheckedPress = () => {
      this.setState({ toggleChecked: !this.state.toggleChecked, amountMonth: !this.state.toggleChecked ? this.props.previliege.cost_month : this.props.previliege.cost_lifetime })
    }


    renderInstructionButton = () => {
       if(this.props.instructable){
         return(<Button variant="outline-secondary" onClick={this.props.instruct} className="ml-2">Как купить?</Button>)
       }
    }

    render() {
        return(
            <div className="priviliege" style={{backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${this.props.previliege.img_url})`}}>
               <div className="darken">
                  <div className="buy_buttons">
                     <Button variant="outline-danger" className="ml-2 buy-priv">Месяц</Button>
                     <Button variant="outline-success" className="ml-2 buy-priv">Навсегда</Button>
                  </div>
               </div>
            </div>
        );
    }
}

export default CardCustom;