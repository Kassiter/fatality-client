import React from "react";
import '../../stylesheets/personal_page.css';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import axios from 'axios';
import enviroment from '../../enviroment'

class PersonalItemForm extends React.Component {
   constructor(props){
      super(props);

      this.state = {
         key: null,
         description: null,
         email: null,
         requestSucceed: false,
         requestFailed: false,
         errorText: ''
      }
   }

   updateKey = (e) =>{
      this.setState({key: e.target.value})
   }

   updateEmail = (e) =>{
      this.setState({email: e.target.value})
   }

   updateDescription = (e) =>{
      this.setState({description: e.target.value})
   }
   
   onHide = () =>{
      this.setState({
         key: null,
         description: null,
         email: null,
         requestSucceed: false,
         requestFailed: false,
         errorText: ''
      })
   }

   send = (e) =>{
      e.preventDefault()
      axios.post(`${enviroment.backend_url}/personal_items/request_item`,
      {
         key: this.state.key,
         description: this.state.description,
         user: { 
            email: this.state.email,
            steamID: localStorage.getItem('steam_id'),
         }
      })
      .then(res => {
         this.setState({ requestSucceed: true, requestFailed: false });
      })
      .catch(error => {
         let err = error.response.data.error;
         this.setState({ errorText: err, requestFailed: true, requestSucceed: false });
      });
   }

   render(){
      return(
         <Form>
            <Alert variant='danger' hidden={!this.state.requestFailed }>
               Произошла ошибка:&nbsp; {this.state.errorText}
            </Alert>
            <Alert variant='success' hidden={!this.state.requestSucceed }>
               Форма успешно отправлена. На адрес <strong>{this.state.email}</strong> отправлено письмо с деталями.
            </Alert>
            <Form.Group controlId="formBasicEmail">
               <Form.Label>Ключ</Form.Label>
               <Form.Control required type="text" placeholder="Введите ключ" onChange={(e) => this.updateKey(e)} />
               <Form.Text className="text-muted">
                  Ключ от приватного скина/трейла
               </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
               <Form.Label>Ссылка на материалы</Form.Label>
               <Form.Control required type="text" placeholder="Введите ссылку" onChange={(e) => this.updateDescription(e)}/>
               <Form.Text className="text-muted">
                  Ссылка на скачивание модели. Если это скинпак, укажите номер скина (Пример: https://gamebanana.com/skins/178798 #2).
                  Ссылка на скачивание трейла.<br/>
                  Если нужна услуга создания из картинки, ссылка на картинку в формате PNG с прозрачным фоном (Пример: https://w0.pngwave.com/png/475/459/star-system-film-gold-star-png-clip-art.png).
               </Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
               <Form.Label>Ваш email</Form.Label>
               <Form.Control required type="email" placeholder="Введите email" onChange={(e) => this.updateEmail(e)}/>
            </Form.Group>
            <Button variant="success" type="submit" onClick={(e) => this.send(e)}>
               Отправить
            </Button>
            </Form>
      )
   }
}

export default PersonalItemForm;