import React from "react";
import '../../stylesheets/individuals.css';
import Button from 'react-bootstrap/Button';
import BootstrapSwitchButton from 'bootstrap-switch-button-react';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import { AiFillLock } from 'react-icons/ai';
import CaseModal from './caseModal'

interface Props{}

interface State{
   toggleChecked: boolean,
   caseModalToggled: boolean
}

class RouletteCard extends React.Component<Props, State>{
   constructor(props: Props){
      super(props);
      this.state = {
         toggleChecked: true,
         caseModalToggled: false
      }
   }

   componentDidUpdate(){
      if (this.state.caseModalToggled){
         document.getElementById('root')!.classList.add("blurred");
      }else{
         document.getElementById('root')!.classList.remove("blurred");
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
            placement={'right'}
            delay={{ show: 250, hide: 400 }}
            overlay={this.renderTooltip(this.props, text)}
         >
            <AiOutlineQuestionCircle className="h5 mb-4"/>
         </OverlayTrigger>);
      }
    }

    toggleCaseModal = () => {
      this.setState({caseModalToggled: !this.state.caseModalToggled})
    }

   renderButton = () =>{
         return(
               <div>
               <Button variant="success" href="https://primearea.biz/buy/234194/" className="btn-price">
                  100₽
               </Button>
               </div>
         )
   }

    render() {
        return(
            <div className="individuals-card" id="ind-card" style={{backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(https://i.imgur.com/rR6TjXd.jpg)`}}>
               <h2>Random{this.renderTooltipBase('Рандом')}</h2>
               {this.renderButton()}
               <div>
               <Button variant="success" onClick={this.toggleCaseModal} className="btn-price">
                  Открыть
               </Button>
               </div>
               <CaseModal show={this.state.caseModalToggled} onHide={this.toggleCaseModal} requestSucceed={false} requestFailed={false} />
            </div>
        );
    }
}

export default RouletteCard;