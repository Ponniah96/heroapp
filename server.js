const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const { v4: uuidV4 } = require('uuid')
var PORT=process.env.PORT || 3000;
app.set('view engine', 'ejs')
app.use(express.static('public'))

app.get('/', (req, res) => {
  console.log("Room Id: ",uuidV4());
  res.redirect(`/${uuidV4()}`)
})

app.get('/:room', (req, res) => {
  res.render('room', { roomId: req.params.room })
})

io.on('connection', socket => {
  const id=uuidV4()
  console.log('io connected',id);
  socket.on('join-room', (id, userId) => {
    socket.join(id)
    socket.to(id).broadcast.emit('user-connected', userId)
    console.log("socket connected: ",id);
    socket.on('disconnect', () => {
      socket.to(id).broadcast.emit('user-disconnected', userId)
    })
  })
})

server.listen(PORT);