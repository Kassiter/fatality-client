import React from "react";
import '../../stylesheets/preloader.css'
import { Spinner } from "react-bootstrap";

interface State{
   degrees: number
}

interface Props{}

class Preloader extends React.Component<Props, State> {
   constructor(props: Props){
      super(props)
      this.state = {
         degrees: 0
      }
   }

   componentDidMount(){
      setInterval(() => {
         const interv = setInterval(() => {
            this.setState({degrees: this.state.degrees+2})
            if (this.state.degrees % 360 == 0){
               clearInterval(interv)
            }
         }, 1)
      }, 1000)
   }

   render(){
      return(
         <div className="preloader__root d-flex justify-content-center">
            <div className="d-flex justify-content-center align-items-center preloader__circle-container">
               <div className="spinner__logo" style={{transform: `rotate(${this.state.degrees}deg)`, transitionDuration: '0.1s'}}>
                  <Spinner animation="grow" variant="danger" className="preloader__circle" />
               </div>
            </div>
         </div>
      );
   }
}

export default Preloader;