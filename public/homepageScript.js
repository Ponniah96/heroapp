console.log('Welcome to homepage');
function test (a){
    console.log('CaptureStream in homepage: ',a);
}
document.addEventListener("click",function(){
    if(location.pathname=='/home'){
        console.log("HomePage Clicked");
        test();
    }
})
export {test};
           
            
            