import React from "react";
import '../../stylesheets/individuals.css';
import '../../stylesheets/global.css';
import Button from 'react-bootstrap/Button';
import BootstrapSwitchButton from 'bootstrap-switch-button-react';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import { AiFillLock } from 'react-icons/ai';
import { Placement } from "react-bootstrap/esm/Overlay";

export interface Props{
   name: string,
   tooltip: string,
   login_locked: boolean,
   tooltipPlacement: string,
   background: string,
   img_url: string,
   option_basic_link: string,
   option_advanced_link: string,
   discount: number,
   option_basic_cost: number,
   option_advanced_cost: number,
   option_basic_name: string,
   option_advanced_name: string
}

export interface State{
   toggleChecked: boolean,
   amountMonth: number
}


class IndividualsCard extends React.Component<Props, State> {
   constructor(props: Props){
      super(props);
      this.state = {
         toggleChecked: true,
         amountMonth: this.props.option_basic_cost
      }
   }

   renderTooltip = (props: Props, text: string) => {
      return (
      <Tooltip id="nofall-tooltip" {...props}>
         {text}
      </Tooltip>
      );
    }

    renderTooltipBase = (text: string) => {
      if (text){
         return (<OverlayTrigger
            placement={this.props.tooltipPlacement as Placement || 'right'}
            delay={{ show: 250, hide: 400 }}
            overlay={this.renderTooltip(this.props, text)}
         >
            <AiOutlineQuestionCircle className="h5 mb-4"/>
         </OverlayTrigger>);
      }
    }

   handleCheckedPress = () => {
      this.setState({ toggleChecked: !this.state.toggleChecked, amountMonth: !this.state.toggleChecked ? this.props.option_basic_cost : this.props.option_advanced_cost })
   }

   renderDiscount = () =>{
      if(this.props.discount != null && this.props.discount != undefined && this.props.discount > 0){
        return(
         <div className="d-flex align-items-center pl-60px">
            {this.renderButton()}
            <div className="discount__badge">-{this.props.discount}%</div>
         </div>
        )
      }else{
         return(this.renderButton())
      }
   }

   renderButton = () =>{
      if (this.props.login_locked && !localStorage.getItem('steam_id')){
         return(
            <OverlayTrigger
               placement='top'
               delay={{ show: 250, hide: 400 }}
               overlay={this.renderTooltip(this.props, 'Необходимо войти, чтобы приобрести данный товар')}
            >
               <div>
               <Button block variant="success" disabled href={this.state.toggleChecked ? this.props.option_basic_link : this.props.option_advanced_link} className="btn-price">
                  <AiFillLock className="mb-1"/>
                  {this.state.amountMonth}₽
               </Button>
               </div>
            </OverlayTrigger>
         )
      }

      return(<Button variant="success" href={this.state.toggleChecked ? this.props.option_basic_link : this.props.option_advanced_link} className="btn-price">{this.state.amountMonth}₽</Button>)
   }

    render() {
        return(
            <div className="individuals-card" id="ind-card" style={{backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${this.props.img_url})`}}>
               <h2>{this.props.name}{this.renderTooltipBase(this.props.tooltip)}</h2>
               {this.renderDiscount()}
               <BootstrapSwitchButton 
                  checked={this.state.toggleChecked}
                  onlabel={this.props.option_basic_name}
                  onstyle='danger'
                  offlabel={this.props.option_advanced_name}
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