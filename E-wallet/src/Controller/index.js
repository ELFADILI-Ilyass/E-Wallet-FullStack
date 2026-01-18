const loginbtn=document.getElementById("Loginbtn");
const signBtn=document.getElementById("Signinbtn");
loginbtn.addEventListener("click",callback);

function callback(){
    loginbtn.textContent="Loading..."
    setTimeout(()=>{
        window.location.href="/src/view/login.html";
    },1000)
}

signBtn.addEventListener("click",()=>{
    signBtn.textContent="Loading..."
    setTimeout(()=>{
        window.location.href="/src/view/Sign.html";
    },1000)
})