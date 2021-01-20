console.log('Welcome to homepage');
const test =(a)=>{
    return a;
}
document.addEventListener("click",function(){
    if(location.pathname=='/home'){
        const result=Object.assign([],test);
        console.log('Homepage Result',result);
        console.log('Hoempage Test Result: ',test);
    }
})
export {test};
           
            
            