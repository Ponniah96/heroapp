
 document.addEventListener("DOMContentLoaded",function(){
    var stream=document.getElementById('stream');
    stream.addEventListener('click',function(){
        location.href='/streaming/'+ ROOM_ID;
        // var url = '/streaming'
        // $.ajax({
        //     url: url,
        //     type: 'GET',
        //     success: function (data) {
        //         console.log('success',data);
        //     },
        //     error: function () {
        //         console.log('error');
        //     }
        // })
    })
    var call=document.getElementById('call');
    call.addEventListener('click',function(){
        location.href='/video-call/'+ ROOM_ID;
    })
});
