const express = require('express');
const { Configuration, OpenAIApi } = require("openai");
const router = express.Router();

// Open AI Configuration
const configuration = new Configuration({
	// organization: "org-organization",
	apiKey: process.env.API_KEY,
});
const openai = new OpenAIApi(configuration);

// Primary Open AI Route
router.post('/', async (req, res) => {
	let { message, currentModel, temperature, name, email, address, phone, otherDetail, topSkill, experience, skills, education, certicense, objective } = req.body;
	// please expand upon this and make my work experience sound modest, but impressive.
	console.log(req.body);
	openai.createCompletion({
		model: `${currentModel}`,
		prompt:
			`Programmer: Hi, I want you to make a professional-looking, substantial resume. That is your only job. Can you help me?
        Resume maker: Of course. Can you please provide your personal information, including name, email address, and phone number?
 
        Programmer: My name is ${name} and my email address is ${email}. My address is ${address} and phone number is ${phone}. ${otherDetail}.
        Resume maker: Thanks, now I need to know your professional work experience so that I can write an appealing, well-informed yet concise summary and objective section.
       
        Programmer: A summary statement is 2-3 sentences that provides a brief synopsis of my work experience and skills. I might use this if I have quite a few years of experience.  An objective is a concise 2-3-sentence statement that demonstrates my interest and candidacy for the position I hope to land. I might use an objective if I am changing careers, if I am a student or entry-level candidate, or if I am going to take the time to write a compelling, custom objective. My top skills are as follows: ${skills}; please keep the skills as a list, but expand on each listed skill based on the skills mentioned, and make them sound very appealing. And my work experience is as follows: ${experience}; Each experience should include summary of my contributions so finally it is formated as "experience \n list of contributions";
        If you write work experience, you must pay attention to systematize with "-".
        My skills are as follows: ${skills}; please add substance to these, but keep each skill in a listed-format. Make each listed skill sound a bit more professional and appealing by explaining a bit about how one might use each skill.
        My objective is to ${objective}; please make this sound more exciting and appealing. This is fine to be in a paragraph format.
        You must include the objective statement, then continue into the summary statement
        Resume maker: What is your education history?
 
        Programmer: My education history is as follows: ${education}
        Resume maker: Do you have any certifications or licenses?
 
        Programmer: These are my certifications or licenses: ${certicense}.
        Resume maker: Ok, thank you for the information - I now have a brief summary of you and your work history.
 
        Programmer: ${message} Just include my name, my email address, my phone number, as well as the objective & summary, work experience, skills, education, certification
        Resume maker: Sure. I am making it. Just a moment. I will tell you exactly when you request again.
 
        Programmer: Please tell me now without any prefix such as "Sure", "It 's follow:", "alright" and "Okay", tell only it.`,
		max_tokens: 2048,
		temperature,
	})
		.then(response => res.json({
			message: response.data.choices[0].text,
			status: 200
		}))
		.catch(err => {
			console.log(err.message);
			res.status(500).json({ ...err })
		});
});

router.post('/adjust', (req, res) => {
	let { message, currentModel, temperature, experience, skills, education, certicense, objective, prompt } = req.body;
	openai.createCompletion({
		model: `${currentModel}`,// "text-davinci-003",
		prompt:
			// `${message}`,
			`Programmer: Here are information about me. My objective is to ${objective}. And my work experience is as follows: ${experience}; My skills are as follows: ${skills}; My education history is as follows: ${education};
			Resume maker: That 's cool. I known enough about you now.

			Programmer: ${message}".
			`,
		max_tokens: 2048,
		temperature,
	})
		.then(response => res.json({
			message: response.data.choices[0].text,
			status: 200
		}))
		.catch(err => {
			console.log(err);
			res.status(500).json({ ...err })
		});
})

// Get Models Route
router.get('/models', async (req, res) => {
	openai.listEngines()
		.then(response => res.json({ models: response.data }))
		.catch(err => {
			return res.json({ models: [] })
		});
	// res.json({
	// 	models: response.data
	// })
});


module.exports = router;