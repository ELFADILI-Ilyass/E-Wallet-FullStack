const displayBtn = document.getElementById("displayPassword");
const nameinput = document.getElementById("fullname");
const passwordinput = document.getElementById("password");
const emailinput = document.getElementById("mail");
const confirmerPass = document.getElementById("confirmPassword");
const result = document.getElementById("result"); // Use this consistently
const Signinbtn = document.getElementById("signupbtn");

displayBtn.addEventListener("click", togglePassword);

function togglePassword() {
    if (passwordinput.type === "password") {
        passwordinput.type = "text";
        displayBtn.textContent = "🙈";
    } else {
        passwordinput.type = "password";
        displayBtn.textContent = "👁";
    }
}

Signinbtn.addEventListener("click", handlesignin);

async function handlesignin() {
    let name = nameinput.value;
    let password = passwordinput.value;
    let email = emailinput.value;
    let passC = confirmerPass.value;

    // Validation
    if (!name || !password || !email || (passC !== password)) {
        result.textContent = "Inputs invalides ou mots de passe différents !";
        result.style.color = "red";
        return;
    }

    const user = { name, password, email };

    try {
        const response = await fetch("http://localhost:3000/Ewallet/signup", {
            method: "POST",
            headers: {
               "Content-Type": "application/json" },
            body: JSON.stringify(user),
        });

        const data = await response.json(); 
        // Most NestJS APIs use 'data.success' or 'response.ok'
        if (data.success === "True") {
            result.textContent = "Inscription réussie ! Redirection...";
            result.style.color = "green";

            setTimeout(() => {
                window.location.href = "/src/view/dashboard.html";
            }, 1500);
        } else {
            result.textContent = data.message || "Erreur lors de l'inscription";
            result.style.color = "red";
        }
    } catch (error) {
        console.error("Connection Error:", error);
        result.textContent = "Le serveur NestJS n'est pas allumé !";
        result.style.color = "orange";
    }
}




// // import { addUser } from "../Model/data.js";
// const nameinput=document.getElementById("fullname");
// const passwordinput=document.getElementById("password");
// const emailinput=document.getElementById("mail");
// const result=document.getElementById("result");
// const confirmerPass=document.getElementById("confirmPassword");

// const Signinbtn=document.getElementById("signupbtn");
// Signinbtn.addEventListener("click",handlesignin);
// async function handlesignin(){
//     let name=nameinput.value;
//     let password=passwordinput.value;
//     let email=emailinput.value;
//     let passC=confirmerPass.value;
//    if( !name || !password || !email || !(passC===password) ){
//      result.textContent = "email ou password invalide!!";
//                 result.style.color = "red";
//                 return;
//    }
//    else{
//     const user={
//       name:name,
//       password:password,
//       email:email

//     }
//     try{
//        const response = await fetch("http://localhost:3000/Ewallet/signup",{
//         method:"POST",
//         headers:{
//             "Content-Type":"application/json",
//         },
//             body:JSON.stringify(user),
        
//     });
//     const data=await response.json();
//     if(data.success==="True"){
//              setTimeout(()=>{
//              message.textContent = "Succes";
//              message.style.color = "green";
           
//             window.location.href = "/src/view/dashboard.html";
        
//             },1000)
// result.textContent = "Successfully added";
//                 result.style.color = "green";
//     }
//   }
//     catch(error){
//       console.log(error);
//     }
   
 
                
//   }}