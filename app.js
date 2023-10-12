// THIS IS ALL YOUR BACKEND
//Import OpenAI
const openai = require('openai');
//Required .env file variables
require('dotenv').config();
//Set up variables
const express = require('express');
const path = require('path');
const app = express();
//Port variable or use process port if you run it on cloud service
const port = 8083 || process.env.PORT
//Parse our request to the backend
app.use(express.json());
//Use public folder as static root directory
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));

//Create a configuration object and specify OpenAI configuration variables
const configuration = new openai.Configuration({
    organization: process.env.OPENAI_ORG,
    apiKey: process.env.OPENAI_API_KEY
});
// New variable set it to the API using the configuration
const openaiapi = new openai.OpenAIApi(configuration);
//Define routes for the server
//To serve the front end html file to any get request and response and render the interface
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});
// How to send the prompt and get the response back
// The route is /chat
app.post('/chat', async (req, res) => {
    const messages = req.body.messages; //prompt we pass in from the interface
    const model = req.body.model; //model type used to generate the output
    const temp = req.body.temp; //temperature used by the model to decide how random the answer is
    // pass the parameters to openai api
    const completion = await openaiapi.createChatCompletion(
        {
            model: model,
            messages,
            temperature: temp
        }
    );
    // send response back to the client
    res.status(200).json({result: completion.data.choices});
});
//start the server and let it listen to the port
app.listen(port, () => {
    console.log(`HR Assistant app listening on port ${port}`);
});