import React from "react";
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Alert from 'react-bootstrap/Alert'
import { FiLogOut } from 'react-icons/fi';
import '../../stylesheets/personal_page.css'
import '../../stylesheets/global.css'
import '../../stylesheets/case.css'
import environment from '../../environment'
import axios from 'axios'
import { AiFillLock } from 'react-icons/ai';

interface Props{
   show: boolean,
   onHide(): void,
   requestSucceed: boolean,
   requestFailed: boolean
}

interface State{
   seeds: Array<any>,
   margin: number,
   spin_allowed: boolean,
   key_invalid: boolean,
   key: string,
   email_empty: boolean,
   email: string,
   key_valid: boolean,
   requestFailed: boolean,
   requestSucceed: boolean,
   errorText: string,
}

class CaseModal extends React.Component<Props, State>{
   constructor(props: Props){
      super(props);

      this.state ={ 
         seeds: [],
         margin: 0,
         spin_allowed: false,
         key_invalid: false,
         key: '',
         email_empty: true,
         email: '',
         key_valid: false,
         requestFailed: false,
         requestSucceed: false,
         errorText: ''
      }
   }

   componentDidMount(){
      this.generateSeed();
   }

   generateSeed = () =>{
      let seed = []

      for (var k = 0; k < 333; k++) {
         seed.push({name: 'Кредиты [25k]', _class: 'milspec_blue', pic: 'https://i.imgur.com/jrGwVvX.png', type: 'shop_credits', param1: '25000', param2: ''})
      }

      for (var k = 0; k < 97; k++) {
         seed.push({name: 'VIP [Месяц]', _class: 'restricted_purple', pic: 'https://i.imgur.com/dsz1Cqa.jpg', type: 'vip_add', param1: '[VIP]', param2: 2592000})
      }

      for (var k = 0; k < 125; k++) {
         seed.push({name: 'Кредиты [50k]', _class: 'restricted_purple', pic: 'https://i.imgur.com/EH4f8Yo.png', type: 'shop_credits', param1: '50000', param2: ''})
      }

      for (var k = 0; k < 40; k++) {
         seed.push({name: 'Supreme [Месяц]', _class: 'classified_pink', pic: 'https://i.imgur.com/Pqlhamd.jpg', type: 'vip_add', param1: '[Supreme]', param2: 2592000})
      }

      for (var k = 0; k < 5; k++) {
         seed.push({name: 'Admin+ [Месяц]', _class: 'coverted_red', pic: 'https://i.imgur.com/LLDJYzh.png', param1: 'admin-m'})
      }
      
      for (var k = 0; k < 5; k++) {
         seed = this.shuffle(seed)
      }

      this.addUltra(seed)
   }

