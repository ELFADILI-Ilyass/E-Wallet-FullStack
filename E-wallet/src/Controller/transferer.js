const numcomptInput = document.querySelector("#numCompte");
const amountInput = document.querySelector("#amount");
const validerbtn = document.querySelector("#valider");

let user = JSON.parse(sessionStorage.getItem("user"));

// Check if user exists
if (!user) {
    alert("Session expirée, veuillez vous reconnecter");
    window.location.href = "../view/index.html";
}

console.log("Current user:", user);

// Transfer handler - BACKEND CALL
validerbtn.addEventListener("click", async () => {
    const numcompte = numcomptInput.value;
    const amount = parseFloat(amountInput.value);

    // Frontend validation
    if (amount <= 0 || isNaN(amount)) {
        alert("Montant invalide!");
        return;
    }

    if (!numcompte || numcompte === "") {
        alert("Veuillez entrer un numéro de compte!");
        return;
    }

    if (user.numCompte === numcompte) {
        alert("Vous ne pouvez pas transférer vers votre propre compte!");
        return;
    }

    if (user.balance < amount) {
        alert("Solde insuffisant!");
        return;
    }

    try {
        const response = await fetch("http://localhost:3000/Ewallet/transferer", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                expediteurNumCompte: user.numCompte,
                destinataireNumCompte: numcompte,
                montant: amount
            })
        });

        const data = await response.json();

        if (data.success === "True") {
            sessionStorage.setItem("user", JSON.stringify(data.expediteur));
            alert("Transfert réussi!");
            window.location.href = "../view/dashboard.html";
        } else {
            alert(data.message || "Erreur lors du transfert");
        }
    } catch (error) {
        console.error("Transfer Error:", error);
        alert("Erreur serveur - vérifiez que NestJS est démarré");
    }
});