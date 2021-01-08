const socket = io('/');

const myPeer  = new Peer({host:'peerjs-server.herokuapp.com', secure:true, port:443});

myPeer.on('open', id => {
  socket.emit('join-room', ROOM_ID, id);
})  

socket.on('user-connected',userId=>{
  console.log('User Connectedd: '+userId);
})


socket.on('user-disconnected',userId=>{
  console.log('User disconnected: '+userId);
})

const videoGrid = document.getElementById('video-grid');
const ownvideoGrid = document.getElementById('own-video-grid');
const myOwnVideo = document.createElement('video');
myOwnVideo.controls= true;
const peers = {};
myOwnVideo.muted=true;
myOwnVideo.poster="https://image.shutterstock.com/image-vector/vector-live-stream-icon-flat-260nw-1282569241.jpg"
const startVideo=document.getElementById('camera-on');

navigator.mediaDevices.getUserMedia( {
  video:true,
  audio: true
}).then(stream => {
  addOwnVideoStream(myOwnVideo,stream);
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

  socket.on('user-disconnected', userId => {
    if (peers[userId]){ peers[userId].close()}
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

// startVideo.addEventListener('click',function(e){
//   console.log('On Camera');
//   navigator.mediaDevices.getUserMedia( {
//     video:true,
//     audio: true
//   }).then(stream => {
//     addOwnVideoStream(myOwnVideo,stream);
//       myPeer.on('call', call => {
//         call.answer(stream);
//         const video = document.createElement('video')
//         call.on('stream', userVideoStream => {
//         addVideoStream(video, userVideoStream);
//       })
//     })
  
//     socket.on('user-connected', userId => {
//       connectToNewUser(userId, stream)
//     })
//   })
// })

// stopVideo.addEventListener('click',function(e){
//   console.log('Off Camera');
//   navigator.mediaDevices.getUserMedia( {
//     video:false,
//     audio: true
//   }).then(stream => {
//     addOwnVideoStream(myOwnVideo,stream);
//       myPeer.on('call', call => {
//         call.answer(stream);
//         const video = document.createElement('video')
//         call.on('stream', userVideoStream => {
//         addVideoStream(video, userVideoStream);
//       })
//     })
  
//     socket.on('user-connected', userId => {
//       connectToNewUser(userId, stream)
//     })
//   })
// })

function connectToNewUser(userId, stream) {
  const call = myPeer.call(userId, stream)
  const video = document.createElement('video');
  video.className='test';
  call.on('stream', userVideoStream => {
    addVideoStream(video, userVideoStream)
  })
  call.on('close', () => {
    video.stop()
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

function stopOwnVideoStream(video, stream) {
  let tracks = video.srcObject.getTracks();
  tracks.forEach(track => track.stop());
  video.srcObject = null;
  ownvideoGrid.append(video)
}


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
      addScreenShareStream(videoElem, stream);
      myPeer.on('call', call => {
        call.answer(stream);
        call.on('stream', userVideoStream => {
          addScreenShareStream(videoElem, userVideoStream);
        })
      })
      socket.on('user-connected', userId => {
        connectToNewShareUser(userId, stream)
      })
      });
  } catch (err) {
    console.error("Error: " + err);
  }
}

function stopCapture(evt) {
  let tracks = videoElem.srcObject.getTracks();
  tracks.forEach(track => track.stop());
  videoElem.srcObject = null;
  //videoElem.classList.remove('screen-share');
}

function addScreenShareStream(video, stream) {
  video.srcObject = stream;
  video.className="test";
  video.addEventListener('loadedmetadata', () => {
    video.play()
  })
}

function connectToNewShareUser(userId, stream) {
  const call = myPeer.call(userId, stream)
  call.on('stream', userVideoStream => {
    addScreenShareStream(videoElem, userVideoStream);
  })
  call.on('close', () => {
    video.remove()
  })

  peers[userId] = call
}

/**Screen Share Code Ends */