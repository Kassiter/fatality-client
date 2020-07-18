import React from "react";
import '../../stylesheets/individuals.css'
import IndividualsCard from "./individualsCard"

class Individuals extends React.Component {
   constructor(props){
      super(props);
      this.state = {
         
      }
   }

    render() {
        return(
            <div className="individuals-section__container">
               <h1>персональные товары</h1>
               <div className="individuals-section__cards-container">
                  <IndividualsCard 
                     name="Personal skin"
                     background="personal-skin"
                     link_month="http://google.com"
                     link_lifetime="http://google.com"
                     link_lifetime="http://google.com"
                     cost_month="50"
                     cost_lifetime="350"
                     onlabel="Месяц"
                     offlabel="Навсегда"
                  />

                  <IndividualsCard 
                     name="Credits"
                     background="credits"
                     link_month="http://google.com"
                     link_lifetime="http://google.com"
                     link_lifetime="http://google.com"
                     cost_month="50"
                     cost_lifetime="350"
                     onlabel="25k"
                     offlabel="50k"
                  />

                  <IndividualsCard 
                     name="Personal trail"
                     background="trails"
                     link_month="http://google.com"
                     link_lifetime="http://google.com"
                     link_lifetime="http://google.com"
                     cost_month="50"
                     cost_lifetime="350"
                     onlabel="Месяц"
                     offlabel="Навсегда"
                  />
               </div>
            </div>
        );
    }
}

export default Individuals;