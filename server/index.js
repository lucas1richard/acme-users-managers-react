const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}`));

// Utility middleware
app.use(bodyParser.json());

// Static routes
app.use('/public', express.static(path.join(__dirname, '../public')));
app.use('/vendor', express.static(path.join(__dirname, '../node_modules')));

// Route middleware
app.use('/api', require('./routes'));

// Every other request returns the index.html file
app.get('*', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});
