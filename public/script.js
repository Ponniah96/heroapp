const socket = io('/');

const myPeer  = new Peer({host:'peerjs-server.herokuapp.com', secure:true, port:443});

myPeer.on('open', id => {
  socket.emit('join-room', ROOM_ID, id);
})  

socket.on('user-connected',userId=>{
  console.log('User Connected: '+userId);
})

socket.on('user-disconnected',userId=>{
  console.log('User disconnected: '+userId);
})

const peers = {};
const videoGrid = document.getElementById('video-grid');
const ownvideoGrid = document.getElementById('own-video-grid');
const myOwnVideo = document.getElementById('own');
myOwnVideo.controls= true;
myOwnVideo.muted=true;
myOwnVideo.poster="https://image.shutterstock.com/image-vector/vector-live-stream-icon-flat-260nw-1282569241.jpg"
const otherVideo=document.getElementById('others');
otherVideo.controls=true;
const startVideo=document.getElementById('camera-on');

navigator.mediaDevices.getUserMedia( {
  video:true,
  audio:{
    sampleSize:8,
    echoCancellation:true
  }
}).then(stream => {
  addOwnVideoStream(myOwnVideo,stream);
  myPeer.on('call', call => {
    //otherVideo.classList.remove('d-none');
    call.answer(stream);
    call.on('stream', userVideoStream => {
    addVideoStream(otherVideo, userVideoStream);
  })
})

  socket.on('user-connected', userId => {
    connectToNewUser(userId, stream)
  })

  socket.on('user-disconnected', userId => {
    if (peers[userId]){ 
      peers[userId].close();      
    }
  })

})

startVideo.addEventListener('click',function(){
  if(startVideo.textContent=="Camera on"){
    startVideo.textContent="Camera off";
    startVideo.classList.add('stop');
  }
  else{
    startVideo.textContent="Camera on";
    startVideo.classList.remove('stop');
  }
})

function connectToNewUser(userId, stream) {
  //otherVideo.classList.remove('d-none');
  const call = myPeer.call(userId, stream);
  call.on('stream', userVideoStream => {
    addVideoStream(otherVideo, userVideoStream)
  })
  peers[userId] = call
}

function addVideoStream(video, stream) {
  video.srcObject = stream
  video.addEventListener('loadedmetadata', () => {
    video.play()
  })
}

function addOwnVideoStream(video, stream) {
  video.srcObject = stream
  video.addEventListener('loadedmetadata', () => {
    video.play()
  })
}

// function stopOwnVideoStream(video, stream) {
//   let tracks = video.srcObject.getTracks();
//   tracks.forEach(track => track.stop());
//   video.srcObject = null;
// }


/**Screen Share Code Starts */
const videoElem = document.getElementById("video");
const startElem = document.getElementById("start");
const stopElem = document.getElementById("stop");

var displayMediaOptions = {
  video: {
    cursor: "never"
  },
  audio: false
};

startElem.addEventListener("click", function (evt) {
  if(startElem.textContent=="Start Sharing"){
    startCapture();
    startElem.textContent="Stop Sharing";
    startElem.classList.add('stop');
  }
  else{
    stopCapture();
    startElem.textContent="Start Sharing";
    startElem.classList.remove('stop');
  }
  
}, false);

async function startCapture() {
  try {
    navigator.mediaDevices.getDisplayMedia(displayMediaOptions).then(stream => {
      socket.on('user-connected', userId => {
        connectToNewShareUser(userId, stream)
      })
    });
  } catch (err) {
    console.error("Error: " + err);
  }
}

function stopCapture(evt) {
  // let tracks = videoElem.srcObject.getTracks();
  // tracks.forEach(track => track.stop());
  // videoElem.srcObject = null;
}

function addScreenShareStream( stream) {
  videoElem.srcObject = stream;
  videoElem.addEventListener('loadedmetadata', () => {
    videoElem.play()
  })
}

function connectToNewShareUser(userId, stream) {
  const call = myPeer.call(userId, stream)
  call.on('stream', userVideoStream => {
    addScreenShareStream(userVideoStream);
  })
  peers[userId] = call
}

/**Screen Share Code Ends */