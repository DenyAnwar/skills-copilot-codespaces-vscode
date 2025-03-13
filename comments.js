// Create web server
var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');

// Load comments from file
var comments = JSON.parse(fs.readFileSync('comments.json'));

// Create web server
app.use(express.static('public'));
app.use(bodyParser.json());

// Get all comments
app.get('/comments', function(req, res) {
    res.json(comments);
});

// Add a new comment
app.post('/comments', function(req, res) {
    // Add the new comment
    comments.push(req.body);
    // Save the comments to file
    fs.writeFileSync('comments.json', JSON.stringify(comments, null, 4));
    // Send the new comment back to the client
    res.json(req.body);
});

// Start the web server
app.listen(3000, function() {
    console.log('Server is running on http://localhost:3000');
});