// Objectif : Récupérer l'ensemble des articles dans l'API et les afficher sur la page principale 


main() // La fonction est appellée 

async function main() {  //La fonction doit être asynchrone car on doit attendre une autre fonction qui n'a pas encore été lancée
const articles = await getArticle() // On attend que les articles soient récupérés sinon Js ne pourra pas afficher article

for (article of articles) { // Boucle for pour récupérer chaque article du tableau articles
    displayArticle(article) // Chaque article est afficher individuellement
}
}

function getArticle() { // Tout d'abord on doit récupérer l'API et afficher tous les articles dans la console

  return fetch(`http://localhost:3000/api/cameras`)
.then(
    function(res){
        if (res.ok) {
            return res.json() // On peut vérifier à ce niveau si tout se passe bien en réalisant un console.log
        }
    }
).then (

    function (articles){
        console.log(articles) //Idem, on devrait ici pouvoir afficher avec un console.log tous les articles de notre API
return articles      
  }
    

).catch (                          
    function(err){
console.error("Error")
  }
);

}
// La fonction displayArticle sert à afficher tous les articles récupérés dans l'API. 
 function displayArticle () {//On crée directement dans le DOM les classes, ID et div dans lesquels on va afficher nos articles
    const link = "product.html"+`?id=${article._id}`
    const main = document.getElementById("main");

    main.innerHTML+=  `<div class="article">    
    
    <a href=${link}>

    <span id="img"> <img class=img src="${article.imageUrl}"/></span>
    
    <div class="container">
    <span id=name>Model: ${article.name}</span><br>
    <span id=price>Price: ${article.price/100} euros</span>
    
    </div>
    </a>
    </div>`
}

const link = document.getElementById("link") 


