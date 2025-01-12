const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
require('dotenv').config();
const cors = require('cors');
const userRoutes = require('./routes/apiRoutes');
const axios = require('axios');
const User = require('./models/user');  // Import the User model
const router = express.Router();


//middleware
app.use(cors());
app.use(express.json())


router.post('/generate-plan', async (req, res) => {
    const { responses, name, email } = req.body;

    // Construct a more detailed prompt for OpenAI
    const prompt = `
        Generate a personalized meal and fitness plan based on the following information:
        Goal: ${responses.goal}
        Diet: ${responses.diet}
        Age: ${responses.age}
        Gender: ${responses.gender}
        Weight: ${responses.weight}kg
        Height: ${responses.height}cm
        Exercise Level: ${responses.exerciseLevel}
        Allergies: ${responses.allergies}
        Meal Preferences: ${responses.mealPreferences}
        Sleep Hours: ${responses.sleepHours} hours
        Meal Frequency: ${responses.mealFrequency}
        Preferred Foods: ${responses.preferredFoods}
        Foods to Avoid: ${responses.avoidFoods}
        Daily Activity Level: ${responses.dailyActivity}
        Hydration: ${responses.hydration} glasses of water per day
        Stress Level: ${responses.stressLevel}
        Fitness Duration: ${responses.fitnessDuration} minutes
        Target Muscle: ${responses.targetMuscle}
        Injury History: ${responses.injuryHistory}
        Goal Timeframe: ${responses.goalTimeframe}
    `;

    try {
        // Call OpenAI API to generate the meal/fitness plan
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
            name: name,
            email: email,
            mealPlan: generatedPlan,
            fitnessPlan: generatedPlan
        });

        await user.save();

        // Send the generated plan back to the frontend
        res.json({
            mealPlan: generatedPlan,
            fitnessPlan: generatedPlan
        });
    } catch (error) {
        console.error("Error generating plan: ", error);
        res.status(500).json({ error: 'Error generating plan' });
    }
});

module.exports = router;

dotenv.config();


app.use(bodyParser.json());
app.use(express.static('frontend')); // Serve the frontend files

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(()=>{
   console.log("mongo connected");
}).catch((error)=>{
 console.log(error);
})

// Set up routes
app.use('/api', userRoutes);


app.listen(process.env.PORT, () => {
    console.log(`Server running on port http://localhost:${process.env.PORT}`);
});
app.get("/",(req,res)=>{
    res.send("Hello World!")
})