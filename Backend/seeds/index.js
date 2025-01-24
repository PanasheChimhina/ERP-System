require('dotenv').config();
const mongoose = require('mongoose');
const seedDatabase = require('./mockData');

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB');
        return seedDatabase();
    })
    .then(() => {
        console.log('Seeding completed');
        process.exit(0);
    })
    .catch(error => {
        console.error('Error:', error);
        process.exit(1);
    });