
 document.addEventListener("DOMContentLoaded",function(){
    var stream=document.getElementById('stream');
    stream.addEventListener('click',function(){
        location.href='/streaming/'+ ROOM_ID;
    })
    var call=document.getElementById('call');
    call.addEventListener('click',function(){
        location.href='/video-call/'+ ROOM_ID;
    })
});
