const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const path = require('path');

// Initialize the app
const app = express();

// Serve static files from the current directory
//app.use(express.static('.'));
app.use(express.static(__dirname));


// Use body-parser to parse URL-encoded form data
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/ration_management', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error: ', err));

// Create a schema for users
const userSchema = new mongoose.Schema({
    name: String,
    mobile: String,
    password: String,
    ration_card: String
});

// Create a model for the User
const User = mongoose.model('User', userSchema);

// Create a schema for Smart Card Applications
const applicationSchema = new mongoose.Schema({
    name: String,
    mobile: String,
    ration_card: String,
    address: String
});

// Create a model for Smart Card Applications
const SmartCardApplication = mongoose.model('SmartCardApplication', applicationSchema);

// Middleware to log the requests
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});


// Handle Sign-Up POST request
app.post('/signup', async (req, res) => {
    try {
        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        // Create a new user
        const newUser = new User({
            name: req.body.name,
            mobile: req.body.mobile,
            password: hashedPassword,
            ration_card: req.body.ration_card
        });

        // Save the user in MongoDB
        await newUser.save();
        res.send('Signed Up Successfully!');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error occurred during sign up.');
    }
});

// Handle Login POST request
app.post('/login', async (req, res) => {
    try {
        const { mobile, ration_card, password } = req.body;

        // Find the user by mobile and ration card number
        const user = await User.findOne({ mobile: mobile, ration_card: ration_card });

        if (user && await bcrypt.compare(password, user.password)) {
            // Redirect to dashboard if credentials match
            res.redirect('/dashboard.html');
        } else {
            res.send('Invalid login credentials.');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Error occurred during login.');
    }
});



// Handle Smart Card Application form submission
app.post('/applysc', async (req, res) => {
    try {
        // Check if the incoming request data is correctly captured
        console.log(req.body);

        // Create a new smart card application entry
        const newApplication = new SmartCardApplication({
            name: req.body.applicant_name,
            mobile: req.body.applicant_mobile,
            ration_card: req.body.applicant_ration_card,
            address: req.body.applicant_address
        });

        // Save the application in MongoDB
        await newApplication.save();

        // Fetch all stored applications to display
        const allApplications = await SmartCardApplication.find();

        // Render the HTML page with the stored applications
        res.send(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Smart Card Application</title>
                <link rel="stylesheet" href="style.css">
            </head>
            <body>
                <h2>Smart Card Application Submitted Successfully!</h2>
                <h3>Stored Applications</h3>
                <table border="1">
                    <tr>
                        <th>Name</th>
                        <th>Mobile</th>
                        <th>Ration Card</th>
                        <th>Address</th>
                    </tr>
                    ${allApplications.map(app => `
                        <tr>
                            <td>${app.name}</td>
                            <td>${app.mobile}</td>
                            <td>${app.ration_card}</td>
                            <td>${app.address}</td>
                        </tr>
                    `).join('')}
                </table>
                <a href="/applysc.html">Back to Form</a>
            </body>
            </html>
        `);
    } catch (err) {
        console.error(err);  // Log the exact error
        res.status(500).send('Error occurred while submitting the application.');
    }
});


// Start the server on port 3000
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});