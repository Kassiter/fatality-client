
const environment = {
   backend_url: process.env.NODE_ENV == 'development' ? 'http://localhost:3000' : 'https://fatality-server.herokuapp.com',
   STEAM_WEB_API_KEY: '098BCD27D7E693F87271834C031B99C1'
}

export default environment;