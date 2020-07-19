
const enviroment = {
   backend_url: process.env.NODE_ENV == 'development' ? 'http://localhost:3000' : 'https://rollindeuce-backend.herokuapp.com/'
}

export default enviroment;