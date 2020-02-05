const express    = require('express'),
	  app        = express(),
	  path       = require('path');

app.use(express.static(__dirname + '/dist/weight-tracker-ui'));

app.get('/*', function (req, res) {
   res.sendFile(path.join(__dirname + '/dist/weight-tracker-ui/index.html'));
 });

// Start server
const port = 3007;

app.listen(port);
console.log('Server started on port ' + port);
