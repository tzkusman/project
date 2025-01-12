import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  // State to control modal visibility and form data
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    goal: '',
    diet: '',
    age: '',
    gender: '',
    weight: '',
    height: '',
    exerciseLevel: '',
    allergies: '',
    mealPreferences: '',
    sleepHours: '',
    mealFrequency: '',
    preferredFoods: '',
    avoidFoods: '',
    dailyActivity: '',
    hydration: '',
    stressLevel: '',
    fitnessDuration: '',
    targetMuscle: '',
    injuryHistory: '',
    goalTimeframe: '',
    name: '',
    email: '',
    question1: '',
    question2: '',
    question3: '',
    question4: '',
    question5: '',
    question6: '',
    question7: '',
    question8: '',
    question9: '',
    question10: '',
    question11: '',
    question12: '',
    question13: '',
    question14: '',
    question15: '',
    question16: '',
    question17: '',
    question18: '',
    question19: '',
    question20: ''
  });

  // State to store the generated plan
  const [generatedPlan, setGeneratedPlan] = useState(null);

  // Handle change in form data
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Function to show the modal when the button is clicked
  const openModal = () => {
    setShowModal(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setShowModal(false);
  };

  // Function to handle form submission and send data to the backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send the form data to the backend API
      const response = await axios.post('http://localhost:4000/api/generate-plan', {
        responses: formData,
        name: formData.name,
        email: formData.email
      });

      // Store the generated plan from the API response
      setGeneratedPlan(response.data);

      // Optionally: Close modal after successful form submission
      closeModal();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <>
      <div className="container">
        <h1>Get accurate & personalized meal/fitness plans using AI</h1>
        {/* Button to open the modal */}
        <button id="getStartedBtn" onClick={openModal}>Get Started</button>

        {/* Modal (form) */}
        {showModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>Personalized Meal and Fitness Plan</h2>
              <form id="questionnaireForm" onSubmit={handleSubmit}>
                {/* Goal */}
                <label htmlFor="goal">What's your fitness goal?</label>
                <select id="goal" name="goal" value={formData.goal} onChange={handleInputChange}>
                  <option value="weight_loss">Weight Loss</option>
                  <option value="muscle_gain">Muscle Gain</option>
                  <option value="maintain">Maintain</option>
                </select><br /><br />

                {/* Diet */}
                <label htmlFor="diet">What type of diet do you prefer?</label>
                <select id="diet" name="diet" value={formData.diet} onChange={handleInputChange}>
                  <option value="vegan">Vegan</option>
                  <option value="vegetarian">Vegetarian</option>
                  <option value="non-vegetarian">Non-Vegetarian</option>
                </select><br /><br />

                {/* Age */}
                <label htmlFor="age">Age</label>
                <input type="number" id="age" name="age" value={formData.age} onChange={handleInputChange} /><br /><br />

                {/* Gender */}
                <label htmlFor="gender">Gender</label>
                <select id="gender" name="gender" value={formData.gender} onChange={handleInputChange}>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select><br /><br />

                {/* Weight */}
                <label htmlFor="weight">Weight (kg)</label>
                <input type="number" id="weight" name="weight" value={formData.weight} onChange={handleInputChange} /><br /><br />

                {/* Height */}
                <label htmlFor="height">Height (cm)</label>
                <input type="number" id="height" name="height" value={formData.height} onChange={handleInputChange} /><br /><br />

                {/* Exercise Level */}
                <label htmlFor="exerciseLevel">Exercise Level</label>
                <select id="exerciseLevel" name="exerciseLevel" value={formData.exerciseLevel} onChange={handleInputChange}>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select><br /><br />

                {/* Meal Frequency */}
                <label htmlFor="mealFrequency">How many meals do you have per day?</label>
                <input type="number" id="mealFrequency" name="mealFrequency" value={formData.mealFrequency} onChange={handleInputChange} /><br /><br />

                {/* Sleep Hours */}
                <label htmlFor="sleepHours">How many hours do you sleep per night?</label>
                <input type="number" id="sleepHours" name="sleepHours" value={formData.sleepHours} onChange={handleInputChange} /><br /><br />

                {/* Hydration */}
                <label htmlFor="hydration">How many glasses of water do you drink per day?</label>
                <input type="number" id="hydration" name="hydration" value={formData.hydration} onChange={handleInputChange} /><br /><br />

                {/* Stress Level */}
                <label htmlFor="stressLevel">What is your current stress level?</label>
                <select id="stressLevel" name="stressLevel" value={formData.stressLevel} onChange={handleInputChange}>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select><br /><br />

                {/* Daily Activity */}
                <label htmlFor="dailyActivity">How would you describe your daily activity level?</label>
                <select id="dailyActivity" name="dailyActivity" value={formData.dailyActivity} onChange={handleInputChange}>
                  <option value="sedentary">Sedentary</option>
                  <option value="light">Light Activity</option>
                  <option value="moderate">Moderate Activity</option>
                  <option value="active">Very Active</option>
                </select><br /><br />

                {/* Preferred Foods */}
                <label htmlFor="preferredFoods">Any preferred foods?</label>
                <input type="text" id="preferredFoods" name="preferredFoods" value={formData.preferredFoods} onChange={handleInputChange} /><br /><br />

                {/* Avoid Foods */}
                <label htmlFor="avoidFoods">Any foods you prefer to avoid?</label>
                <input type="text" id="avoidFoods" name="avoidFoods" value={formData.avoidFoods} onChange={handleInputChange} /><br /><br />

                {/* Target Muscle */}
                <label htmlFor="targetMuscle">Target muscle group (if any)</label>
                <input type="text" id="targetMuscle" name="targetMuscle" value={formData.targetMuscle} onChange={handleInputChange} /><br /><br />

                {/* Injury History */}
                <label htmlFor="injuryHistory">Do you have any injury history?</label>
                <input type="text" id="injuryHistory" name="injuryHistory" value={formData.injuryHistory} onChange={handleInputChange} /><br /><br />

                {/* Fitness Duration */}
                <label htmlFor="fitnessDuration">How long do you work out each session (in minutes)?</label>
                <input type="number" id="fitnessDuration" name="fitnessDuration" value={formData.fitnessDuration} onChange={handleInputChange} /><br /><br />

                {/* Goal Timeframe */}
                <label htmlFor="goalTimeframe">What is your timeframe for achieving this goal?</label>
                <input type="text" id="goalTimeframe" name="goalTimeframe" value={formData.goalTimeframe} onChange={handleInputChange} /><br /><br />

                {/* Submit button */}
                <button type="submit">Submit</button>
              </form>
              <button id="closeModalBtn" onClick={closeModal}>Close</button>
            </div>
          </div>
        )}
      </div>

      {/* Display Generated Plan after Form Submission */}
      {generatedPlan && (
        <div className="plan-result">
          <h2>Your Generated Plan</h2>
          <p><strong>Meal Plan:</strong></p>
          <p>{generatedPlan.mealPlan}</p>
          <p><strong>Fitness Plan:</strong></p>
          <p>{generatedPlan.fitnessPlan}</p>
        </div>
      )}
    </>
  );
};

export default App;
