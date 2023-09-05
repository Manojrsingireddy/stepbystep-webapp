import axios from 'axios';

// add headers for ngrock skip browser warning set to true once deploy api to ngrok
// export default axios.create({
//     baseURL: 'https://ea56-2600-1700-d00-c280-2469-b51f-f8d9-83d2.ngrok.io/',
//     headers : {'ngrok-skip-browser-warning':'true'}
// });

export default axios.create({
    baseURL: ' https://mcie1hl747.execute-api.us-east-1.amazonaws.com/Prod/'
});