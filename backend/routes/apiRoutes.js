const express = require('express');
const axios = require('axios');
const User = require('../models/user');

const router = express.Router();


// Endpoint to handle AI integration
router.post('/generate-plan', async (req, res) => {
    const { responses } = req.body;

    // Generate a prompt for OpenAI API
    const prompt = `
        Generate a personalized meal and fitness plan based on the following information:
        Goal: ${responses.goal}
        Diet: ${responses.diet}
    `;



    try {
        // Call OpenAI API
        const aiResponse = await axios.post('https://api.openai.com/v1/completions', {
            model: 'gpt-3.5-turbo',
            prompt: prompt,
            max_tokens: 1000,
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
            }
        });

        // Generate meal and fitness plan from AI response
        const generatedPlan = aiResponse.data.choices[0].text;

        // Store the user data and plan in MongoDB
        const user = new User({
            name: req.body.name,  // Assume name and email are passed as well
            email: req.body.email,
            mealPlan: generatedPlan,
            fitnessPlan: generatedPlan
        });

        await user.save();

        // Send the generated plan back to the frontend
        res.json({ mealPlan: generatedPlan, fitnessPlan: generatedPlan });
    } catch (error) {
        console.error("Error generating plan: ", error);
        res.status(500).json({ error: 'Error generating plan' });
    }
});

module.exports = router;
