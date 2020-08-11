import React from "react";
import '../../stylesheets/preloader.css'
import { Spinner } from "react-bootstrap";

class Preloader extends React.Component {
   constructor(props){
      super(props);
      this.state = {

      }
   }

   render(){
      return(
         <div className="preloader__root d-flex justify-content-center">
            <div className="d-flex justify-content-center align-items-center preloader__circle-container">
               <div className="spinner__logo">
                  <Spinner animation="grow" variant="danger" className="preloader__circle" />
               </div>
            </div>
         </div>
      );
   }
}

export default Preloader;