import React from 'react'
import axios, { post } from 'axios';
import enviroment from '../../enviroment'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class ModelUploadPage extends React.Component {

  constructor(props) {
    super(props);
    this.state ={
      file:null,
      model_name: null,
      team: null,
      price: null
    }
    this.onChange = this.onChange.bind(this)
    this.fileUpload = this.fileUpload.bind(this)
  }

  submit = (e) => {
    e.preventDefault() // Stop form submit
    this.fileUpload(this.state.file).then((response)=>{
      console.log(response.data);
    })
  }

  onChange(e) {
    this.setState({file:e.target.files[0]})
  }

  changeTeam = (e) => {
    this.setState({team: e.target.value})
  }

  fileUpload(file){
    const url = `${enviroment.backend_url}/prime_moder_tasks/upload_skin`;
    const formData = new FormData();
    formData.append('file',file)
    formData.append('steamID', localStorage.getItem('steam_id'))
    formData.append('auth_token', localStorage.getItem('auth_token'))
    formData.append('model_name', this.state.model_name)
    formData.append('model_team', this.state.team)
    formData.append('model_price', this.state.price)
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }

    const params = {
       formData: formData,
       steamID: localStorage.getItem('steam_id'),
       auth_token: localStorage.getItem('auth_token')
    }
    return  post(url, formData,config)
  }

  changeModelName = (e) =>{
    this.setState({model_name: e.target.value})
  }

  changePrice = (e) =>{
    this.setState({price: e.target.value})
  }

  render() {
    return (
      <form onSubmit={this.onFormSubmit}>
        <h2 className="text-center">Загрузить скин</h2>
        <Form>
          <Form.Control placeholder="Имя скина в shop" onChange={this.changeModelName} required />
          <Form.Text className="text-muted">
            Пример: DeadPool [CT]
          </Form.Text>
          <br/>
          <Form.Control placeholder="Цена" onChange={this.changePrice} required />
          <br/>
          <Form.Label>Команда</Form.Label>
          <Form.Control as="select" onChange={this.changeTeam}>
            <option>t</option>
            <option>ct</option>
          </Form.Control>
          <br/>
          <Form.File 
            id="custom-file"
            label="Архив со скином"
            onChange={this.onChange}
            required
          />
        </Form>
        <br/>
        <Button variant="primary" onClick={this.submit} className="justify-self-end" >
          Отправить
        </Button>
      </form>
   )
  }
}



export default ModelUploadPage;