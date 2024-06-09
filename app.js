var express = require('express');
var path = require('path');

var routerRecords = require('./routes/records')

var app = express();

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

app.use("/records", routerRecords)

// Error handling middleware for 404 Not Found
app.use(function(req, res, next) {
  res.status(404).send('404 Not Found');
});

// Error handling middleware for other errors
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Internal Server Error');
});

const PORT = process.env.PORT || 3000;
app.set('port', PORT);

const server = app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`);
});

module.exports = app;
