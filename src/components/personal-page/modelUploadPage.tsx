import React from 'react'
import axios from 'axios';
import environment from '../../environment'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

interface Props{}

interface State{
  file: any,
  model_name: any,
  team: any,
  price: any
}

class ModelUploadPage extends React.Component<Props, State>{

  constructor(props: Props) {
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

  submit = (e: any) => {
    e.preventDefault() // Stop form submit
    this.fileUpload(this.state.file).then((response: any)=>{
      console.log(response.data);
    })
  }

  onChange(e: any) {
    this.setState({file:e.target.files[0]})
  }

  changeTeam = (e: any) => {
    this.setState({team: e.target.value})
  }

  fileUpload(file: any){
    const url = `${environment.backend_url}/prime_moder_tasks/upload_skin`;
    const formData = new FormData();
    formData.append('file',file)
    formData.append('steamID', localStorage.getItem('steam_id') as string)
    formData.append('auth_token', localStorage.getItem('auth_token') as string)
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
    return axios.post(url, formData, config)
  }

  changeModelName = (e: any) =>{
    this.setState({model_name: e.target.value})
  }

  changePrice = (e: any) =>{
    this.setState({price: e.target.value})
  }

  render() {
    return (
      <form>
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