var fs = require('fs')
  , path = require('path')
  , http = require('http')
  ;

http.createServer(function(req, res)
{
  var file = path.join(__dirname, 'data', req.url + '.json');

  fs.readFile(file, {encoding: 'utf8'}, function(err, data)
  {
    var data, body;

    if (err)
    {
      res.writeHead(404);
      res.end('File Not Found');
      return;
    }

    data = JSON.parse(data);

    res.writeHead(200, data.headers);
    res.end(JSON.stringify(data.body));
  });

}).listen(8080);

console.log('API server is listening on 8080');
