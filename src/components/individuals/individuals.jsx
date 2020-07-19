import React from "react";
import '../../stylesheets/individuals.css'
import IndividualsCard from "./individualsCard";
import axios from 'axios';
import enviroment from '../../enviroment'

class Individuals extends React.Component {
   constructor(props){
      super(props);
      this.state = {
         personal_features: []
      }
   }

   componentDidMount(){
      axios.get(`${enviroment.backend_url}/personal_features`)
      .then(res => {
        this.setState({ personal_features: res.data });
      })
   }

   renderPersonalFeatures = () => {
      let result = []
      this.state.personal_features.forEach(feature => {
         result.push(<IndividualsCard 
            name={feature.name}
            tooltip={feature.tooltip}
            login_locked={feature.login_locked}
            tooltipPlacement={feature.name == 'Personal trail' ? 'left' : 'right'}
            background="personal-skin"
            img_url={feature.img_url}
            option_basic_link={feature.option_basic_link}
            option_advanced_link={feature.option_advanced_link}
            option_basic_cost={feature.option_basic_cost}
            option_advanced_cost={feature.option_advanced_cost}
            option_basic_name={feature.option_name_basic}
            option_advanced_name={feature.option_name_advanced}
         />);
      });
      return result;
   }

    render() {
        return(
            <div className="individuals-section__container">
               <h1>персональные товары</h1>
               <div className="individuals-section__cards-container">
                  {this.renderPersonalFeatures()}
               </div>
            </div>
        );
    }
}

export default Individuals;