   shuffle = (arra1: Array<any>) => {
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

   requestItem = (item: any) => {
      axios.post(`${environment.backend_url}/personal_items/request_random_item`,
      {
         key: this.state.key,
         email: this.state.email,
         prize: item,
      })
      .then(res => {
         this.setState({key_invalid: false, key_valid: true, requestFailed: false, requestSucceed: true}, this.clearMessages);
      })
      .catch(error => {
         let err = error.response.data.error;
         this.setState({ errorText: err, requestFailed: true, requestSucceed: false}, this.clearMessages);
      });
   }

   clearMessages = () =>{
      setTimeout(() => {
         this.clearFails()
      }, 4000);
   }

   clearFails = () =>{
      this.setState({ errorText: '', requestFailed: false, requestSucceed: false});
   }

   spinUp = () => {
      this.generateSeed()
      let prize = this.state.seeds[342]

      setTimeout(() => {
         this.requestItem(prize)
      }, 1500);
      this.setState({margin: 0, spin_allowed: false}, this.spin)
   }

   addUltra = (seed: any) =>{
      for (let i = 0; i < 9; i++) {
         seed[Math.floor(Math.random() * (340 - 0 + 1) + 0)] = {name: 'Ultra Admin [Месяц]', _class: 'extremly_rare', pic: 'https://i.imgur.com/f4FS2yE.png'}
      }
      this.setState({seeds: seed})
   }

   renderPrizes = () =>{
     let res: Array<JSX.Element> = []
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
         {name: 'Кредиты [25k]', _class: 'milspec_blue', pic: 'https://i.imgur.com/jrGwVvX.png'},
         {name: 'VIP [Месяц]', _class: 'restricted_purple', pic: 'https://i.imgur.com/dsz1Cqa.jpg'},
         {name: 'Кредиты [50k]', _class: 'restricted_purple', pic: 'https://i.imgur.com/EH4f8Yo.png'},
         {name: 'Supreme [Месяц]', _class: 'classified_pink', pic: 'https://i.imgur.com/Pqlhamd.jpg'},
         {name: 'Admin+ [Месяц]', _class: 'coverted_red', pic: 'https://i.imgur.com/LLDJYzh.png'},
         {name: 'Ultra Admin [Месяц]', _class: 'extremly_rare', pic: 'https://i.imgur.com/f4FS2yE.png'}
      ]
      let cards: Array<JSX.Element> = []

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
      debugger;
      let marg = 400
      let flag = true
      let flag1 = false
      
      let i = setInterval(() => {
         if(marg < 5 && flag){
            marg+=100
            this.setState({margin: this.state.margin+marg})
         }else {
            flag1 = true
            flag = false
            marg-= 3
            this.setState({margin: this.state.margin+marg})
         }

         if(marg < 5 && flag1){
            clearInterval(i)
         }
      }, 0.1);
      this.setState({spin_allowed: false})
   }

   renderLock = () =>{
      if (!this.state.spin_allowed){
         return(<AiFillLock className="mb-1"/>)
      }
   }

   validateKey = (e: any) =>{
      if (e.target.value.length > 40){
         let keyy = e.target.value
         axios.post(`${environment.backend_url}/personal_items/validate_random_key`,
         {
            key: keyy
         })
         .then(res => {
            this.setState({key_invalid: false, key_valid: true, key: keyy});
            if (this.state.email.length > 0){
               this.setState({spin_allowed: true})
            }
         })
         .catch(error => {
            this.setState({ key_invalid: true, spin_allowed: false, key_valid: false});
         });
      }
   }

   changeEmail = (e: any) => {
      if (e.target.value.length > 0 && this.state.key_valid){
         this.setState({email: e.target.value, spin_allowed: true})
      }else if(e.target.value.length < 1){
         this.setState({spin_allowed: false})
      }
         
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
            <Alert variant='danger' hidden={!this.state.requestFailed } className="case__alert">
               Произошла ошибка:&nbsp; {this.state.errorText}
            </Alert>
            <Alert variant='success' hidden={!this.state.requestSucceed } className="case__alert">
               На адрес <strong>{this.state.email}</strong> отправлено письмо с ключом.
            </Alert>
            <div className="d-flex flex-column align-items-center">
               <div className="radial d-flex flex-column justify-content-center align-items-center">
                  <div className="radial-inner d-flex justify-content-center align-items-center">
                     <div className="stick"></div>
                  </div>
                  <div className="rollin-cards" style={{marginRight: `${this.state.margin}px`}}>
                     {this.renderPrizes()}
                  </div>
                  <div className="case__contols">
                     <Form.Control type="text" placeholder="Ключ" className={this.state.key_invalid ? 'input--error case__input' : 'case__input'} onChange={this.validateKey} />
                     <Form className="case__form" onSubmit={e => { e.preventDefault(); }}>
                        <Form.Control type="email" placeholder="Email" onChange={this.changeEmail} className={this.state.email_empty ? 'case__input' : 'case__input'} />
                        <Button variant="success" size='lg' disabled={!this.state.spin_allowed} onClick={this.spinUp} className="spin__btn" type="button">
                           {this.renderLock()}
                           Открыть
                        </Button>
                     </Form>
                  </div>
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