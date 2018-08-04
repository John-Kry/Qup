var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    console.log("connected")
    socket.on('chat message', function(msg){
      console.log('message: ' + msg);
    });
    socket.on("client-message", function(msg){
        io.emit("chat message",msg);
    })
    socket.on("songUpdate", function(msg){
      console.log("songUpdateServer" + msg);
      io.emit("songUpdateServer", msg);
    })
  });
let port = process.env.PORT ||3000;
http.listen(port, function(){
  console.log('listening on' + port);
});
console.log(port);