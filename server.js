const express = require('express');
const app = express();
const router =express.Router();
const path = require('path');
const server = require('http').Server(app)
const io = require('socket.io')(server)
const { v4: uuidV4 } = require('uuid')
const PORT=process.env.PORT || 3000;
const home=require('./public/home');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
extended: true
}));
app.use(bodyParser.json());

app.set('views',path.join(__dirname, 'views'));

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
  res.redirect(`/${uuidV4()}`);
})

app.get('/:room', (req, res) => {
  res.render('index', { roomID: req.params.room });
})

/**Integrate Socket into our application Starts */
io.on('connection', socket => {
  socket.on('join-room', (roomId, userId) => {
    console.log("socket connected: ",roomId,userId);
    socket.join(roomId);
    socket.to(roomId).broadcast.emit('user-connected', userId);
    
    socket.on('disconnect', () => {
      socket.to(roomId).broadcast.emit('user-disconnected', userId)
    })
  })
})

/**Integrate Socket into our application Ends */

app.get('/streaming/:room',(req, res)=>{
  res.render('home', { roomID: req.params.room });
  console.log("RenderHomePageHTML");
});

app.get('/video-call/:room',(req, res)=>{
  res.render('room', { roomID: req.params.room });
  console.log("RenderVideoCallPageHTML");
});

server.listen(PORT);




