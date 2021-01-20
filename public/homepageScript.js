console.log('Welcome to homepage');
function test (a){
    console.log('Capture Stream: ',a);
    const parentVideos = document.getElementById('captureStreams');
    const video = document.createElement('video');
    video.srcObject = null;
    video.play();
    parentVideos.append(video);
}
console.log("Homepage Scripts");
export {test};
           
            
            