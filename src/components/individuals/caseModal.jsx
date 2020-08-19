import React from "react";
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { FiLogOut } from 'react-icons/fi';
import '../../stylesheets/personal_page.css'
import '../../stylesheets/global.css'
import '../../stylesheets/case.css'

class CaseModal extends React.Component {
   constructor(props){
      super(props);

      this.state ={ 
         seeds: [],
         margin: 0,
         spin_allowed: true
      }
   }

   componentDidMount(){
      this.generateSeed();
   }

   generateSeed = () =>{
      let seed = []

      for (var k = 0; k < 501; k++) {
         seed.push({name: 'Кредиты [25k]', _class: 'milspec_blue', pic: 'https://i.imgur.com/IC2TS45.jpg', bid: 'k-25'})
      }

      for (var k = 0; k < 75; k++) {
         seed.push({name: 'VIP [Месяц]', _class: 'restricted_purple', pic: 'https://i.imgur.com/dsz1Cqa.jpg', bid: 'vip-m'})
      }

      for (var k = 0; k < 125; k++) {
         seed.push({name: 'Кредиты [50k]', _class: 'restricted_purple', pic: 'https://i.imgur.com/IC2TS45.jpg', bid: 'k-50'})
      }

      for (var k = 0; k < 40; k++) {
         seed.push({name: 'Supreme [Месяц]', _class: 'classified_pink', pic: 'https://i.imgur.com/Pqlhamd.jpg', bid: 'supreme-m'})
      }

      for (var k = 0; k < 5; k++) {
         seed.push({name: 'Admin+ [Месяц]', _class: 'coverted_red', pic: 'https://i.imgur.com/LLDJYzh.png', bid: 'admin-m'})
      }
      
      for (var k = 0; k < 5; k++) {
         seed = this.shuffle(seed)
      }

      this.setState({seeds: seed})
   }

   shuffle = (arra1) => {
      var ctr = arra1.length, temp, index;
  
      while (ctr > 0) {
          index = Math.floor(Math.random() * ctr);
          ctr--;
          temp = arra1[ctr];
          arra1[ctr] = arra1[index];
          arra1[index] = temp;
      }
      return arra1;
   }

   spinUp = () => {
      let seed = this.state.seeds
      seed = this.shuffle(seed)
      let prize = seed[385].bid
      console.log(prize)
      this.setState({seeds: seed, margin: 0, spin_allowed: false}, this.spin)
   }

   renderPrizes = () =>{
     let res = []
     this.state.seeds.forEach((prize, index) => {
        res.push(
           <div className="rollin_prize" style={{backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${prize.pic})`}}>
            <div className={`class_label ${prize._class}`}>
               <div className="prize__name">{prize.name}</div> 
            </div>   
           </div>
        )
     });
     return res;
   }
   
   renderAllCards = () => {
      let items = [
         {name: 'Кредиты [25k]', _class: 'milspec_blue', pic: 'https://i.imgur.com/IC2TS45.jpg'},
         {name: 'VIP [Месяц]', _class: 'restricted_purple', pic: 'https://i.imgur.com/dsz1Cqa.jpg'},
         {name: 'Кредиты [50k]', _class: 'restricted_purple', pic: 'https://i.imgur.com/IC2TS45.jpg'},
         {name: 'Supreme [Месяц]', _class: 'classified_pink', pic: 'https://i.imgur.com/Pqlhamd.jpg'},
         {name: 'Admin+ [Месяц]', _class: 'coverted_red', pic: 'https://i.imgur.com/LLDJYzh.png'}
      ]
      let cards = []

      items.forEach(prize => {
         cards.push(
            <div className="rollin_prize prize--sm" style={{backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${prize.pic})`}}>
            <div className={`class_label ${prize._class}`}>
               <div className="prize__name">{prize.name}</div> 
            </div>   
           </div>
         )
      });
      return cards;
   }

   spin = () => {
      let marg = 400
      let flag = true
      let flag1 = false
      
      let i = setInterval(() => {
         if(marg < 5 && flag){
            marg+=400
            this.setState({margin: this.state.margin+marg})
         }else {
            flag1 = true
            flag = false
            marg-= 10
            this.setState({margin: this.state.margin+marg})
         }

         if(marg < 5 && flag1){
            this.setState({spin_allowed: true})
            clearInterval(i)
         }
      }, 0.1);
   }


   render(){
      return(
         <Modal
            show={this.props.show}
            onHide={this.props.onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            id="case__modal"
         >
         <Modal.Header closeButton className='personal-page__header case__header'>
         </Modal.Header>
         <Modal.Body className="case__body">
            <div className="d-flex flex-column align-items-center">
               <div className="radial d-flex flex-column justify-content-center align-items-center">
                  <div className="radial-inner d-flex justify-content-center align-items-center">
                     <div className="stick"></div>
                  </div>
                  <div className="rollin-cards" style={{marginRight: `${this.state.margin}px`}}>
                     {this.renderPrizes()}
                  </div>
                  <Button variant="success" size='lg' disabled={!this.state.spin_allowed} onClick={this.spinUp} className="spin__btn">Открыть</Button>
               </div>

               <div className="all-prizes">
                  {this.renderAllCards()}
               </div>
            </div>
         </Modal.Body>
       </Modal>)
   }
}

export default CaseModal;