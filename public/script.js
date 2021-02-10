
const socket = io('/');
const myPeer  = new Peer({host:'peerjs-server.herokuapp.com', secure:true, port:443});
const peers = {};
const videoGrid = document.getElementById('video-grid');
const ownvideoGrid = document.getElementById('own-video-grid');
const myOwnVideo = document.getElementById('own');
var array=[];
const streamValues=document.getElementById("StreamValues");
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
    addVideoStream(otherVideo, userVideoStream)
  })
  peers[userId] = call
}

function addVideoStream(video, stream) {
  video.srcObject = stream;
  video.addEventListener('loadedmetadata', () => {
    video.play();
    var captureStream=video.captureStream();
    //strearesult=captureStream;
    //test(captureStream);
    var videoCapture=document.createElement('video');
    var parentVideo=document.getElementById("captureStream");
    videoCapture.srcObject=captureStream;
    videoCapture.className="streaming-section";
    videoCapture.play();
    parentVideo.append(videoCapture);
    // localStorage.setItem('capturestream',captureStream);
    // var finalstream=localStorage.getItem('capturestream');
    // console.log('capture stream get item: ',finalstream);
    // var blobs = new Blob([finalstream], { type: "video/webm" });
    // console.log('Blob converted Result: ', blobs);
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
    // var recordedChunks = [];
    // var options = { mimeType: "video/webm; codecs=vp9" };
    // mediaRecorder = new MediaRecorder(captureStream, options);
    // mediaRecorder.ondataavailable = handleDataAvailable;
    // mediaRecorder.start();
    // function handleDataAvailable(event) {
    //   if (event.data.size > 0) {
    //     recordedChunks.push(event.data);
    //   } 
    //   var blob = new Blob(recordedChunks, {
    //     type: "video/webm"
    //   });
    //   console.log('BlobStorage: ',blob);
    //   localStorage.setItem('chunks',recordedChunks);
    //   console.log('Recorded Chunks: ',localStorage.getItem('chunks'));
    //   localStorage.setItem('blobss',recordedChunks);
    //   var blobss=localStorage.getItem('blobss')
    //   console.log('Recorded Chunks: ',blobss);
    //   const reader = new FileReader();
    //   reader.onload = (event) => {
    //     localStorage.setItem("file", event.target.result);
    //   }
    //   reader.readAsDataURL(blob);
    //   console.log('Final Result Localstorage Set item: ',reader)
    //   const finalResult=localStorage.getItem("file");
    //   console.log('Final Result Localstorage: ',finalResult);
    //   const videorecorder=document.createElement('video');
    //   videorecorder.src=null;
    //   videorecorder.srcObject=null;
    //   videorecorder.src=window.URL.createObjectURL(blob);
    //   videorecorder.controls = true;
    //   videorecorder.muted = true;
    //   videorecorder.addEventListener('loadedmetadata', () => {
    //     videorecorder.play();
    //   });
    //   document.getElementById('recorder').append(videorecorder);
    // }
    // const cors = "https://cors-anywhere.herokuapp.com/";
    // const gstorageUrl = "https://storage.googleapis.com/bell-3_first_bucket";
    // $.ajax({
    //   method: "PUT",
    //   //contentType: captureStream.type,
    //   processData: false,
    //   dataType: "json",
    //   crossDomain: true,
    //   data: captureStream,
    //   url: cors+gstorageUrl,
    //   beforeSend: function (request){
    //       request.setRequestHeader("Content-Type", 'multipart/formdata; charset=UTF-8');
    //   },
    //   // url: cors+gstorageUrl,
    //   // type: "POST",
    //   // dataType:'json',
    //   // data: captureStream,
    //   // processData:false,
    //   success: function(data) {
    //       console.log('success: ',data);
    //   },
    //   error: function(data) {console.log('error throws: ',data);
    //   }
    // });
  });
  videoGrid.append(video);
  console.log('Stream data: ',stream);
  var trackid=stream.id;
  console.log("track id: ",trackid);
  localStorage.setItem('trackid',trackid);
  var getLocalstream=localStorage.getItem('trackid');
  console.log('Get Localstream data: ',getLocalstream);
  // var track= MediaStream.(trackid);
  // console.log("Video track: ",track);
  // var getTracks= stream.getTracks();
  // console.log("Get Tracks: ",getTracks);
  var storeStreamobject= new Object();
  storeStreamobject=stream;
  // console.log("Store Stream Object: ",storeStreamobject);
  // var storeStreamArray= new Array();
  // storeStreamArray=stream;
  // console.log("StoreStreamArray: ",storeStreamArray); 
  // var streamJsonValues=stream.json().then(data=>{console.log("Resultant data: ",data)});
  // console.log("Json values: ",streamJsonValues);
  // var SplitArray= ArrtoStr.splice(ArrtoStr.indexOf(1));
  // console.log("Split Array: ",SplitArray);
  // var mediaStreamValues=stream;
  // mediaStreamValues[Symbol.toStringTag]="";
  // console.log("MediaStream Values: ",mediaStreamValues);
  // localStorage.setItem('getTrack',getTracks);
  // var getLocalstreamTracks=localStorage.getItem('getTrack');
  // console.log('Get Localstream Tracks data: ',getLocalstreamTracks);
  // localStorage.setItem('getObject',storeStreamobject);
  // var getLocalstreamObject=localStorage.getItem('getObject');
  // console.log('Get Localstream data: ',getLocalstreamObject);
  // localStorage.setItem('getArray',storeStreamArray);
  // var getLocalstreamArray=localStorage.getItem('getArray');
  // console.log('Get Localstream data: ',getLocalstreamArray);
  // var srcObject= video.srcObject;
  // console.log("Src Object: ",srcObject);
  // var srcObjectString= srcObject.toString();
  // console.log("Src Object String: ",srcObjectString);
  // var srcObjectArray= new Array();
  // srcObjectArray=srcObject;
  // console.log("Src Object Array; ",srcObjectArray);
  // var srcObjectJsonStringify= JSON.stringify(srcObject);
  // console.log("Src Object Json Stringify: ",srcObjectJsonStringify);
  // var streamAddedParenthesis='{'+stream+'}';
  // console.log("Stream Added parenthesis: ",streamAddedParenthesis);
  // var streamAddedDoubleQuotes=stream+' ';
  // console.log("Stream Added Quotes: ",streamAddedDoubleQuotes);
  
  console.log("Stream MediaStream Keys: ",storeStreamobject.keys());
  // array.push(stream.value);
  // array.map(lang => { let li = document.createElement('li'); li.textContent = lang; return li; })
  // console.log("Media Stream Array Values: ",array);
  // localStorage.setItem('ArrayOfObjects',array);
  // console.log("Localstorage Array of Objects: ",localStorage.getItem('ArrayOfObjects'));
  // let nodes = storeStreamobject.map(lang => { let li = document.createElement('li'); li.textContent = lang; return li; });
  // streamValues.append(...array);
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

// const parentVideos = document.getElementById('captureStreams');
// const video = document.createElement('video');
// video.srcObject = null;
// video.play();
// parentVideos.append(video);


// const test =(a)=>{
//   return a;
// }
// document.addEventListener("click",function(){
//   if(location.pathname=='/home'){
//       const result=Object.assign([],test);
//       console.log('Homepage Result',result);
//       const parentVideos = document.getElementById('captureStreams');
//       const video = document.createElement('video');
//       video.srcObject = result;
//       video.play();
//       parentVideos.append(video);
//   }
// })
// export {test};


//export {strearesult};