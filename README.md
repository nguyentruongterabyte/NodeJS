# NodeJSW3School
## Node.js File System Module
### Node.js as a File Server
To include the File System module, use the ***require()*** method<br>

```
  var fs = require('fs);
```
### Read Files
The ***fs.readFile()*** method is used to read files on your computer <br>

demofile1.html
```
<html>
<body>
<h1>My Header</h1>
<p>My paragraph.</p>
</body>
</html>
```

Example
```
  var http = require('http');
  var fs = require('fs);
  http.createServer(function(req, res) {
    fs.readFile('demofile1.html', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      return res.end();
    })
  });
```