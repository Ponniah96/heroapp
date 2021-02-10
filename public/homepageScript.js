
// import {Storage} from '@google-cloud/storage';

// const gc = new Storage({
//   keyFilename: path.join(__filename, '../bell-3-bdcd5c56d905.json'),
//   projectId: "bell-3"
// });

// const firstbucket=gc.bucket('bell-3_first_bucket');
// console.log("first bucket: ",firstbucket);

// const videostreaming = gc.bucket("video-streaming1");
// console.log('Video Streaming: ',videostreaming);



// const socket = io('/');
// const myPeer  = new Peer({host:'peerjs-server.herokuapp.com', secure:true, port:443});
// const peers = {};
// if(location.pathname=='/home'){
// myPeer.on('open', id => {
//   //socket.emit('join-room', ROOM_ID, id);
// })  

// // socket.on('user-connected',userId=>{
// //   console.log('User Connected: '+userId);
// // })

// // socket.on('user-disconnected',userId=>{
// //   console.log('User disconnected: '+userId);
// // })
// }

// const videoGrid=document.getElementById('captureStreams');
//   myPeer.on('call', call => {
//     const otherVideo=document.createElement('video');
//     otherVideo.setAttribute('id','others');
//     otherVideo.controls=true;
//     call.answer(stream);
//     call.on('stream', userVideoStream => {
//     addVideoStream(otherVideo, userVideoStream);
//   })
// })

// //   socket.on('user-connected', userId => {
// //     connectToNewUser(userId, stream)
// //   })

// //   socket.on('user-disconnected', userId => {
// //     if (peers[userId]){ 
// //       peers[userId].close();
// //     } 
// //   })



// // function connectToNewUser(userId, stream) {
// //   const otherVideo=document.createElement('video');
// //   otherVideo.setAttribute('id','others');
// //   otherVideo.controls=true;
// //   otherVideo.className=userId;
// //   const call = myPeer.call(userId, stream);
// //   call.on('stream', userVideoStream => {
// //     addVideoStream(otherVideo, userVideoStream)
// //   })
// //   peers[userId] = call
// // }

// function addVideoStream(video, stream) {
//   video.srcObject = stream
//   video.addEventListener('loadedmetadata', () => {
//     video.play();
//     var captureStream=video.captureStream();
//     var videoCapture=document.createElement('video');
//     var parentVideo=document.getElementById("captureStream");
//     videoCapture.srcObject=captureStream;
//     videoCapture.className="streaming-section";
//     videoCapture.play();
//     parentVideo.append(videoCapture);
//   });
//   videoGrid.append(video);
// }
var getlocalstream=localStorage.getItem("trackid");
console.log("getlocalstream: ",getlocalstream)
// var getTrackById= MediaStream.getTrackById(getlocalstream);
//    console.log('get track By id: ',getTrackById);
var MediaStreams=new MediaStream();
  MediaStreams.getTrackById(getlocalstream);
  console.log("Believe: ",MediaStreams);