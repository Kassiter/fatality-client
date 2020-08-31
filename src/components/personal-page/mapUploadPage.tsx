import React from 'react'
import axios from 'axios';
import environment from '../../environment'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

interface Props{}

interface State{
  file: any
}

class MapUploadPage extends React.Component<Props, State>{

  constructor(props: Props) {
    super(props);
    this.state ={
      file:null
    }
    this.onChange = this.onChange.bind(this)
    this.fileUpload = this.fileUpload.bind(this)
  }

  submit = (e: any) => {
    e.preventDefault() // Stop form submit
    this.fileUpload(this.state.file).then((response)=>{
      console.log(response.data);
    })
  }

  onChange(e: any) {
    this.setState({file:e.target.files[0]})
  }

  fileUpload(file: any){
    const url = `${environment.backend_url}/prime_moder_tasks/upload_map`;
    const formData = new FormData();
    formData.append('file',file)
    formData.append('steamID', localStorage.getItem('steam_id') as string)
    formData.append('auth_token', localStorage.getItem('auth_token') as string)
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
    return axios.post(url, formData,config)
  }


  render() {
    return (
      <form>
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