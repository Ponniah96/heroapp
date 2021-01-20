console.log('Welcome to homepage');
const test =(a)=>{
    return a;
}
document.addEventListener("click",function(){
    if(location.pathname=='/home'){
        const result=Object.assign([],test);
        console.log('Homepage Result',result);
        const parentVideos = document.getElementById('captureStreams');
        const video = document.createElement('video');
        video.srcObject = results;
        video.play();
        parentVideos.append(video);
    }
})
export {test};
           
            
            