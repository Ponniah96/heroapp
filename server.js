const express = require('express');
const app = express();
const router =express.Router();
const path = require('path');
const server = require('http').Server(app)
const io = require('socket.io')(server)
const { v4: uuidV4 } = require('uuid')
const PORT=process.env.PORT || 3000;
const home=require('./public/home');
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')))

app.use('/home',home);



app.get('/', (req, res) => {
  res.redirect(`/${uuidV4()}`)
})

app.get('/:room', (req, res) => {
  res.render('room', { roomId: req.params.room })
})

// const homePage=router.get('/',(req, res)=>{
//   res.render('home');
// })

// router.use('/home',homePage);


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


server.listen(PORT);

