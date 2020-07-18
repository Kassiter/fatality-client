import CardDeck from 'react-bootstrap/CardDeck';
import CardCustom from './cardCustom';
import React from "react";
import '../../stylesheets/previlegies.css'
import Tooltip from 'react-bootstrap/Tooltip'
import vip1 from '../../vip1.json'
import supreme from '../../supreme.json'
import admin_plus from '../../admin_plus.json'
import ScrollableAnchor from 'react-scrollable-anchor';
import axios from 'axios';

class Privilegies extends React.Component {
   constructor(props){
      super(props);
      this.state = {
         toggleChecked: true,
         amountMonth: 70,
         privilieges: []
      }
   }

   componentDidMount(){
    axios.get(`http://localhost:3000/privilieges_all`)
    .then(res => {
      this.setState({ privilieges: res.data });
    })
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

    renderCards= () => {
      const result = []
      this.state.privilieges.forEach(priviliege => {
        result.push(<CardCustom previliege={priviliege} />)
      });
      return result;
    }

    render() {
        return(
            <div className="container previlegies-section__container">
               <ScrollableAnchor id={'privilegies'}><div></div></ScrollableAnchor>
               <h1>Привилегии</h1>
               <CardDeck>
                  {this.renderCards()}
               </CardDeck>
            </div>
        );
    }
}

export default Privilegies;