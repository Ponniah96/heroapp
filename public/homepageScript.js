console.log('Welcome to homepage');
const test =(a)=>{
    console.log('CaptureStream in homepage: ',a);
}
document.addEventListener("click",function(){
    if(location.pathname=='/home'){
        const result=Object.assign([],test);
        console.log('Homepage Result',result,test);
    }
})
export {test};
           
            
            