            
            console.log('Welcome to homepage');
            // const parentVideos = document.getElementById('captureStreams');
            // const video = document.createElement('video');
            // const resultantStreams = localStorage.getItem("file");
            // console.log('File reader result: ', resultantStreams);
            // var blob = new Blob([resultantStreams], { type: "video/webm" });
            // console.log('Blob converted Result: ', blob);
            // video.src = null;
            // video.srcObject = null;
            // video.src = URL.createObjectURL(blob);
            // video.controls = true;
            // video.muted = true;
            // video.play();
            // if(video.src !=null){
            // parentVideos.append(video);
            // console.log("After Append: ", parentVideos);
            // }
            const test =(a)=>{
                console.log('Capture Stream: ',a);
                if(window.location.pathname=='/home'){
                const parentVideos = document.getElementById('captureStreams');
                const video = document.createElement('video');
                video.srcObject = null;
                video.play();
                parentVideos.append(video);
                }
            }
            export {test};
            
            