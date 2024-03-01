// Requiring module
const express = require('express');
const cors = require('cors')
require('dotenv').config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Creating express object
const app = express();

app.use(cors())
app.use(express.json());


// Handling POST request
app.post('/generate', async (req, res) => {

    const {prompt} = req.body;
    console.log(prompt);

    const genAI = new GoogleGenerativeAI(process.env.API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const question = `Generate a social media post with a heading, subheading, and caption including hashtags for: ${prompt}`

    try {
        const result = await model.generateContent(question);
        const response = await result.response;
        const text = response.text();
        res.json({ text });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error generating content');
    }

})

// Port Number
const PORT = process.env.PORT || 5000;

// Server Setup
app.listen(PORT, console.log(
    `Server started on port ${PORT}`));


