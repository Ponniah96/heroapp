const socket = io('/');
const myPeer  = new Peer({host:'peerjs-server.herokuapp.com', secure:true, port:443})
const peers = {};
const ROOM_IDD=localStorage.getItem("ROOM_ID");
const PEER_ID=localStorage.getItem("peer-id");
const streamValues=document.getElementById('captureStreams');
document.addEventListener("DOMContentLoaded",function(){
console.log('ROOM ID: ',ROOM_ID);
});
myPeer.on('open', id => {
    socket.emit('join-room', ROOM_ID, id);
})

navigator.mediaDevices.getUserMedia({
    video:false,
    audio:true
  }).then(stream => {
    const createEmptyAudioTrack = () =>{
        const ctx = new AudioContext();
        const oscillator = ctx.createOscillator();
        const dst = oscillator.connect(ctx.createMediaStreamDestination());
        oscillator.start();
        const track = dst.stream.getAudioTracks()[0];
        return Object.assign(track,{enabled: false});
    };
    const createEmptyVideoTrack = () => {
        const canvas = Object.assign(document.createElement('canvas'));
        canvas.getContext('2d')
        const stream = canvas.captureStream();
        const track = stream.getVideoTracks()[0];
        return Object.assign(track,{enabled: false});
    };
    const audioTrack = createEmptyAudioTrack();
    const videoTrack = createEmptyVideoTrack();
    const mediaStream = new MediaStream([audioTrack, videoTrack]);
    
    myPeer.on('call', call => {
      call.answer(mediaStream);
      call.on('stream', userVideoStream => {
        const video=document.createElement('video');
        video.srcObject=userVideoStream;
        video.addEventListener('loadedmetadata',(e)=>{
          video.play()
        });
        streamValues.append(video);
      })
    })
  
    socket.on('user-connected', userId => {
        const calls = myPeer.call(userId,mediaStream);
        calls.on('stream',userVideoStream=>{
            const video=document.createElement('video');
            video.srcObject=userVideoStream;
            video.addEventListener('loadedmetadata',(e)=>{
            video.play()
            });
            streamValues.append(video);
        })
    })
  
    socket.on('user-disconnected', userId => {
      if (peers[userId]){ 
        peers[userId].close();
      } 
    })
  
  })