const mongoose = require('mongoose');

// Define the schema for storing user data
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    mealPlan: {
        type: String,  // The generated meal plan can be stored as a string
        required: true
    },
    fitnessPlan: {
        type: String,  // The generated fitness plan can be stored as a string
        required: true
    }
    
});

// Create a model from the schema
const User = mongoose.model('User', userSchema);

module.exports = User;

