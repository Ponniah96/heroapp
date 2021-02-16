const socket = io('/');
const myPeer  = new Peer({host:'peerjs-server.herokuapp.com', secure:true, port:443})
const peers = {};
const videoGrid = document.getElementById('video-grid');
const ownvideoGrid = document.getElementById('own-video-grid');
const myOwnVideo = document.getElementById('own');
var array=[];
const streamValues=document.getElementById("StreamValues");
myPeer.on('open', id => {
  socket.emit('join-room', ROOM_ID, id);
})  

myOwnVideo.controls= true;
myOwnVideo.muted=true;
myOwnVideo.poster="https://image.shutterstock.com/image-vector/vector-live-stream-icon-flat-260nw-1282569241.jpg"

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
    const otherVideo=document.createElement('video');
    otherVideo.setAttribute('id','others');
    otherVideo.controls=true;
    call.answer(stream);
    call.on('stream', userVideoStream => {

    addVideoStream(otherVideo, userVideoStream,Object.keys(userVideoStream));
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

function connectToNewUser(userId, stream) {
  const otherVideo=document.createElement('video');
  otherVideo.setAttribute('id','others');
  otherVideo.controls=true;
  otherVideo.className=userId;
  const call = myPeer.call(userId, stream);
  call.on('stream', userVideoStream => {
    addVideoStream(otherVideo, userVideoStream,Object.keys(userVideoStream));
  })
  peers[userId] = call
}

function addVideoStream(video, stream,test) {
  video.srcObject = stream; 
  video.addEventListener('loadedmetadata', (e) => {
    video.play();
    var captureStream=video.captureStream();
    var videoCapture=document.createElement('video');
    var parentVideo=document.getElementById("captureStream");
    videoCapture.srcObject=captureStream;
    videoCapture.className="streaming-section";
    videoCapture.play();
    parentVideo.append(videoCapture);
  });
  videoGrid.append(video);
}


function getAllProperties(obj){
  var allProps = []
    , curr = obj
  do{
      var props = obj;
      props.forEach(function(prop){
          if (allProps.indexOf(prop) === -1)
              allProps.push(prop)
      })
  }while(curr = Object.getPrototypeOf(curr))
  console.log(allProps);
  return allProps
}


function addOwnVideoStream(video, stream) {
  if(location.pathname!=='/home'){
  video.srcObject = stream
  video.addEventListener('loadedmetadata', () => {
    video.play();
  });
  ownvideoGrid.append(video);
}
}




/**Screen Share Code Starts */


// startVideo.addEventListener('click',function(){
//   if(startVideo.textContent=="Camera on"){
//     startVideo.textContent="Camera off";
//     startVideo.classList.add('stop');
//   }
//   else{
//     startVideo.textContent="Camera on";
//     startVideo.classList.remove('stop');
//   }
// })


// const videoElem = document.getElementById("video");
// const startElem = document.getElementById("start");
// const stopElem = document.getElementById("stop");

// var displayMediaOptions = {
//   video: {
//     cursor: "never"
//   },
//   audio: false
// };

// startElem.addEventListener("click", function (evt) {
//   if(startElem.textContent=="Start Sharing"){
//     startCapture();
//     startElem.textContent="Stop Sharing";
//     startElem.classList.add('stop');
//   }
//   else{
//     stopCapture();
//     startElem.textContent="Start Sharing";
//     startElem.classList.remove('stop');
//   }
  
// }, false);

// async function startCapture() {
//   try {
//     navigator.mediaDevices.getDisplayMedia(displayMediaOptions).then(stream => {
//       socket.on('user-connected', userId => {
//         connectToNewShareUser(userId, stream)
//       })
//     });
//   } catch (err) {
//     console.error("Error: " + err);
//   }
// }

// function addScreenShareStream( stream) {
//   videoElem.srcObject = stream;
//   videoElem.addEventListener('loadedmetadata', () => {
//     videoElem.play()
//   })
// }

// function connectToNewShareUser(userId, stream) {
//   const call = myPeer.call(userId, stream)
//   call.on('stream', userVideoStream => {
//     addScreenShareStream(userVideoStream);
//   })
//   peers[userId] = call
// }

/**Screen Share Code Ends */
