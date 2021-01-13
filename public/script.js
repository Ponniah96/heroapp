const socket = io('/');

const myPeer  = new Peer({host:'peerjs-server.herokuapp.com', secure:true, port:443});

const peers = {};
const videoGrid = document.getElementById('video-grid');
const ownvideoGrid = document.getElementById('own-video-grid');
const myOwnVideo = document.getElementById('own');
if(myOwnVideo !=undefined || myOwnVideo!=null){
myPeer.on('open', id => {
  socket.emit('join-room', ROOM_ID, id);
})  

socket.on('user-connected',userId=>{
  console.log('User Connected: '+userId);
})

socket.on('user-disconnected',userId=>{
  console.log('User disconnected: '+userId);
})


myOwnVideo.controls= true;
myOwnVideo.muted=true;
myOwnVideo.poster="https://image.shutterstock.com/image-vector/vector-live-stream-icon-flat-260nw-1282569241.jpg"
}
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
    addVideoStream(otherVideo, userVideoStream);
  })
})

  socket.on('user-connected', userId => {
    connectToNewUser(userId, stream)
  })

  socket.on('user-disconnected', userId => {
    console.log("diconnect: ",userId);
    if (peers[userId]){ 
      peers[userId].close();
        // if($('div').hasClass(userId)){

        // }
    }
    $('#others').each(function(e,o){
      console.log(e,o);
      // if($(this).hasClass(userId)){
      //   $(this).classList.add('d-none');
      // }
    })  
  })

})

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

function connectToNewUser(userId, stream) {
  const otherVideo=document.createElement('video');
  otherVideo.setAttribute('id','others');
  otherVideo.controls=true;
  otherVideo.className=userId;
  const call = myPeer.call(userId, stream);
  call.on('stream', userVideoStream => {
    addVideoStream(otherVideo, userVideoStream)
  })
  peers[userId] = call
}

function addVideoStream(video, stream) {
  video.srcObject = stream
  video.addEventListener('loadedmetadata', () => {
    video.play();
    var captureStream=video.captureStream();
    console.log('Capture Peer Stream: ',captureStream);
    var videoCapture=document.createElement('video');
    var parentVideo=document.getElementById("captureStream");
    videoCapture.srcObject=captureStream;
    videoCapture.className="streaming-section";
    videoCapture.play();
    parentVideo.append(videoCapture);
    // var captureString=Object.entries(captureStream).reduce((a, e) => {
    //   if (typeof e[1] != "function") {
    //     a += `"${e[0]}" : "${e[1]}", `;
    //   }return a;
    // }, "`{").slice(1, -2) + "}`";
    // console.log('Capture String: ',captureString);
    // var finalString=new MediaStream(captureStream);
    // console.log('Final String: ',finalString);
    // localStorage.setItem('passdata',captureStream)
    // localStorage.setItem('video',parentVideo.outerHTML);
    // console.log("Streaming Videos srcobject",localStorage.getItem('passdata'));
    var recordedChunks = [];
    var options = { mimeType: "video/webm; codecs=vp9" };
    mediaRecorder = new MediaRecorder(captureStream, options);
    mediaRecorder.ondataavailable = handleDataAvailable;
    mediaRecorder.start();
    function handleDataAvailable(event) {
      if (event.data.size > 0) {
        recordedChunks.push(event.data);
      } 
      var blob = new Blob(recordedChunks, {
        type: "video/webm"
      });
      console.log('BlobStorage: ',blob);
      localStorage.setItem('chunks',recordedChunks);
      console.log('Recorded Chunks: ',localStorage.getItem('chunks'));
      const reader = new FileReader();
      reader.onload = (event) => {
        localStorage.setItem("file", event.target.result);
      }
      reader.readAsDataURL(blob);
      console.log('Final Result Localstorage Set item: ',reader)
      const finalResult=localStorage.getItem("file");
      console.log('Final Result Localstorage: ',finalResult)
    }
    // function download() {
    //   var blob = new Blob(recordedChunks, {
    //     type: "video/webm"
    //   });
    //   var url = URL.createObjectURL(blob);
    //   var a = document.createElement("a");
    //   document.body.appendChild(a);
    //   a.style = "display: none";
    //   a.href = url;
    //   a.download = "test.webm";
    //   a.click();
    //   window.URL.revokeObjectURL(url);
    // }
  });
  videoGrid.append(video);
}

function addOwnVideoStream(video, stream) {
  video.srcObject = stream
  video.addEventListener('loadedmetadata', () => {
    video.play();
  })
}


/**Screen Share Code Starts */
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