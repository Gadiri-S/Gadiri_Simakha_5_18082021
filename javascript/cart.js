 //On convertit en format JSON pour le localstorage 
let productInLocalStorage = JSON.parse(localStorage.getItem("product"));

 //On va injecter dans ce tableau vide le prix de tous les éléments selectionnés et utiliser la fonction reduce() pour l'addition
let total = [];


//On selectionne l'élément div dans lequel on va injecter notre liste d'achat 

const list = document.getElementById("list-products");
const totalPrice = document.getElementById("total_price");
const main = document.getElementById("main-product");
const containerForm = document.querySelector(".container-form")
if(productInLocalStorage == "") {
    containerForm.innerHTML= "<h1>Your cart is empty</h1>"
}
for (let i = 0; i < productInLocalStorage.length; i++) {

   
    const element = productInLocalStorage[i];

   
    list.innerHTML+= `<span><ul><li class="item"> ${element.name}  (${element.lense}) x ${element.quantity}(units) :  ${element.price}  euros <a href="cart.html" class="remove">X Remove item</a></li></ul><span>`;





        ////////////////////////////////////////////////////////////////////

        //On crée une fonction pour supprimer les éléments de notre panier au clic sur le lien "remove"
 const supr = document.getElementsByClassName("remove");

 for (let i = 0; i < supr.length; i++) {
     let button = supr[i]

     
     button.addEventListener("click", (e)=>{


      const buttonClicked =  e.target

      buttonClicked.parentElement.remove()

      removeLocalStorage(button);
 
    })};

    function removeLocalStorage(button){
        let store = JSON.parse(localStorage.getItem("product")) || [];
        store.splice(button, 1);
        localStorage.setItem('product', JSON.stringify(store));
      }
    
      
 
  
    }




// On itère pour récupérer tous les prix et on utilise la fonction reduce pour les additionner et retourner notre prix final. 

for (let y = 0; y < productInLocalStorage.length; y++) {
    const elementPrice = productInLocalStorage[y].price;

    total.push(elementPrice);

    const reducer = (accumulator,currentValue) => accumulator+currentValue;

   finalPrice = total.reduce(reducer,0);

   totalPrice.innerHTML= `<h2>Total : ${finalPrice} euros</h2> `
 


  
}

