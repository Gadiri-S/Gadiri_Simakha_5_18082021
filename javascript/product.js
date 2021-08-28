// Objectif : Récupérer un seul article, l'afficher sur une page product, sauvegarder les données dans le local storage



(async function () {
    
    const articleId =  getArticleId() // On récupère l'article voulu par son ID

const article = await getArticle(articleId) // On attend l'élément articleID
console.log(article) // On s'assure qu'il est bien récupéré avec un console.log

displayArticle(article) // On affiche l'article sur la page


}) ()

function getArticleId() {
    return new URL(location.href).searchParams.get("id") // On récupère l'URL de l'article par son ID

}

function getArticle (articleId) {
    return fetch(`http://localhost:3000/api/cameras/${articleId}`) //On récupère un seul élément de l'API par son ID
    .then(
        function(res){
            if (res.ok) {
                return res.json()
            }
        }
    ).then (
    
        function (articles){  // On récupère notre article 
    return articles      
      }
        
    
    ).catch (
        function(err){
    console.error("Error")
      }
    ); 
    
}

function displayArticle(article){  //On affiche notre article sur la page en créant les élément HTML sur le DOM
    const link = "product.html"+`?id=${article._id}`
    const mainProduct = document.getElementById("main-product");

    mainProduct.innerHTML+=  /////////////////////////// On injecte le contenu Js sur notre page HTML
    
    `<div id="container-product">    
    
   

    <a href=${link}> <img class=img-product src="${article.imageUrl}"/></a>
    
    
     <form>
    <div class="spec-product">
    <p id=name-product>Model: ${article.name}</p><br>
    <select id="lenses">
    </select>    
    
    <input type="number" id="quantity" name="quantity" min="1" max="100" placeholder="1" value="1" required> 

    <p id=description-product>Description:  ${article.description} </p> <br>

    <p id=price-product>Price: ${article.price/100} euros  <input type="submit" value="Order this product"  id="send"></p> 

  </div>
 </form>


    
    </div>
    

`

  let lensesList = article.lenses; // On crée une boucle pour itérer dans le tableau lenses et afficher tous les éléments dans une liste
for (let i = 0; i < lensesList.length; i++) {
      document.getElementById("lenses").innerHTML+=`<option >${lensesList[i]}</option>}`};










        
const sendCart = document.getElementById("send"); //Au clic, on envoie les informations sur notre produit au localStorage et sur la page cart
      sendCart.addEventListener("click", (event)=>{
          event.preventDefault(); // Pas réactualiser la page

          /// Pas obligatoire mais intéressant car permet de bien tester les fonctionnalités du site une fois que l'on est dans le panier
          const formInput =  document.getElementById("lenses"); //Récupération du choix de l'utilisateur dans le formulaire (lenses)
          const quantityInput =  document.getElementById("quantity"); //Récupération du choix de l'utilisateur dans le formulaire (qtes)
        ///


          const formInputValue = formInput.value;
const quantityInputValue = quantityInput.value;
          let optionProduct = {
           name:  article.name,
            idProduct : article._id,
           price : price = (article.price/100)*quantityInputValue,    
           lense : formInputValue,
            quantity : quantityInputValue

          }
         ///////////////////////////////////////////////// LOCAL STORAGE /////////////////////////////////////////

let productInLocalStorage = JSON.parse(localStorage.getItem("product")); //On convertit en format JSON pour le localstorage 


//Fonction confirmation ajout au panier

const confirm = () => {
    if(window.confirm(`${optionProduct.name} has been added to the cart 
    Press OK to checkout or Cancel to continue your shopping`)) {
        window.location.href="cart.html";
    } else {
        window.location.href="index.html"
    };
}

// Si produit déjà déjà enregistré dans le local storage 
if(productInLocalStorage){
    productInLocalStorage.push(optionProduct);
    localStorage.setItem("product", JSON.stringify(productInLocalStorage));

   confirm();
    


} else {
    productInLocalStorage = [];
    productInLocalStorage.push(optionProduct);
    localStorage.setItem("product", JSON.stringify(productInLocalStorage));
    confirm();


}
      });

    }
    

    

    
 