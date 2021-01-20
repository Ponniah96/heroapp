console.log('Welcome to homepage');
function test (a){
    console.log('CaptureStream in homepage: ',a);
    const parentVideos = document.getElementById('captureStreams');
    const video = document.createElement('video');
    video.srcObject = null;
    video.play();
    parentVideos.append(video);
}
console.log("Homepage Scripts");
export {test};
           
            
            