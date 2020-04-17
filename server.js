const express    = require('express'),
	  app        = express(),
	  path       = require('path');

// Load config params to process.env
require('dotenv').config();

const port = process.env.APP_PORT || 3000;

app.use(express.static(__dirname + '/dist/weight-tracker-ui'));

app.get('/*', function (req, res) {
   res.sendFile(path.join(__dirname + '/dist/weight-tracker-ui/index.html'));
 });

// Start server
app.listen(port);
console.log(`Server started on port ${port}`);
