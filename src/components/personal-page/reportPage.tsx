import React from "react";
import '../../stylesheets/personal_page.css';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";
import axios from 'axios';
import enviroment from '../../enviroment'

interface Props{}

interface State{
   suspect_nickname: string,
   details: string,
   email: string,
   requestSucceed: boolean,
   requestFailed: boolean,
   errorText: string,
   loading: boolean
}

class ReportPage extends React.Component<Props, State> {
   constructor(props: Props){
      super(props);

      this.state = {
         suspect_nickname: '',
         details: '',
         email: '',
         requestSucceed: false,
         requestFailed: false,
         errorText: '',
         loading: false
      }
   }

   updateSuspectNickname = (e: any) =>{
      this.setState({suspect_nickname: e.target.value})
   }

   updateEmail = (e: any) =>{
      this.setState({email: e.target.value})
   }

   updateDetails = (e: any) =>{
      this.setState({details: e.target.value})
   }
   
   onHide = () =>{
      this.setState({
         suspect_nickname: '',
         details: '',
         email: '',
         requestSucceed: false,
         requestFailed: false,
         errorText: ''
      })
   }

   validateForm = () =>{
      if (this.state.email.length < 4 || this.state.suspect_nickname.length < 2 || !this.state.email.includes('@') || this.state.details.length < 5){
         this.setState({ errorText: 'Пожалуйста, заполните форму правильно', requestFailed: true, requestSucceed: false, loading: false });
         return false;
      }else{
         return true;
      }
   }

   send = (e: any) =>{
      e.preventDefault()
      this.setState({loading: true}, this.query)
   }

   query = () =>{
      if(this.validateForm()){
         axios.post(`${enviroment.backend_url}/reports/submit_report`,
         {
            suspect_nickname: this.state.suspect_nickname,
            details: this.state.details,
            user: { 
               email: this.state.email,
               steamID: localStorage.getItem('steam_id'),
            }
         })
         .then(res => {
            this.setState({ requestSucceed: true, requestFailed: false, loading: false });
         })
         .catch(error => {
            let err = error.response.data.error;
            this.setState({ errorText: err, requestFailed: true, requestSucceed: false, loading: false });
         });
      }
   }

   renderSpinner = () =>{
      if (this.state.loading){
         return(<Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            variant="light"
            aria-hidden="true"
            style={{marginRight: "4px", marginBottom: "2px"}}
         />)
      }
   }

   render(){
      return(
         <Form>
            <Alert variant='danger' hidden={!this.state.requestFailed }>
               Произошла ошибка:&nbsp; {this.state.errorText}
            </Alert>
            <Alert variant='success' hidden={!this.state.requestSucceed }>
               Репорт успешно отправлен. На адрес <strong>{this.state.email}</strong> отправлено письмо с деталями.
            </Alert>
            <Form.Group controlId="formBasicEmail">
               <Form.Label>Ваш email</Form.Label>
               <Form.Control required type="email" placeholder="Введите email" className="custom-input--transparent" onChange={(e) => this.updateEmail(e)} />
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
               <Form.Label>Никнейм нарушителя</Form.Label>
               <Form.Control required type="text" placeholder="Введите никнейм" className="custom-input--transparent" onChange={(e) => this.updateSuspectNickname(e)} />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
               <Form.Label>Детали</Form.Label>
               <Form.Control as="textarea" rows={3} required onChange={(e) => {this.updateDetails(e)}} className="custom-input--transparent" />
               <Form.Text className="text-muted">
                  Укажите приблизительную дату и время, <a target="_blank" href="https://imgur.com/upload" className="modal__link">ссылку на скриншоты</a>.<br/>
                  Дополнительная информация на Ваше усмотрение.
               </Form.Text>
            </Form.Group>
            <Button variant="success" type="submit" onClick={(e) => this.send(e)}>
               {this.renderSpinner()}
               Отправить
            </Button>
            </Form>
      )
   }
}

export default ReportPage;