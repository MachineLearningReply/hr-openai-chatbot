<p align="center">
<img src="https://cdn3.iconfinder.com/data/icons/careers-women-2/64/mathematician-scientist-researcher-academic-researcher-512.png" width="150" height="150">
</p>

# HR-OpenAI-Chatbot
This is a demo of an HR digital assistant. The chatbot reviews your curriculum and verifies you are a good fit for a provided job description. It uses the [Node.js](https://nodejs.org/en/about) framework.

## How to use it
1. First get your cv and convert it to a .txt file.
There are several ways to do this, but one of the easiest methods is to read the file with Adobe Acrobat and save the opened file as txt by using the "Save As Other" option. In a future version of this chatbot this would be done automatically.
2. Get your ambitious job position.
3. Upload your curriculum and paste the job description in the corresponding tabs.
4. Press the Upload Botton
This will initialise the conversation with your digital assistant by providing your inputs and the right prompts to OpenAI GPT LLM. This will ensure it can give you reasonable feedback.
5. Receive the chatbot feedback and feel free to interact with the HR assistant by writing in the "You" tab and pressing the "Submit your answer" button. For example you can use the following sample prompts to assess your technical knowledge for the position:
- "Thank you for your feedback. Now that you know the job description and my experience, could you ask me 3 questions to assess my technical knowledge for the job position?"
- "Thank you for you feedback. Now you should check my technical knowledge for the role by considering the job description and my curriculum. Make me 3 questions to assess my experience."
6. After providing answers, ask the chatbot if your answers satisfy the questions and you are a well-prepared candidate.

## Setup

1. If you don’t have Node.js installed, [install it from here](https://nodejs.org/en/) (Node.js version >= 14.6.0 required)

2. Clone this repository

3. Navigate into the project directory

   ```bash
   $ cd hr-openai-chatbot
   ```

4. Install the requirements

   ```bash
   $ npm install
   ```

5. Make a copy of the example environment variables file

   On Linux systems:
   ```bash
   $ cp .env.example .env
   ```
   On Windows:
   ```powershell
   $ copy .env.example .env
   ```
6. Add your [API key](https://platform.openai.com/account/api-keys) and your [Organization ID](https://platform.openai.com/account/org-settings) to the newly created `.env` file

7. Run the app

   ```bash
   $ node app.js
   ```

You should now be able to access the app at [http://localhost:8083](http://localhost:8083)!

## References

For the full context behind this example app, check out the OpenAI [tutorial](https://platform.openai.com/docs/quickstart), this amazing [blog](https://danielkhv.com/blog/createyourownchatbot) and these [ChatGPT models inputs examples](https://github.com/openai/openai-cookbook/blob/main/examples/How_to_format_inputs_to_ChatGPT_models.ipynb).
