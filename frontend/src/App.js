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
    email: ''
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

                {/* Other fields: age, weight, height, etc. */}
                {/* Add remaining fields following the same structure */}
                
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
