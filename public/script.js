const socket = io('/')
const videoGrid = document.getElementById('video-grid')
const myPeer = new Peer(undefined, {
  host: 'peerjs-server.herokuapp.com',
  secure:true,
  port:'3001'
})
// const myVideo = document.createElement('video');
// myVideo.controls= true;
const ownvideoGrid = document.getElementById('own-video-grid');
const myOwnVideo = document.createElement('video');
myOwnVideo.controls= true;
//myVideo.muted = true
const peers = {}
navigator.mediaDevices.getUserMedia({
  video: true,
  audio: true
}).then(stream => {
  //addVideoStream(myVideo, stream);
  addOwnVideoStream(myOwnVideo, stream);
  myPeer.on('call', call => {
    call.answer(stream);
    console.log('peer calls');
    const video = document.createElement('video')
    call.on('stream', userVideoStream => {
      addVideoStream(video, userVideoStream);
    })
  })

  socket.on('user-connected', userId => {
    console.log('User ID: ',userId)
    connectToNewUser(userId, stream)
  })
})

socket.on('user-disconnected', userId => {
  if (peers[userId]) peers[userId].close()
})

myPeer.on('open', id => {
  socket.emit('join-room', ROOM_ID, id);
  console.log("My peer opens");
})

function connectToNewUser(userId, stream) {
  const call = myPeer.call(userId, stream)
  const video = document.createElement('video')
  call.on('stream', userVideoStream => {
    console.log("New User connected");
    addVideoStream(video, userVideoStream)
  })
  call.on('close', () => {
    video.remove()
  })

  peers[userId] = call
}

function addVideoStream(video, stream) {
  video.srcObject = stream
  video.addEventListener('loadedmetadata', () => {
    video.play()
  })
  videoGrid.append(video)
}

function addOwnVideoStream(video, stream) {
  video.srcObject = stream
  video.addEventListener('loadedmetadata', () => {
    video.play()
  })
  ownvideoGrid.append(video)
}