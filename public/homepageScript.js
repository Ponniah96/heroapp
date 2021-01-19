
            console.log('Welcome to homepage');
            const parentVideo = document.getElementById('captureStreams');
            const video = document.createElement('video');
            const resultantStreams = localStorage.getItem("file");
            console.log('File reader result: ', resultantStreams);
            var blob = new Blob([resultantStreams], { type: "video/webm" });
            console.log('Blob converted Result: ', blob);
            video.src = null;
            video.srcObject = null;
            video.src = URL.createObjectURL(blob);
            video.controls = true;
            video.muted = true;
            video.play();
            parentVideo.append(video);
            console.log("After Append: ", parentVideo);