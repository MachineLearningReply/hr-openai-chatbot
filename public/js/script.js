//THIS IS THE LOGIC USED BY THE CHATBOT

//Get reference to our submit button and chatbot field defined in the html file (look at their ids)
const submit = document.getElementById("submit");
const upload = document.getElementById("upload");
const userInput = document.getElementById("user-input");
const jobInput = document.getElementById("job-desc-input");
const cvInput = document.getElementById("cv-upload")
const chatHistory = document.getElementById("chat-history");
const loading = document.getElementById("spinner");
//Array that will store the chat hystory
let promptResponses = [];

//Define the model you want to use
const gpt_model = "gpt-4" // or "gpt-3.5-turbo"

//Store model feedback
var application_feedback;

//Util function to read the uploaded txt file
function uploadFile() {
    var fileInput = cvInput;
    var file = fileInput.files[0];

    if (file) {
      return new Promise((resolve, reject) => {
        var reader = new FileReader();

        reader.onload = function(e) {
          var cv_content = e.target.result; // File content
          console.log(cv_content);
          resolve(cv_content); // Resolve the promise with the file content
        };

        reader.onerror = function(e) {
          reject(e); // Reject the promise if an error occurs
        };

        reader.readAsText(file);
      });
    } else {
      console.log('No file selected');
      return Promise.reject('No file selected');
    }
  }

//Our calls to the API
// Start conversation with a system messag based on specific task list
const initializeConversation = async () => {
    //Get the user input field value and send API Request
    //Set loading spinner effect
    loading.classList.remove("visually-hidden");
    submit.classList.add("visually-hidden");
    upload.classList.add("visually-hidden");

    //Start the conversation with this intro request
    const intro_text = "Hi, I would like to start a job application process \
    for a job position I find very attractive.\
    First, I would like to share with you the role description I am applying for\
    and receive your confirmation you have seen and unserstood it.\
    Secondly, I will share with my curriculum vitae,\
    which again I would like you to summirise and acknowledge.\
    Finally, I would like to get your judgment if I would be a suitable candidate."
    const response = await fetch('/chat', {
        method: 'POST',
        body: JSON.stringify({
            model: gpt_model,
            messages: [
                {"role": "system", "content":"You are a professional, friendly and helpful HR assistant."},
                {"role": "user", "content": intro_text}
            ],
            temp: 0.3
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const responseData = await response.json();
    const message = responseData.result[0].message.content;
    console.log(message);

    //Store our previous messages
    promptResponses.push({question: intro_text, response: message});

    const historyElement = document.createElement('div');
    historyElement.innerHTML = `<li class="list-group-item"><b>Candidate</b>: ${intro_text}</li>
    <li class="list-group-item"><b>HR Assistant</b>: ${message}</li>`;
    chatHistory.append(historyElement);
}

// Provide the inputs
const forwardJobdescription = async (cv_content) => {
    //Continue the conversation by providing the user prompted job description
    const job_desc = jobInput.value;
    job_desc_input = 'Thank you so much for your help. Here you find the job description I am applying for: """ '
    job_desc_input += job_desc
    job_desc_input += ' """'

    var cv_input = 'Now I provide you my curriculum vitae. Please summirise the important information out of it. \
    Please, do not forget to provide me your professional opinion based on the job requirements and my qualifications.\
    Here it is: """ ';
    //Read uploaded txt file
    cv_input += await uploadFile();
    cv_input += ' """'

    const response = await fetch('/chat', {
        method: 'POST',
        body: JSON.stringify({
            model: gpt_model,
            messages: [
                {"role": "system", "content":"You are a professional, friendly and helpful HR assistant."},
                {"role": "user", "content": job_desc_input},
                {"role": "user", "content": cv_input}
            ],
            temp: 0.6
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const responseData = await response.json();
    const message = responseData.result[0].message.content;
    console.log(message);

    //Store our previous messages
    promptResponses.push({question: job_desc_input, response: message});
    application_feedback = message;

    const historyElement = document.createElement('div');
    historyElement.innerHTML = `<li class="list-group-item"><b>Candidate</b>: ${job_desc_input}</li>
    <li class="list-group-item"><b>Candidate</b>: ${cv_input}</li><li class="list-group-item"><b>HR Assistant</b>: ${message}</li>`;
    chatHistory.append(historyElement);

    //Stop loading spinner
    loading.classList.add("visually-hidden");
    submit.classList.remove("visually-hidden");

}

const generateResponse = async (application_feedback) => {
    //Get the user input field value and send API Request
    //Set loading spinner effect
    loading.classList.remove("visually-hidden");
    submit.classList.add("visually-hidden");

    console.log("This is the variable you need");
    console.log(application_feedback);


    //Get user input
    const input = userInput.value;
    //Use the fetch javascript API
    const response = await fetch('/chat', {
        method: 'POST',
        body: JSON.stringify({
            model: gpt_model,
            messages: [
                {"role": "system", "content":"You are a professional, friendly and helpful HR assistant."},
                {"role": "assistant", "content":application_feedback},
                {"role": "user", "content": input}
            ],
            temp: 0.6
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const responseData = await response.json();
    const message = responseData.result[0].message.content;
    console.log(message);

    //Store our previous messages
    promptResponses.push({question: input, response: message});
    //Clear both fields
    userInput.value = "";

    const historyElement = document.createElement('div');
    historyElement.innerHTML = `<li class="list-group-item"><b>Candidate</b>: ${input}</li>
    <li class="list-group-item"><b>HR Assistant</b>: ${message}</li>`;
    chatHistory.append(historyElement);

    //Stop loading spinner
    loading.classList.add("visually-hidden");
    submit.classList.remove("visually-hidden");

}

//Assign onclick method
upload.addEventListener("click", async () => {
    await initializeConversation();
    await forwardJobdescription();
});
submit.onclick = () => generateResponse(application_feedback);