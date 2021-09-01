//On convertit en format JSON pour le localstorage 


let productInLocalStorage = JSON.parse(localStorage.getItem("product"));

//On va injecter dans ce tableau vide le prix de tous les éléments selectionnés et utiliser la fonction reduce() pour l'addition
let total = [];


//On selectionne l'élément div dans lequel on va injecter notre liste d'achat 

const list = document.getElementById("list-products");
const totalPrice = document.getElementById("total_price");
const main = document.getElementById("main-product");
const containerForm = document.querySelector(".container-form")



function addToCart() {
    if (productInLocalStorage == "") {
        containerForm.innerHTML = ""     //On veut éviter que l'utilisateur puisse avoir accès au formulaire sans passer d'achat
    }
    for (let i = 0; i < productInLocalStorage.length; i++) {


        const element = productInLocalStorage[i];


        list.innerHTML += `<div><ul><li class="item"> ${element.name}  (${element.lense}) x ${element.quantity}(unité(s)) :  ${element.price} euros </li></ul></div>`;

    }
}


function emptyCart() {

    //On crée une fonction pour supprimer les éléments de notre panier au clic
    const supr = document.getElementById("supr");
    supr.addEventListener("click", (e) => {

        localStorage.clear();


    })
}

// On itère pour récupérer tous les prix et on utilise la fonction reduce pour les additionner et retourner notre prix final. 


function addTotal() {
    for (let y = 0; y < productInLocalStorage.length; y++) {
        const elementPrice = productInLocalStorage[y].price;

        total.push(elementPrice);

        const reducer = (accumulator, currentValue) => accumulator + currentValue;

        finalPrice = total.reduce(reducer, 0);

        totalPrice.innerHTML = `<h2>Total : ${finalPrice} euros</h2> `
    }

}

function mainCart() {
    addTotal();
    addToCart();
    emptyCart();

}

mainCart();