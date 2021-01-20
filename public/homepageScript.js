import {strearesult} from './script.js'

console.log('Welcome to homepage');

console.log('StreamResult in Dashboard: ',strearesult);
const parentVideos = document.getElementById('captureStreams');
const video = document.createElement('video');
video.srcObject = strearesult;
video.play();
parentVideos.append(video);
           
            
            