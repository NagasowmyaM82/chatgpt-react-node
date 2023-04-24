const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: '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',
});
const openai = new OpenAIApi(configuration);

// Set up the server
const app = express();
// app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
    res.status(200).send({
        message:
            "This is ChatGPT AI APP server url, please visit https://chatgpt-ai-app-od21.onrender.com",
    });
});

// Set up the ChatGPT endpoint
app.post("/", async (req, res) => {
    try {
  // Get the prompt from the request
//   const { prompt } = req.body;
const { selectRule,bugShortDescription,section508,bugRemediationSample } = req.body;

  // Generate a response with ChatGPT
  const response = await openai.createCompletion({
    // model: "text-davinci-002",
    // prompt: prompt,
    model: 'text-davinci-003',
    prompt: generatePrompt(selectRule,bugShortDescription,section508,bugRemediationSample),
    temperature: 0,
    max_tokens: 4000,
    top_p: 1,
    frequency_penalty: 0.5,
    presence_penalty: 0,
  });
  console.log("PASSED: ", req.body);

  // res.status(200).send(completion.data.choices[0].text);
res.status(200).send({
    bot: response.data.choices[0].text,
});
} catch (error) {
    console.log("FAILED:", req.body);
    console.error(error);
    res.status(500).send(error);
}
function generatePrompt(selectRule,bugShortDescription,section508,bugRemediationSample) {
    return `message: ${selectRule}${bugShortDescription}${section508}${bugRemediationSample} `;
  }
});

// Start the server
const port = 8000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});