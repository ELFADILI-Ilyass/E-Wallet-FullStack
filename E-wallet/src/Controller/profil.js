const userInitial = document.getElementById("userInitial");
const userName = document.getElementById("userName");
const userEmail = document.getElementById("userEmail");
const userNumCompte = document.getElementById("userNumCompte");
const userBalance = document.getElementById("userBalance");
const userCards = document.getElementById("userCards");

let user = JSON.parse(sessionStorage.getItem("user"));

// Check if user exists
if (!user) {
    window.location.href = "../view/index.html";
} else {
    loadProfile();
}

function loadProfile() {
    userInitial.textContent = user.nom.charAt(0).toUpperCase();
    userName.textContent = user.nom;
    userEmail.textContent = user.email;
    userNumCompte.textContent = user.numCompte;
    userBalance.textContent = user.balance.toLocaleString();
    
    // Clear cards container
    userCards.innerHTML = "";
    
    // Display cards
    if (user.comptes && user.comptes.length > 0) {
        user.comptes.forEach(compte => {
            const cardDiv = document.createElement("div");
            cardDiv.style.padding = "12px";
            cardDiv.style.background = "#f5f5f5";
            cardDiv.style.borderRadius = "10px";
            cardDiv.style.display = "flex";
            cardDiv.style.justifyContent = "space-between";
            cardDiv.style.alignItems = "center";
            
            cardDiv.innerHTML = `
                <span style="font-size: 20px;">${compte.icon} ${compte.type}</span>
                <span style="font-weight: 600;">${compte.solde.toLocaleString()} MAD</span>
            `;
            
            userCards.appendChild(cardDiv);
        });
    } else {
        userCards.innerHTML = "<p style='color: #999;'>Aucune carte disponible</p>";
    }
}