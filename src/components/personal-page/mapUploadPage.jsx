import React from 'react'
import axios, { post } from 'axios';
import enviroment from '../../enviroment'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class MapUploadPage extends React.Component {

  constructor(props) {
    super(props);
    this.state ={
      file:null
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
    const url = `${enviroment.backend_url}/prime_moder_tasks/upload_map`;
    const formData = new FormData();
    formData.append('file',file)
    formData.append('steamID', localStorage.getItem('steam_id'))
    formData.append('auth_token', localStorage.getItem('auth_token'))
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


  render() {
    return (
      <form onSubmit={this.onFormSubmit}>
        <h2 className="text-center">Загрузить карту</h2>
        <Form>
          <Form.File 
            id="custom-file"
            label="Архив с картой"
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



export default MapUploadPage;