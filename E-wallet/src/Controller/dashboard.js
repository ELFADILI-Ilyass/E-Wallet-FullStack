const welcome_message = document.getElementById("welcome_message");
const montant = document.getElementById("balance");
const date = document.getElementById("date");
const transac = document.getElementById("transactions");
const filterS = document.getElementById("filterX");
const transfer = document.getElementById("transferer");
const payerbtn = document.getElementById("payer");
const rechargerBtn = document.getElementById("recharger");
const paymentContainer = document.getElementById("paymentContainer");
const confirmBtn = document.getElementById("Confirm");
const status = document.getElementById("paymentStatus");
const accountsContainer = document.getElementById("accounts-container");

// Load user from sessionStorage
let user = JSON.parse(sessionStorage.getItem("user"));

// Check if user exists, otherwise redirect to login
if (!user) {
    window.location.href = "../view/index.html";
}

// Display welcome message and balance
welcome_message.textContent = "Bonjour " + user.nom;
montant.textContent = user.balance + " MAD";

// Function to display transactions
function displayTransactions(list) {
    transac.innerHTML = "";
    if (!list || list.length === 0) {
        transac.innerHTML = `
            <tr>
                <td colspan="4" class="no-transactions">
                    Aucune transaction disponible
                </td>
            </tr>
        `;
        return;
    } 
    
    list.forEach(t => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${t.date}</td>
            <td>${t.description}</td>
            <td>${t.type}</td>
            <td>${t.montant}</td>
        `;
        transac.appendChild(tr);
    });
}

// Display all transactions on load
displayTransactions(user.transaction);

// Filter transactions (CLIENT-SIDE ONLY - no backend needed)
filterS.addEventListener("change", () => {
    let filtered = user.transaction;
    
    if (filterS.value === "E") {
        // Show only "Entrées" (+)
        filtered = user.transaction.filter(t => t.type === "+");
    } else if (filterS.value === "S") {
        // Show only "Sorties" (-)
        filtered = user.transaction.filter(t => t.type === "-");
    }
    // "T" = Toutes = show all
    
    displayTransactions(filtered);
});

// Toggle payment container
payerbtn.addEventListener("click", () => {
    const isHidden = paymentContainer.style.display === "none";
    paymentContainer.style.display = isHidden ? "block" : "none";
});

// Payment confirmation - BACKEND CALL
confirmBtn.addEventListener("click", async () => {
    const montantValue = parseFloat(document.getElementById("prixInput").value);
    const pass = document.getElementById("passInput").value;

    // Frontend validation
    if (pass !== user.numCompte) {
        status.textContent = "Numéro de compte incorrect !";
        status.style.color = "red";
        return;
    }

    if (montantValue <= 0 || isNaN(montantValue)) {
        status.textContent = "Montant invalide !";
        status.style.color = "red";
        return;
    }

    if (user.balance < montantValue) {
        status.textContent = "Solde insuffisant !";
        status.style.color = "red";
        return;
    }

    status.textContent = "Traitement du paiement...";
    status.style.color = "orange";

    try {
        const response = await fetch("http://localhost:3000/Ewallet/payer", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
                numCompte: user.numCompte, 
                montant: montantValue 
            })
        });

        const data = await response.json();

        if (data.success === "True") {
            // Update sessionStorage
            sessionStorage.setItem("user", JSON.stringify(data.user));
            user = data.user;

            // Update UI
            montant.textContent = user.balance + " MAD";
            displayTransactions(user.transaction);

            status.textContent = "Paiement réussi !";
            status.style.color = "green";

            // Clear inputs
            document.getElementById("prixInput").value = "";
            document.getElementById("passInput").value = "";

            setTimeout(() => {
                paymentContainer.style.display = "none";
                status.textContent = "";
            }, 2000);
        } else {
            status.textContent = data.message || "Erreur lors du paiement";
            status.style.color = "red";
        }
    } catch (error) {
        console.error("Payment Error:", error);
        status.textContent = "Erreur serveur - vérifiez que NestJS est démarré";
        status.style.color = "red";
    }
});

// Transfer button
transfer.addEventListener("click", () => {
    window.location.href = "/src/view/Transfer.html";
});

// Recharger button
rechargerBtn.addEventListener("click", () => {
    window.location.href = "../view/recharger.html";
});

// Display user's cards/accounts
function displayAccounts(user) {
    accountsContainer.innerHTML = "";

    if (user.comptes && user.comptes.length > 0) {
        user.comptes.forEach(compte => {
            const pocketCard = document.createElement("div");
            pocketCard.classList.add("pocket-card");

            pocketCard.innerHTML = `
                <div class="pocket-icon">${compte.icon || '💳'}</div>
                <div class="pocket-info">
                    <h4>${compte.type}</h4>
                    <p>${compte.solde.toLocaleString()} MAD</p>
                </div>
            `;

            accountsContainer.appendChild(pocketCard);
        });
    } else {
        accountsContainer.innerHTML = "<p>Aucun compte secondaire trouvé.</p>";
    }
}

displayAccounts(user);

// Update date display
function updateDate() {
    const now = new Date();
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    date.textContent = now.toLocaleDateString('fr-FR', options); 
}

updateDate();





// import {FindTransaction} from "../Model/data.js";

// const welcome_message=document.getElementById("welcome_message");
// const montant=document.getElementById("balance");
// const date=document.getElementById("date");
// const transac=document.getElementById("transactions");
// const filterS=document.getElementById("filterX");
// const transfer=document.getElementById("transferer");
// const payerbtn=document.getElementById("payer");
// const rechargerBtn=document.getElementById("recharger");


// const user = JSON.parse(sessionStorage.getItem("user"));
// welcome_message.textContent ="Bonjour " + user.nom;
// montant.textContent=user.balance+"  MAD";

// const allTransactions=user.transaction;

// function returnF(list) {
//     transac.innerHTML = "";
//     if (!list || list.length === 0) {
//     transac.innerHTML = `
//       <tr>
//         <td colspan="4" class="no-transactions">
//           Aucune transaction disponible
//         </td>
//       </tr>
//     `;
//     return;
//   } 
    
//     list.forEach(t => {
//         const tr = document.createElement("tr");
//         tr.innerHTML = `
//             <td>${t.date}</td>
//             <td>${t.description}</td>
//             <td>${t.type}</td>
//             <td>${t.montant}</td>

//         `;
//         transac.appendChild(tr);
//     });
// }
// returnF(allTransactions);

// filterS.addEventListener("change",()=>{

//     if(filterS.value==="E"){

//         const crediter=FindTransaction(user,"+");
//         returnF(crediter);

//     }
//       if(filterS.value==="S"){

//       const debiter=FindTransaction(user,"-");
//       returnF(debiter);

//       }
//       if(filterS.value==="T"){
//         returnF(allTransactions);
        
//       }
//     });
 
    
    
//     //payer



// payerbtn.addEventListener("click",()=>{
//     const isHidden = paymentContainer.style.display === "none";
//     paymentContainer.style.display = isHidden ? "block" : "none";

// })

// const confirmBtn =document.getElementById("Confirm");
// const status = document.getElementById("paymentStatus");

// const checkSolde=(prix)=>{
//   return new Promise((resolve,reject)=>{
//     if(user.balance>=prix && prix>0){
//       resolve('Success');
//     }
//     else if (prix <= 0) {
//             reject("Montant invalide");
//         } else {
//             reject("Solde insuffisant");
//         }
//   })
// }


// const checkUser=(inputPassword)=>{
//    return new Promise ((resolve,reject)=>{
//     setTimeout(()=>{

//       if(!user){
//           reject(" Utulisateur introuvable");
//       }
//       else if(inputPassword!==user.numCompte)
//       {
//         reject("Please try again");
          
//       }
//       else{
//         resolve("Bonjour "+user.nom);
//       }
//    },1000)
//     })  
  
//   }

//   const updateData = (amount) => {
//     user.balance -= amount;

//     const newT = {
//         date:"2025-12-31" ,
//         description: "Paiement Service",
//         type: "-",
//         montant: amount
//     };
//     user.transaction.push(newT);
//     sessionStorage.setItem("user", JSON.stringify(user));

//     montant.textContent = user.balance + " MAD";
    
//     returnF(user.transaction); 
// };

// confirmBtn.addEventListener("click",()=>{
//   const montant= parseFloat(document.getElementById("prixInput").value);
//   const pass= document.getElementById("passInput").value;

//   status.textContent="Verification...."
//   status.style.color="orange";

//   checkUser(pass)
//     .then((message)=>{
//       status.textContent=message+"  Verification du solde...";
//       return checkSolde(montant);
//     })
//     .then(() => {

//             updateData(montant);

//             status.textContent = "Paiement réussi !";
//             status.style.color = "green";
//         })
//         .catch((error) => {
//             status.textContent = error;
//             status.style.color = "red";
//         });

// });


// // transfer: 

// transfer.addEventListener("click",handletransfer);

// function handletransfer(){
//    setTimeout(()=>{
//                   window.location.href="/src/view/Transfer.html";
//                 },1000);
// }

// // recharger : 

// rechargerBtn.addEventListener("click",()=>{
//     window.location.href="../view/recharger.html"

// })

// //Comptes /cartes: 

// const accountsContainer = document.getElementById("accounts-container");

// // 2. Function to display the cards (pockets)
// const displayAccounts = (user) => {
//     // Clear the container first
//     accountsContainer.innerHTML = "";

//     // Check if the user has a 'comptes' array
//     if (user.comptes && user.comptes.length > 0) {
//         user.comptes.forEach(compte => {
//             // Create the card element
//             const pocketCard = document.createElement("div");
//             pocketCard.classList.add("pocket-card");

//             // Fill with content (Type, Icon, and Solde)
//             pocketCard.innerHTML = `
//                 <div class="pocket-icon">${compte.icon || '💳'}</div>
//                 <div class="pocket-info">
//                     <h4>${compte.type}</h4>
//                     <p>${compte.solde.toLocaleString()} MAD</p>
//                 </div>
//             `;

//             // Add to the grid
//             accountsContainer.appendChild(pocketCard);
//         });
//     } else {
//         accountsContainer.innerHTML = "<p>Aucun compte secondaire trouvé.</p>";
//     }
// };

// // 3. Call the function (usually inside your initialization code)
// displayAccounts(user);

