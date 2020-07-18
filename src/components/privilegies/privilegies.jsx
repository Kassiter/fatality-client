import CardDeck from 'react-bootstrap/CardDeck';
import CardCustom from './cardCustom';
import React from "react";
import '../../stylesheets/previlegies.css'
import Tooltip from 'react-bootstrap/Tooltip'
import vip1 from '../../vip1.json'
import supreme from '../../supreme.json'
import admin_plus from '../../admin_plus.json'
import ScrollableAnchor from 'react-scrollable-anchor';

class Privilegies extends React.Component {
   constructor(props){
      super(props);
      this.state = {
         toggleChecked: true,
         amountMonth: 70,
         vip: vip1,
         supreme: supreme,
         admin_plus: admin_plus
      }
   }

   componentDidMount(){
      console.log(vip1)
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
               <ScrollableAnchor id={'privilegies'}><div></div></ScrollableAnchor>
               <h1>Привилегии</h1>
               <CardDeck>
                  <CardCustom previliege={this.state.vip} />
                  <CardCustom previliege={this.state.supreme} />
                  <CardCustom previliege={this.state.admin_plus} />
                  <CardCustom previliege={this.state.vip} />
               </CardDeck>
            </div>
        );
    }
}

export default Privilegies;