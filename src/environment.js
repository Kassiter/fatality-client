
const environment = {
   backend_url: process.env.NODE_ENV == 'development' ? 'http://localhost:3000' : 'https://fatality-server.herokuapp.com',
   STEAM_WEB_API_KEY: 'FD36738ABF7E2B4378188F0DAFACD07D'
}

export default environment;