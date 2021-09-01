

function confirmation() {
    let orderId = localStorage.getItem('orderId')
    let priceValidation = localStorage.getItem('total')
    let ordr = document.getElementById("main-product")

    localStorage.clear();

    ordr.innerHTML = `<h3> Merci pour votre achat</h3> <h3> Le montant total de votre commande est de :
${priceValidation}  euros</h3> <h3> Votre numéro de commande :
${orderId} <h3> <a href="index.html"> 
Retour à l'accueil </a> </h3>`
}

confirmation();

