const choixCompte = document.getElementById("cardSelect");
const montantInput = document.getElementById("rechargeAmount");
const verificationInput = document.getElementById("confirmPass");
const confirmBtn = document.getElementById("validerRecharge");
let user = JSON.parse(sessionStorage.getItem("user"));

// Check if user exists
if (!user) {
    alert("Session expirée, veuillez vous reconnecter");
    window.location.href = "../view/index.html";
}

// Load user's cards
function loadCartes() {
    choixCompte.innerHTML = '<option value="">-- Sélectionner --</option>';
    
    if (user.comptes && user.comptes.length > 0) {
        user.comptes.forEach(compte => {
            const option = document.createElement("option");
            option.value = compte.type;
            option.textContent = `${compte.type} -- ${compte.solde} MAD`;
            choixCompte.appendChild(option);
        });
    } else {
        alert("Vous n'avez aucune carte disponible!");
    }
}

loadCartes();

// Recharge handler - BACKEND CALL
confirmBtn.addEventListener("click", async () => {
    const numcompte = verificationInput.value;
    const amount = parseFloat(montantInput.value);
    const compteSource = choixCompte.value;

    // Frontend validation
    if (numcompte !== user.numCompte) {
        alert("Numéro de compte incorrect!");
        return;
    }

    if (amount <= 0 || isNaN(amount)) {
        alert("Montant invalide!");
        return;
    }

    if (!compteSource) {
        alert("Veuillez sélectionner une carte!");
        return;
    }

    try {
        const response = await fetch("http://localhost:3000/Ewallet/recharger", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
                numCompte: user.numCompte,
                compteSource: compteSource, 
                montant: amount 
            })
        });

        const data = await response.json();

        if (data.success === "True") {
            sessionStorage.setItem("user", JSON.stringify(data.user));
            alert("Recharge réussie!");
            window.location.href = "../view/dashboard.html";
        } else {
            alert(data.message || "Erreur lors de la recharge");
        }
    } catch (error) {
        console.error("Recharge Error:", error);
        alert("Erreur serveur - vérifiez que NestJS est démarré");
    }
});