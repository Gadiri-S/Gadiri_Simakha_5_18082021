// Objectif : Récupérer un seul article, l'afficher sur une page product, sauvegarder les données dans le local storage
const mainProduct = document.getElementById("main-product");






main()

async function main() {

    const articleId = getArticleId() // On récupère l'article voulu par son ID

    const article = await getArticle(articleId); // On attend l'élément articleID

   // On s'assure qu'il est bien récupéré avec un console.log

    displayArticle(article);// On affiche l'article sur la page


}

;

function getArticleId() {
    return new URL(location.href).searchParams.get("id") // On récupère l'URL de l'article par son ID

}



function getArticle(articleId) {
    return fetch(`http://localhost:3000/api/cameras/${articleId}`) //On récupère un seul élément de l'API par son ID
        .then(
            function (res) {
                if (res.ok) {
                    return res.json()
                }
            }
        ).then(

            function (articles) {  // On récupère notre article         

                return articles
            }


        ).catch(
            function (err) {
                console.error("Error")
                mainProduct.innerHTML += " <div class='error'><h2> Impossible de récupérer les données. Vérifiez bien que le serveur ait été lancé</h2><br><h2>Si l'erreur presiste merci de bien vouloir nous contacter</h2></div>"

            }
        );

}



function displayArticle(article) {  //On affiche notre article sur la page en créant les élément HTML sur le DOM

    const link = "product.html" + `?id=${article._id}`

    mainProduct.innerHTML +=  // On injecte le contenu Js sur notre page HTML

        `<div id="container-product">    
        
       
    
        <a href=${link}> <img class=img-product src="${article.imageUrl}"/></a>
        
        
         <form>
        <div class="spec-product">
        <p id=name-product>Model: ${article.name}</p><br>
        <select id="lenses">
        </select>    
        
        <input type="number" id="quantity" name="quantity" value="1" min="1" required> 
    
        <p id=description-product>Description:  ${article.description} </p> <br>
    
        <p id=price-product>Prix: ${article.price / 100} euros  <input type="submit" value="Acheter ce produit"  id="send"></p> 
    
      </div>
     </form>
    
    
        
        </div>
        
    
    `

    //
    let lensesList = article.lenses; // On crée une boucle pour itérer dans le tableau lenses et afficher tous les éléments dans une liste
    for (let i = 0; i < lensesList.length; i++) {
        document.getElementById("lenses").innerHTML += `<option >${lensesList[i]}</option>}`
    }



    const sendCart = document.getElementById("send"); //Au clic, on envoie les informations sur notre produit au localStorage
    sendCart.addEventListener("click", (event) => {
        event.preventDefault(); // Pas réactualiser la page



        /// Pas obligatoire mais intéressant car permet de bien tester les fonctionnalités du site une fois que l'on est dans le panier
        const formInput = document.getElementById("lenses"); //Récupération du choix de l'utilisateur dans le formulaire (lenses)
        const quantityInput = document.getElementById("quantity"); //Récupération du choix de l'utilisateur dans le formulaire (qtes)

        if (quantityInput.value < 1) { //Au moins un article

            (window.alert(`Vous devez acheter au moins un article`))


        } else if (quantityInput.value > 100) { //Pas plus de 100

            (window.alert(`Vous avez dépassé la quantité maximum`))
        } else {



            const formInputValue = formInput.value;
            const quantityInputValue = quantityInput.value;
            let optionProduct = { //Objet qui sera envoyé dans le local storage
                name: article.name,
                idProduct: article._id,
                price: price = (article.price / 100) * quantityInputValue,
                lense: formInputValue,
                quantity: quantityInputValue

            }


            ///////////////////////////////////////////////// LOCAL STORAGE /////////////////////////////////////////


            let productInLocalStorage = JSON.parse(localStorage.getItem("product")); 

            //Fonction confirmation ajout au panier

            const confirm = () => {



                if (window.confirm(`${optionProduct.name} a bien été ajouté au panier 
Appuyez OK pour finaliser la commande ou Annuler pour continuer vos achats`)) {
                    window.location.href = "cart.html";
                }
            }

            // Si produit déjà déjà enregistré dans le local storage 
            if (productInLocalStorage) {
                productInLocalStorage.push(optionProduct);
                localStorage.setItem("product", JSON.stringify(productInLocalStorage));

                confirm();



            } else {
                productInLocalStorage = [];
                productInLocalStorage.push(optionProduct);
                localStorage.setItem("product", JSON.stringify(productInLocalStorage));
                confirm();


            }
        }
    });



}

