import CardDeck from 'react-bootstrap/CardDeck';
import CardCustom from './cardCustom';
import React from "react";
import '../../stylesheets/previlegies.css'
import Tooltip from 'react-bootstrap/Tooltip'
import axios from 'axios';
import enviroment from '../../enviroment'
import InstructionsModal from './instructionsModal';

interface Props{}

interface State{
  [key: string]: any
}

class Privilegies extends React.Component<Props, State> {
   constructor(props: Props){
      super(props);
      this.state = {
         toggleChecked: true,
         amountMonth: 70,
         privilieges: [],
         instructionShown: false
      }
   }

   componentDidMount(){
    axios.get(`${enviroment.backend_url}/privilieges_all`)
    .then(res => {
      this.setState({ privilieges: res.data });
    })
   }

   renderTooltip = (props: Props) => {
      return (
        <Tooltip id="nofall-tooltip" {...props}>
          Не будет стоппить при получении урона
        </Tooltip>
      );
    }

    renderTooltipEndur = (props: Props) => {
      return (
        <Tooltip id="nofall-tooltip" {...props}>
          10HP/Минута
        </Tooltip>
      );
    }

    handleCheckedPress = () => {
      this.setState({ toggleChecked: !this.state.toggleChecked, amountMonth: !this.state.toggleChecked ? 70 : 300 })
    }

    showInstructionModal = () =>{
      this.setState({instructionShown: !this.state.instructionShown})
    }

    renderCards= () => {
      const result: JSX.Element[] = []
      this.state.privilieges.forEach((priviliege: any) => { 
        let instructable = priviliege.name.includes('Admin')
        result.push(<CardCustom previliege={priviliege} instructable={instructable} instruct={this.showInstructionModal} />)
      });
      return result;
    }

    render() {
        return(
            <div className="container previlegies-section__container">
               <h1>Привилегии</h1>
               <CardDeck>
                  {this.renderCards()}
               </CardDeck>
               <InstructionsModal show={this.state.instructionShown} onHide={this.showInstructionModal} />
            </div>
        );
    }
}

export default Privilegies;