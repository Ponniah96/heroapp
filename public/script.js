const socket = io('/');

const myPeer  = new Peer({host:'peerjs-server.herokuapp.com', secure:true, port:443});

myPeer.on('open', id => {
  socket.emit('join-room', ROOM_ID, id);
})  

socket.on('user-connected',userId=>{
  console.log('User Connected: '+userId);
})

const videoGrid = document.getElementById('video-grid');
const ownvideoGrid = document.getElementById('own-video-grid');
const myOwnVideo = document.createElement('video');
myOwnVideo.controls= true;
const peers = {};
myOwnVideo.muted=true;
myOwnVideo.poster="https://image.shutterstock.com/image-vector/vector-live-stream-icon-flat-260nw-1282569241.jpg"
navigator.mediaDevices.getUserMedia({
  video: true,
  audio: true
}).then(stream => {
  addOwnVideoStream(myOwnVideo, stream);
  myPeer.on('call', call => {
    call.answer(stream);
    const video = document.createElement('video')
    call.on('stream', userVideoStream => {
      addVideoStream(video, userVideoStream);
    })
  })

  socket.on('user-connected', userId => {
    connectToNewUser(userId, stream)
  })
})

socket.on('user-disconnected', userId => {
  if (peers[userId]) peers[userId].close()
})


function connectToNewUser(userId, stream) {
  const call = myPeer.call(userId, stream)
  const video = document.createElement('video')
  call.on('stream', userVideoStream => {
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
    video.pause()
  })
  ownvideoGrid.append(video)
}



const videoElem = document.getElementById("video");
const startElem = document.getElementById("start");
const stopElem = document.getElementById("stop");

// Options for getDisplayMedia()

var displayMediaOptions = {
  video: {
    cursor: "never"
  },
  audio: false
};

// Set event listeners for the start and stop buttons
startElem.addEventListener("click", function (evt) {
  startCapture();
}, false);

stopElem.addEventListener("click", function (evt) {
  stopCapture();
}, false);

async function startCapture() {
  try {
    videoElem.srcObject = await navigator.mediaDevices.getDisplayMedia(displayMediaOptions).then(stream => {
      this.initStream();
      });
    videoElem.classList.add('screen-share');
  } catch (err) {
    console.error("Error: " + err);
  }
}

function stopCapture(evt) {
  let tracks = videoElem.srcObject.getTracks();

  tracks.forEach(track => track.stop());
  videoElem.srcObject = null;
  videoElem.classList.remove('screen-share');
}
