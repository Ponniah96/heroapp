const socket = io('/');

// socket.emit('join-room', ROOM_ID, 10);

// socket.on('user-connected',userId=>{
//   console.log('User Connected: '+userId);
// })

const myPeer = new Peer({
  host:'/',
  port:'3001'
})

// var myPeer = new Peer({
//   secure:true,
//   host: 'bell-3streaming.herokuapp.com',
//   port:443,
//   path:'/'
// })

myPeer.on('open', id => {
  socket.emit('join-room', ROOM_ID, id);
})  

socket.on('user-connected',userId=>{
  console.log('User Connected: '+userId);
})

// const videoGrid = document.getElementById('video-grid');
// const ownvideoGrid = document.getElementById('own-video-grid');
// const myOwnVideo = document.createElement('video');
// myOwnVideo.controls= true;
// const peers = {}
// navigator.mediaDevices.getUserMedia({
//   video: true,
//   audio: true
// }).then(stream => {
//   addOwnVideoStream(myOwnVideo, stream);
//   myPeer.on('call', call => {
//     call.answer(stream);
//     const video = document.createElement('video')
//     call.on('stream', userVideoStream => {
//       addVideoStream(video, userVideoStream);
//     })
//   })

//   socket.on('user-connected', userId => {
//     connectToNewUser(userId, stream)
//   })
// })

// socket.on('user-disconnected', userId => {
//   if (peers[userId]) peers[userId].close()
// })


// function connectToNewUser(userId, stream) {
//   const call = myPeer.call(userId, stream)
//   const video = document.createElement('video')
//   call.on('stream', userVideoStream => {
//     addVideoStream(video, userVideoStream)
//   })
//   call.on('close', () => {
//     video.remove()
//   })

//   peers[userId] = call
// }

// function addVideoStream(video, stream) {
//   video.srcObject = stream
//   video.addEventListener('loadedmetadata', () => {
//     video.play()
//   })
//   videoGrid.append(video)
// }

// function addOwnVideoStream(video, stream) {
//   video.srcObject = stream
//   video.addEventListener('loadedmetadata', () => {
//     video.play()
//   })
//   ownvideoGrid.append(video)
// }