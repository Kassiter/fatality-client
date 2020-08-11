import React from "react";
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { FiLogOut } from 'react-icons/fi';
import '../../stylesheets/personal_page.css'
import '../../stylesheets/global.css'

class InstructionsModal extends React.Component {
   constructor(props){
      super(props);
   }

   render(){
      return(
         <Modal
            show={this.props.show}
            onHide={this.props.onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            id="personal-page"
         >
         <Modal.Header closeButton className='personal-page__header'>
         </Modal.Header>
         <Modal.Body className="help__body">
            <div className="d-flex flex-column">
               <h5 className="text-left text-muted">Внимание! Данная инструкция предназначена только для покупки Admin+</h5>
      <h5 className="text-left text-muted">Если вы приобритаете VIP/Supreme, после получения ключа зайдите на сервер и впишите в консоль: key {"<ключ>"}</h5>
               <h4 className="text-left">1. Необходимо перейти к покупке ключа, нажав на кнопку с ценой внизу карточки.</h4>
               <div className="instruction__buy-btn align-self-center"></div>
               <h4 className="text-left">2. Приобрести товар, указав ВАШ РЕАЛЬНЫЙ email. (На него придёт ключ)</h4>
               <h4 className="text-left">3. Войти в личный кабинет на нашем сайте и заполнить форму "персональный товар" таким образом:</h4>
               <h5 className="text-left ml-3">3.1 В поле "Ключ" укажите ключ, который вы приобрели.</h5>
               <h5 className="text-left ml-3">3.2 Поле "Ссылка на материалы" оставьте пустым.</h5>
               <h5 className="text-left ml-3">3.3 В поле "Ваш email" укажите действующий email.</h5>
               <h5 className="text-left ml-3">3.4 Нажмите "Отправить".</h5>
               <h5 className="text-left text-muted">Пример заполнения формы:</h5>
               <div className="instruction__form align-self-center"></div>
               <h4 className="text-left">4. Ожидайте обратную связь.</h4>
            </div>
         </Modal.Body>
       </Modal>)
   }
}

export default InstructionsModal;