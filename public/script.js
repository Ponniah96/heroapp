const socket = io('/');

const myPeer  = new Peer({host:'peerjs-server.herokuapp.com', secure:true, port:443});

myPeer.on('open', id => {
  socket.emit('join-room', ROOM_ID, id);
})  

socket.on('user-connected',userId=>{
  console.log('User Connected: '+userId);
})

const videoGrid = document.getElementById('video-grid');
const otherVideo = videoGrid.getElementsByTagName('video')[0];
const ownvideoGrid = document.getElementById('own-video-grid');
const myOwnVideo = ownvideoGrid.getElementsByTagName('video')[0];
const myOwnVideoSource= document.createElement('source');
//myOwnVideo.controls= true;
const peers = {}
const video = document.getElementById("my-video");
    video.addEventListener('click', () => {
      console.log("Video Play");
      navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      }).then(stream => {
        addOwnVideoStream(myOwnVideoSource, stream);
        myPeer.on('call', call => {
          call.answer(stream);
          const video = document.createElement('source')
          call.on('stream', userVideoStream => {
            addVideoStream(video, userVideoStream);
          })
        })
      
        socket.on('user-connected', userId => {
          connectToNewUser(userId, stream)
        })
      })
    })



socket.on('user-disconnected', userId => {
  if (peers[userId]) peers[userId].close()
})


function connectToNewUser(userId, stream) {
  const call = myPeer.call(userId, stream)
  const video = document.createElement('source')
  call.on('stream', userVideoStream => {
    addVideoStream(video, userVideoStream)
  })
  call.on('close', () => {
    video.remove()
  })

  peers[userId] = call
}

function addVideoStream(video, stream) {
  video.src = stream
  video.addEventListener('loadedmetadata', () => {
    video.play()
  })
  otherVideo.append(video)
}

function addOwnVideoStream(video, stream) {
  video.src = stream
  video.addEventListener('loadedmetadata', () => {
    video.play()
  })
  myOwnVideo.append(video)
}



// const videoElem = document.getElementById("video");
// const startElem = document.getElementById("start");
// const stopElem = document.getElementById("stop");

// // Options for getDisplayMedia()

// var displayMediaOptions = {
//   video: {
//     cursor: "always"
//   },
//   audio: false
// };

// // Set event listeners for the start and stop buttons
// startElem.addEventListener("click", function (evt) {
//   startCapture();
// }, false);

// stopElem.addEventListener("click", function (evt) {
//   stopCapture();
// }, false);

// async function startCapture() {
//   try {
//     videoElem.srcObject = await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);
//     videoElem.classList.add('screen-share');
//   } catch (err) {
//     console.error("Error: " + err);
//   }
// }

// function stopCapture(evt) {
//   let tracks = videoElem.srcObject.getTracks();

//   tracks.forEach(track => track.stop());
//   videoElem.srcObject = null;
//   videoElem.classList.remove('screen-share');
// }

