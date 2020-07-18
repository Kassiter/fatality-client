import React from "react";
import '../../stylesheets/individuals.css';
import Button from 'react-bootstrap/Button';
import BootstrapSwitchButton from 'bootstrap-switch-button-react';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { AiOutlineQuestionCircle } from 'react-icons/ai';

class IndividualsCard extends React.Component {
   constructor(props){
      super(props);
      this.state = {
         toggleChecked: true,
         amountMonth: this.props.cost_month
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

   handleCheckedPress = () => {
      this.setState({ toggleChecked: !this.state.toggleChecked, amountMonth: !this.state.toggleChecked ? this.props.cost_month : this.props.cost_lifetime })
    }

    render() {
        return(
            <div className={`individuals-card ${this.props.background}`} id="ind-card">
               <h2>{this.props.name}{this.renderTooltipBase(this.props.tooltip)}</h2>
               <Button variant="success" href={this.state.toggleChecked ? this.props.link_month : this.props.link_lifetime} className="btn-price">{this.state.amountMonth}₽</Button>
               <BootstrapSwitchButton 
                  checked={this.state.toggleChecked}
                  onlabel={this.props.onlabel}
                  onstyle='danger'
                  offlabel={this.props.offlabel}
                  //size="m"
                  offstyle='primary'
                  style='w-50 mx-3'
                  onChange={() => {
                     this.handleCheckedPress()
                  }}
               />
            </div>
        );
    }
}

export default IndividualsCard;