const inputmail = document.getElementById("mail");
const inputpassword = document.getElementById("password");
const message = document.getElementById("result");
const submitbtn = document.getElementById("submitbtn");
const displayBtn = document.getElementById("display");

// Toggle password visibility
displayBtn.addEventListener("click", togglePassword);

function togglePassword() {
    if (inputpassword.type === "password") {
        inputpassword.type = "text";
        displayBtn.textContent = "🙈";
    } else {
        inputpassword.type = "password";
        displayBtn.textContent = "👁";
    }
}

// Login handler
submitbtn.addEventListener("click", submit);

async function submit() {
    message.textContent = "Vérification...";
    message.style.color = "orange";
    
    let email = inputmail.value;
    let password = inputpassword.value;

    // Frontend validation
    if (!email || !password) {
        message.textContent = "Veuillez remplir tous les champs";
        message.style.color = "red";
        return;
    }

    try {
        const response = await fetch("http://localhost:3000/Ewallet/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (data.success === "True") {
            // ✅ SAVE USER TO SESSIONSTORAGE
            sessionStorage.setItem("user", JSON.stringify(data.user));
            
            message.textContent = "Connexion réussie !";
            message.style.color = "green";

            setTimeout(() => {
                window.location.href = "/src/view/dashboard.html";
            }, 1000);
        } else {
            message.textContent = data.message || "Email ou mot de passe incorrect";
            message.style.color = "red";
        }
    } catch (error) {
        console.error("Login Error:", error);
        message.textContent = "Erreur serveur - vérifiez que NestJS est démarré";
        message.style.color = "red";
    }
}


//     if(!email || !pass){
        
       
//     }
//     else{
//         user=FindUser(email,pass);
//          

//          }
//           else {
//              sessionStorage.setItem("user", JSON.stringify(user));
             
             
        
//     }

// }
    
   
